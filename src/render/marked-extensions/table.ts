/**
 * marked extension for table
 * add container for table
 * 
 * 
 */

import { Tokens, MarkedExtension } from "marked";
import { WeWriteMarkedExtension } from "./extension";
import { ObsidianMarkdownRenderer } from "../markdown-render";
import { serializeElement } from "src/utils/utils";


export class Table extends WeWriteMarkedExtension {

    tableIndex = 0;
    prepare(): Promise<void> {
        this.tableIndex = 0;
        return Promise.resolve();
    }
    markedExtension(): MarkedExtension {
        return {
            extensions: [
                {
                    name: 'table',
                    level: 'block', // Is this a block-level or inline-level tokenizer?
                    renderer : (token:Tokens.Table)=> {
                        const root = ObsidianMarkdownRenderer.getInstance(this.plugin.app).queryElement(this.tableIndex, 'table');
                        if (!root) {
                            return '<section class="table-container"><p>Table content not found</p><section>';
                        }
                        this.tableIndex++;
                        return `<section class="table-container">${serializeElement(root)}</section>`;
                    }
                }
            ]
        }
    }
}
