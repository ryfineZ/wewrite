/** 
 * marked extension for iconize 
 */
import { MarkedExtension, Tokens } from "marked";
import { sanitizeHTMLToDom } from 'obsidian';
import { WeWriteMarkedExtension } from "./extension";
import { serializeElement } from "src/utils/utils";
import { $t } from "src/lang/i18n";

const iconsRegex = /:(.*?):/;
const iconsRegexTokenizer = /^:(.*?):/;
export class IconizeRender extends WeWriteMarkedExtension {
    iconizeIndex: number = 0;
    icon?: {
        api?: {
            getIconByName: (name: string) => { svgElement: string } | undefined;
        };
    };

    prepare(): Promise<void> {
        this.iconizeIndex = 0;
        const plugin = this.plugin.app.plugins.plugins["obsidian-icon-folder"];
        if (plugin && typeof plugin === "object") {
            this.icon = plugin as { api?: { getIconByName: (name: string) => { svgElement: string } | undefined } };
        } else {
            this.icon = undefined;
        }
        return Promise.resolve();
    }

    getIconByname(iconName: string) {
        return this.icon?.api?.getIconByName(iconName)
    }
    render(iconName: string) {
        const iconObject = this.getIconByname(iconName)
        if (iconObject) {
            const rootSpan = createSpan({
                cls: 'cm-iconize-icon',
                attr: {
                    'aria-label': iconName,
                    'data-icon': iconName,
                    'aria-hidden': 'true',
                },
            });
            rootSpan.setCssProps({
                display: 'inline-flex',
                transform: 'translateY(13%)',
            });
            // rootSpan.innerHTML = iconObject.svgElement; 

			rootSpan.appendChild(sanitizeHTMLToDom( iconObject.svgElement))
            return serializeElement(rootSpan);
        }
        return `<span>${iconName}${$t('render.render-failed')}</span>`
    }

    markedExtension(): MarkedExtension {
        return {
            extensions: [{
                name: 'iconize',
                level: 'inline',
                start: (src: string) => {
                    const match = src.match(iconsRegex);
                    if (match) {
                        return match.index;
                    }
                },
                tokenizer: (src: string) => {
                    const match = src.match(iconsRegexTokenizer);
                    if (match) {
                        return {
                            type: 'iconize',
                            raw: match[0],
                            text: match[1],
                        };
                    }
                },
                renderer: (token: Tokens.Generic) => {
                    return this.render(token.text);
                }
            }]
        }
    }
}
