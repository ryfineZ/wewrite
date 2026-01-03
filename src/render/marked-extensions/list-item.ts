/**
 * marked extension for List, remove empty cotent
 * 
 * credits to Sun BooShi, author of note-to-mp plugin
 */

import { Tokens, MarkedExtension } from "marked";
import { WeWriteMarkedExtension } from "./extension";
import { sanitizeHTMLToDom } from "obsidian";
import { serializeChildren, serializeElement } from "src/utils/utils";

export class ListItem extends WeWriteMarkedExtension {
    postprocess(html: string): Promise<string> {
        const fragment = sanitizeHTMLToDom(html)
        const root = createDiv()
        root.appendChild(fragment)
        const uls = root.querySelectorAll<HTMLElement>('ul,ol')
        for (let ul of uls) {
            if (ul.children.length === 0) {
                ul.remove()
            }
            const p = ul.parentNode
            if (p){
                p.removeChild(ul)
                const frame = p.createDiv({cls:'wewrite-list-frame'})
                frame.setAttr('frame-type', 'list')
                frame.appendChild(ul)
            }
        }
        return Promise.resolve(serializeChildren(root));
        
    }
    renderItem(item: Tokens.ListItem) {
        return item.raw;
    }
    renderList(list: Tokens.List) {
        if (list.items.length === 0) {
            return '';
        }else{
            const frame = createDiv({cls:'wewrite-list-frame'})
            const l = list.ordered? 'ol' : 'ul'
            const list_el = frame.createEl(l)
            for (let item of list.items){
                if (item.text){
                    list_el.createEl('li').setText(item.text)
                }else{
                    list_el.createEl('p').setText('')
                }
            }
            return serializeElement(frame)
        }
    }

    markedExtension(): MarkedExtension {
        return {

            extensions: [
                // {
                //     name: 'listitem',
                //     level: 'block',

                //     renderer: (token: Tokens.ListItem) => {
                //         return this.renderItem(token);
                //     }
                // },

                // {
                //     name: 'list',
                //     level: 'block',

                //     renderer: (token: Tokens.List) => {
                //         return this.renderList(token);
                //     }
                // }
            ]
        }
    }
}
