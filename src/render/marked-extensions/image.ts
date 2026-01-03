/**
 * marked extension for handling images
 * 
 * post processing;
 * 
 * 
 */

import { MarkedExtension } from "marked";
import { sanitizeHTMLToDom } from "obsidian";
import { WeWriteMarkedExtension } from "./extension";


export class Image extends WeWriteMarkedExtension {
	processImage(dom: HTMLDivElement) {

		const imgEls = dom.querySelectorAll('img')
		
		for (let i = 0; i < imgEls.length; i++) {
			const currentImg = imgEls[i]
			
			const classNames = currentImg.getAttribute('class')?.split(' ')
			
			
			if (classNames?.includes('wewrite-avatar-image')) {
				continue
			}

			const title = currentImg.getAttribute('title')
			const alt = currentImg.getAttribute('alt-text')
			const caption = title || alt || ''
			const figureEl = createEl('figure',{cls:'image-with-caption'})
			currentImg.parentNode?.insertBefore(figureEl, currentImg)
			figureEl.appendChild(currentImg)
			if (caption){
				const captionRow = figureEl.createEl('div', { cls:'image-caption-row'})
				captionRow.createEl('div', { cls:'triangle'})
				captionRow.createEl('figcaption', { cls:'image-caption', text: caption })
			}
		}
		return dom
	}
	postprocess(html: string): Promise<string> {

		const dom = sanitizeHTMLToDom(html)
		const tempDiv = createEl('div');
		tempDiv.appendChild(dom);
		this.processImage(tempDiv)
		const serializer = new XMLSerializer();
		const result = Array.from(tempDiv.childNodes)
			.map((node) => serializer.serializeToString(node))
			.join('');
		return Promise.resolve(result);
	}

	markedExtension(): MarkedExtension {
		return {
			extensions: []
		}
	}
}
