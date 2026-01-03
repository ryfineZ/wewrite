import { requestUrl } from "obsidian";

export function areObjectsEqual(obj1: unknown, obj2: unknown): boolean {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1 as Record<string, unknown>);
    const keys2 = Object.keys(obj2 as Record<string, unknown>);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        const obj1Record = obj1 as Record<string, unknown>;
        const obj2Record = obj2 as Record<string, unknown>;
        if (!keys2.includes(key) || !areObjectsEqual(obj1Record[key], obj2Record[key])) {
            return false;
        }
    }

    return true;
}

export async function fetchImageBlob(url: string): Promise<Blob> {
    if (!url) {
        throw new Error(`Invalid URL: ${url}`);
    }

    if (url.startsWith('data:')) {
        return dataUrlToBlob(url);
    }

    try {
        const response = await requestUrl(url);
        if (!response.arrayBuffer) {
            throw new Error(`Failed to fetch image from ${url}`);
        }
        return new Blob([response.arrayBuffer]);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Error fetching image from ${url}: ${message}`);
    }
}

function dataUrlToBlob(dataUrl: string): Blob {
    const [header, data] = dataUrl.split(',');
    const match = header.match(/data:(.*?);base64/);
    const mime = match ? match[1] : 'application/octet-stream';
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: mime });
}

export function serializeElement(element: Element): string {
    return new XMLSerializer().serializeToString(element);
}

export function serializeChildren(element: Element): string {
    const serializer = new XMLSerializer();
    let result = "";
    element.childNodes.forEach((child) => {
        result += serializer.serializeToString(child);
    });
    return result;
}

export function replaceDivWithSection(root: HTMLElement) {
    const html = serializeElement(root)
        .replaceAll(/<div /g, "<section ")
        .replaceAll(/<\/div>/g, "</section>");
    return html;
}

export function removeThinkTags(content: string): string {
	// 使用正则表达式匹配 <think> 和 </think> 标签及其内容，并替换为空字符串
	const regex = /<think>[\s\S]*<\/think>/g;
	return content.replace(regex, "");
}
