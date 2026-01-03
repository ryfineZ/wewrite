/**
 * Marked extension for code highlighting
 *  credits to Sun BooShi, author of note-to-mp plugin
 */
 
import { MarkedExtension } from "marked";
import { WeWriteMarkedExtension } from "./extension";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { CodeRenderer } from "./code";

export class CodeHighlight extends WeWriteMarkedExtension {
  markedExtension(): MarkedExtension {
    return markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const type = CodeRenderer.getMathType(lang)
        if (type) return code;
        if (lang && lang.trim().toLocaleLowerCase() == 'mermaid') return code;
        if (lang && lang.trim().toLocaleLowerCase() == 'charts') return code;
        if (lang && lang.trim().toLocaleLowerCase() == 'dataview') return code;
        if (lang && lang.trim().toLocaleLowerCase() == 'wewrite-profile') return code;

        if (lang && hljs.getLanguage(lang)) {
          try {
            const result = hljs.highlight(code, { language: lang });
            return result.value;
          } catch (err) {
            return code;
          }
        }

        try {
          const result = hljs.highlightAuto(code);
          return result.value;
        } catch (err) {
          return code;
        }
      }
    })
  }
}
