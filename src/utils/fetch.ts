import { requestUrl, type RequestUrlParam } from 'obsidian';

type ObsidianFetch = (
  url: RequestInfo | URL | string,
  init?: RequestInit
) => Promise<Response>;

function normalizeBody(body: unknown): string | ArrayBuffer | undefined {
  if (typeof body === 'string' || body === undefined) {
    return body;
  }

  if (body instanceof ArrayBuffer) {
    return body;
  }

  if (ArrayBuffer.isView(body)) {
    const view = new Uint8Array(body.buffer, body.byteOffset, body.byteLength);
    return view.slice().buffer; // 拷贝出一段 ArrayBuffer
  }

  throw new Error('Unsupported body type passed to requestUrl');
}

export const obsidianFetch: ObsidianFetch = async (url, init) => {
  const method = init?.method ?? 'GET';
  const headers = init?.headers as Record<string, string> | undefined;

  const body = normalizeBody(init?.body);
  const urlString = resolveUrlString(url);
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (headers?.authorization) {
    requestHeaders.Authorization = headers.authorization;
  }
  const param: RequestUrlParam = {
    url: urlString,
    method: method,
    headers: requestHeaders,
    body: body,
  };

  return await requestUrl(param).then(
    (res) => {
      return {
        ok: res.status >= 200 && res.status < 300,
        status: res.status,
        statusText: '', // Obsidian 没有 statusText 字段
        headers: new Headers(res.headers),
        json: () => Promise.resolve(JSON.parse(res.text)),
        text: () => Promise.resolve(res.text),
        arrayBuffer: () => Promise.resolve(new TextEncoder().encode(res.text).buffer),
      } as Response;
    },
  ).catch((e) => {
    return {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      headers: new Headers(),
      json: () => Promise.resolve({ error: e }),
      text: () => Promise.resolve(String(e)),
      arrayBuffer: () => Promise.resolve(new TextEncoder().encode(String(e)).buffer),
    } as Response;
  });
};

function resolveUrlString(url: RequestInfo | URL): string {
  if (typeof url === 'string') {
    return url;
  }
  if (url instanceof URL) {
    return url.toString();
  }
  if (url instanceof Request) {
    return url.url;
  }
  throw new Error('Unsupported request url type');
}
