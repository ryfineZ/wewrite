/**
 * This is the customized render for WeChat
 *
 * it is based on marked and its extension mechanism
 *
 * this file the framework and entry point for the renderer
 *
 * each functionality will be implemented in different extensions of marked.
 *
 */

import matter from "gray-matter";
import { Marked, Tokens, RendererObject, RendererThis } from "marked";
import { Component, debounce, sanitizeHTMLToDom } from "obsidian";
import WeWritePlugin from "src/main";
import { WechatClient } from "../wechat-api/wechat-client";
import { BlockquoteRenderer } from "./marked-extensions/blockquote";
import { CodeRenderer } from "./marked-extensions/code";
import { CodespanRenderer } from "./marked-extensions/codespan";
import { Embed } from "./marked-extensions/embed";
import {
	PreviewRender,
	WeWriteMarkedExtension,
} from "./marked-extensions/extension";
import { Heading } from "./marked-extensions/heading";
import { IconizeRender } from "./marked-extensions/iconize";
import { MathRenderer } from "./marked-extensions/math";
import { RemixIconRenderer } from "./marked-extensions/remix-icon";
import { Table } from "./marked-extensions/table";
import { Footnote } from "./marked-extensions/footnote";
import { Links } from "./marked-extensions/links";
import { Summary } from "./marked-extensions/summary";
import { Image } from "./marked-extensions/image";
// import { ListItem } from './marked-extensions/list-item'

const markedOptiones = {
	gfm: true,
	breaks: true,
};

export class WechatRender {
	plugin: WeWritePlugin;
	client: WechatClient;
	extensions: WeWriteMarkedExtension[] = [];
	private static instance: WechatRender;
	marked: Marked;
	previewRender: PreviewRender;
	delayParse = (path: string) => {
		return new Promise<string>((resolve, reject) => {
			setTimeout(() => {
				void (async () => {
					const md = await this.plugin.app.vault.adapter.read(path);
					let html = await this.parse(md);
					html = await this.postprocess(html);
					resolve(html);
				})().catch((error) => {
					const reason =
						error instanceof Error ? error : new Error(String(error));
					reject(reason);
				});
			}, 100);
		});
	}
	private constructor(plugin: WeWritePlugin, previewRender: PreviewRender) {
		this.plugin = plugin;
		this.previewRender = previewRender;
		this.client = WechatClient.getInstance(plugin);
		this.marked = new Marked();
		this.marked.use(markedOptiones);
		const renderer: RendererObject = {
			list(this: RendererThis, token: Tokens.List) {
				let body = '';
				if (token.items) {
					for (const item of token.items) {
						body += renderListItem(this.parser, item);
					}
				}
				const type = token.ordered ? 'ol' : 'ul';
				const startatt =
					token.ordered && token.start !== 1
						? ` start="${token.start}"`
						: '';
				return `<${type}${startatt} class="list-paddingleft-1">${body}</${type}>`;
			},
			listitem(this: RendererThis, token: Tokens.ListItem) {
				return renderListItem(this.parser, token);
			},
		};
		this.marked.use({ renderer });
		this.useExtensions();
	}
	static getInstance(plugin: WeWritePlugin, previewRender: PreviewRender) {
		if (!WechatRender.instance) {
			WechatRender.instance = new WechatRender(plugin, previewRender);
		}
		return this.instance;
	}
	addExtension(extension: WeWriteMarkedExtension) {
		this.extensions.push(extension);
		this.marked.use(extension.markedExtension());
	}
	useExtensions() {
		this.addExtension(
			new Footnote(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new IconizeRender(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new Heading(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new Embed(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new CodeRenderer(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new CodespanRenderer(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new MathRenderer(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new RemixIconRenderer(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new BlockquoteRenderer(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new Table(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new Links(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new Summary(this.plugin, this.previewRender, this.marked)
		);
		this.addExtension(
			new Image(this.plugin, this.previewRender, this.marked)
		);
		// this.addExtension(new ListItem(this.plugin, this.previewRender, this.marked))
	}
	async parse(md: string) {
		const { data, content } = matter(md);
		for (const extension of this.extensions) {
			await extension.prepare();
		}
		return await this.marked.parse(content);
	}
	async postprocess(html: string) {
		let result = html;
		for (let ext of this.extensions) {
			result = await ext.postprocess(result);
		}
		result = this.removeEmptyListItems(result);
		return result;
	}

	private removeEmptyListItems(html: string) {
		// WeChat 编辑器会保留空的 <li>，导致空序号，这里统一清理掉仅含换行/空白的条目。
		const wrapper = document.createElement('div');
		const dom = sanitizeHTMLToDom(html);
		wrapper.appendChild(dom);
		wrapper.querySelectorAll('ol li, ul li').forEach((li) => {
			const hasMedia = li.querySelector('img, video, figure');
			const clone = li.cloneNode(true) as HTMLElement;
			clone.querySelectorAll('br').forEach((br) => br.remove());
			clone.querySelectorAll('span, section, div').forEach((node) => {
				if ((node.textContent ?? '').trim() === '') {
					node.remove();
				}
			});
			const textContent = (clone.textContent ?? '')
				.replace(/\u00A0/g, '')
				.replace(/[\s\u200B-\u200D]+/g, '')
				.trim();
			if (!hasMedia && textContent === '') {
				li.remove();
			}
		});
		return serializeChildren(wrapper);
	}

	public async parseNote(
		path: string,
		container: HTMLElement,
		view: Component
	) {
		// 直接读取 Markdown 并走 marked 解析，减少双重渲染的开销
		const md = await this.plugin.app.vault.adapter.read(path);
		// 每次解析前重置扩展内部状态（links、mermaid 索引等）
		let html = await this.parse(md);
		html = await this.postprocess(html);
		return html;
	}
}

function renderListItem(parser: RendererThis["parser"], token: Tokens.ListItem) {
	const body = token.tokens ? parser.parse(token.tokens) : (token.text || '');
	return `<li><section>${body}</section></li>`;
}

function serializeChildren(wrapper: HTMLElement): string {
	const serializer = new XMLSerializer();
	return Array.from(wrapper.childNodes)
		.map((node) => serializer.serializeToString(node))
		.join('');
}
