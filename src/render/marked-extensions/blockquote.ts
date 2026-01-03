/**
 * marked extension for blockquote and callout
 * 
 * credits to Sun BooShi, author of note-to-mp plugin
 */

import { MarkedExtension, Tokens } from "marked";
import { WeWriteMarkedExtension } from "./extension";
import { ObsidianMarkdownRenderer } from "../markdown-render";
import { replaceDivWithSection } from "src/utils/utils";
import { $t } from "src/lang/i18n";


export class BlockquoteRenderer extends WeWriteMarkedExtension {
  private calloutIndex:number = 0;
    prepare(): Promise<void> { 
    if (!this.marked) {
      console.error("marked is not ready");
      return Promise.resolve();
    }
    this.calloutIndex = 0;
    return Promise.resolve();
  }

  async rendererBlockquote(token: Tokens.Blockquote): Promise<string> {
    // 使用marked来解析blockquote中的内联元素，如链接
    const parsedText = await Promise.resolve(this.marked.parseInline(token.text));
    const text = parsedText.replace(/\n/gm, '<br>').trim();
    return `<blockquote dir="auto" ><span class="icon-pin"></span><div class="blockquote-inner" >${text}</div></blockquote>`
  }
  rendererCallout(_token: Tokens.Blockquote): Promise<string> {
    const renderer = ObsidianMarkdownRenderer.getInstance(this.plugin.app);
    const root = renderer.queryElement(this.calloutIndex, '.callout:not(.admonition)');
	
    if (!root) {
      return Promise.resolve($t('render.callout-failed'));
    }
    this.calloutIndex++;
    
    // Remove edit button if exists
    const editDiv = root.querySelector('.edit-block-button');
    if (editDiv) {
      root.removeChild(editDiv);
    }
    const foldDiv = root.querySelector('.callout-fold');
		if (foldDiv) {

			try {
				foldDiv.parentNode!.removeChild(foldDiv);
			} catch (e) {
				console.error(e)
			}

		}
    return Promise.resolve(replaceDivWithSection(root))
  }

  markedExtension(): MarkedExtension {
    return {
      async: true,
      walkTokens: async (token: Tokens.Generic) => {
        if (token.type !== 'blockquote') {
          return;
        }
        const regex = /\[!(.*?)\]/g;
        const matched = token.text.match(regex);
        if (matched){
          token.html =  await this.rendererCallout(token as Tokens.Blockquote)
        }else{
          token.html =  await this.rendererBlockquote(token as Tokens.Blockquote);
        }
      },
      extensions: [{
        name: 'blockquote',
        level: 'block',
        renderer: (token: Tokens.Generic) => {
          return String(token.html ?? '');
        },
      }]
    }
  }
}
