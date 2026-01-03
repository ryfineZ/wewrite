/**
 * MarkdownRender of obsidian. 
 * credits to author of export as image plugin
*/

import { App, Component, MarkdownRenderChild, MarkdownRenderer, MarkdownView } from "obsidian";
import domtoimage from './dom-to-image-more';
export class ObsidianMarkdownRenderer {
    private static instance: ObsidianMarkdownRenderer;
    private path: string
    previewEl: HTMLElement
    private rendering: boolean = false
    private container: HTMLElement
    private view: Component
    mdv: MarkdownRenderChild;
    markdownBody: HTMLDivElement;
    private constructor(private app: App) {
        this.app = app;
    }

    public static getInstance(app: App,) {
        if (!ObsidianMarkdownRenderer.instance) {
            ObsidianMarkdownRenderer.instance = new ObsidianMarkdownRenderer(app);
        }
        return ObsidianMarkdownRenderer.instance;
    }
    public async render(path: string, container: HTMLElement, view: Component) {
        if (path === undefined || !path || !path.toLowerCase().endsWith('.md')) {
            return;
        }
	
        this.container = container
        this.container.addClass('wewrite-markdown-render-container')
        this.view = view
        this.path = path

        // if (this.previewEl !== undefined && this.previewEl) {
        //     this.previewEl.parentNode?.removeChild(this.previewEl)
        // }
		this.container.empty();
		this.container.show();
        this.rendering = true
        // await this.loadComponents(view)
        this.previewEl = createDiv()
        this.markdownBody = this.previewEl.createDiv()
        this.mdv = new MarkdownRenderChild(this.markdownBody)
        this.path = path
        const markdown = await this.app.vault.adapter.read(path)
        await MarkdownRenderer.render(this.app, markdown, this.markdownBody, path, this.mdv
			// this.app.workspace.getActiveViewOfType(MarkdownView)!
            // || this.app.workspace.activeLeaf?.view
            // || this.mdv //new MarkdownRenderChild(this.el)
        )

        this.container.appendChild(this.previewEl)
        try {
			await Promise.all([
				this.waitForSelector(this.previewEl, ".callout-title svg", 500),
				this.waitForSelector(this.previewEl, ".mermaid", 1000),
				this.waitForSelector(this.previewEl, "svg", 1000),
			]);
		} catch (err) {
			console.warn("部分插件渲染超时（非致命）", err);
		}
        this.rendering = false
		// this.container.hide() 
    }
    public queryElement(index: number, query: string) {
        if (this.previewEl === undefined || !this.previewEl) {
            return null
        }
        if (this.rendering) {
			return null
		}
		if (this.previewEl === undefined || !this.previewEl) {
            return null
        }
        const nodes = this.previewEl.querySelectorAll<HTMLElement>(query)
        if (nodes.length < index) {
            return null
        }
        return nodes[index]
    }
   
    public async domToImage(
        element: HTMLElement,
        p: Record<string, unknown> = {}
    ): Promise<string> {
        return await domtoimage.toPng(element, p)
    }
	waitForSelector(
		container: HTMLElement,
		selector: string,
		timeout = 1000
	): Promise<void> {
		return new Promise((resolve, reject) => {
			if (container.querySelector(selector)) return resolve();

			const observer = new MutationObserver(() => {
				if (container.querySelector(selector)) {
					observer.disconnect();
					resolve();
				}
			});

			observer.observe(container, { childList: true, subtree: true });

			setTimeout(() => {
				observer.disconnect();
				// reject(new Error(`Timeout waiting for selector: ${selector}`));
				resolve();
			}, timeout);
		});
	}

}
