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
import { Marked, Tokens } from "marked";
import { Component, debounce, sanitizeHTMLToDom } from "obsidian";
import WeWritePlugin from "src/main";
import { WechatClient } from "../wechat-api/wechat-client";
import { BlockquoteRenderer } from "./marked-extensions/blockquote";
import { CodeRenderer } from "./marked-extensions/code";
import { CodespanRenderer } from "./marked-extensions/codespan";
import { CodeHighlight } from "./marked-extensions/code-highlight";
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
	delayParse = async (path:string) => {
		return new Promise<string>(async (resolve, reject) => {
			setTimeout(async () => {
				try {
					const md = await this.plugin.app.vault.adapter.read(path);
					let html = await this.parse(md);
					html = await this.postprocess(html);
					resolve(html);
				} catch (error) {
					reject(error);
				}
			}, 100);
		});
	}
	private constructor(plugin: WeWritePlugin, previewRender: PreviewRender) {
		this.plugin = plugin;
		this.previewRender = previewRender;
		this.client = WechatClient.getInstance(plugin);
		this.marked = new Marked();
		this.marked.use(markedOptiones);
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
			new CodeHighlight(this.plugin, this.previewRender, this.marked)
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
		wrapper.innerHTML = html;
		wrapper.querySelectorAll('ol li, ul li').forEach((li) => {
			const hasMedia = li.querySelector('img, video, figure');
			// 彻底清理空白字符、<br> 和空标签
			const content = li.innerHTML
				.replace(/<br\s*\/?>/gi, '')
				.replace(/&nbsp;/gi, '')
				.replace(/\u00A0/g, '')
				.replace(/<span[^>]*>\s*<\/span>/gi, '')
				.replace(/<section[^>]*>\s*<\/section>/gi, '')
				.replace(/<div[^>]*>\s*<\/div>/gi, '')
				.replace(/[\s\u200B-\u200D]+/g, '')
				.trim();
			if (!hasMedia && content === '') {
				li.remove();
			}
		});
		return wrapper.innerHTML;
	}

	public async parseNote(
		path: string,
		container: HTMLElement,
		view: Component
	) {
		// 直接读取 Markdown 并走 marked 解析，减少双重渲染的开销
		const md = await this.plugin.app.vault.adapter.read(path);
		const { content } = matter(md);
		let html = await this.marked.parse(content);
		html = await this.postprocess(html);
		return html;
	}
}
