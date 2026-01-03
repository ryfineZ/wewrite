
/*
* marked extension for remixIcon svg icons:

*/
import { MarkedExtension, Tokens } from "marked";
import { ObsidianMarkdownRenderer } from "../markdown-render";
import { WeWriteMarkedExtension } from "./extension";
import { serializeElement } from "src/utils/utils";

const remixIconRegex = /`(ris|fas):([a-z0-9-]+)`/i;
const remixIconRegexTokenizer = /^`(ris|fas):([a-z0-9-]+)`/i;
export class RemixIconRenderer extends WeWriteMarkedExtension {
	remixIndex: number = 0;

	prepare(): Promise<void> {
		this.remixIndex = 0;
		return Promise.resolve();
	}


	render(code: string, lang: string | undefined): string {
		const root = ObsidianMarkdownRenderer.getInstance(this.plugin.app).queryElement(this.remixIndex, '.obsidian-icon.react-icon')
		if (!root) {
			return '<span>remix icon not found </span>';
		}
		this.remixIndex++
		return serializeElement(root);
	}



	markedExtension():MarkedExtension {
		return {
			extensions: [{
				name: 'remixIcon',
				level: 'inline',
				start: (str: string) => {
					const match = str.match(remixIconRegex);
					if (match){
						return match.index
					}
				},
				tokenizer: (src: string) => {
					const match = src.match(remixIconRegexTokenizer);
					if (match) {
						return {
							type: 'remixIcon',
							raw: match[0],
							text: match[0].trim(),
							lang: match[1],
						};
					}
				},
				renderer: (token: Tokens.Generic) => {
					return this.render(token.text, token.lang);
				},
			}]
		}
	}
}

