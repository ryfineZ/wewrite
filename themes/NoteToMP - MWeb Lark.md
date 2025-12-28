---
theme_name: NoteToMP MWeb Lark
---

```css
/*
 * Default theme，适用于 core/mweb-base.scss。
 * 取值参考 chrome 默认样式：
 * https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/core/css/html.css
 * 所有 import "core/mweb-base.scss" 的文件都应该同时导入此变量文件。
 */
/* color */
/* font & line */
/* boxing */
/* elememts */
/* color */
/* prism & pre */
/* font */
/* header */
/* spacing */
/* table */
.wewrite h1,
.wewrite h2,
.wewrite h3,
.wewrite h4,
.wewrite h5,
.wewrite h6 {
  color: #1f2329;
  line-height: 1.4;
  font-weight: 600;
  margin-top: 1em;
  margin-bottom: 0.37em;
}
.wewrite blockquote {
  display: block;
  margin-left: 0;
  padding-left: 14px;
  border-left: 2px solid #3370ff;
  color: rgba(31, 35, 41, 0.7);
}
.wewrite a {
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
  hyphens: auto;
  word-break: break-word;
  color: #3370ff;
  text-decoration: none;
}
.wewrite hr {
  margin: 13px 0 12px;
  border: 0px;
  height: 1px;
  background-origin: content-box;
  background-image: linear-gradient(90deg, rgb(187, 191, 196), rgb(187, 191, 196));
  background-repeat: no-repeat;
}
.wewrite ul > li:not([class*=task-list-item]) {
  word-wrap: break-all;
  padding-left: 12px;
  color: #3370ff;
}
.wewrite ul > li:not([class*=task-list-item]) > section {
  color: #1f2329;
}
.wewrite ul > li:not([class*=task-list-item])::marker {
  color: #3370ff;
}
.wewrite ol > li:not([class*=task-list-item]) {
  word-wrap: break-all;
  padding-left: 12px;
}
.wewrite ol > li:not([class*=task-list-item]) > section {
  color: #1f2329;
}
.wewrite ol > li:not([class*=task-list-item])::marker {
  color: #3370ff;
}
.wewrite li + li,
.wewrite ul ul,
.wewrite ol ul,
.wewrite ul ol,
.wewrite ol ol,
.wewrite li ul,
.wewrite li ol {
  margin-top: 4px;
}
.wewrite .footnotes hr {
  margin-top: 4em;
  margin-bottom: 0.5em;
}
.wewrite code {
  border-radius: 4px;
  margin-left: 2px;
  margin-right: 2px;
  border: 1px solid #dee0e3;
  background-color: #f5f6f7;
  word-spacing: normal;
  line-height: 1.6em;
  padding: 0 2px;
}
.wewrite .code-section pre code {
  border: none;
  background-color: transparent;
  line-height: inherit;
  padding: 0;
  margin: 0;
  text-wrap: nowrap;
}
.wewrite .code-section ul li {
  color: inherit;
  margin: 0;
}

/* 代码块 */
.wewrite .code-section {
  display: flex;
  border: solid 1px #dee0e3;
  margin: 1.5em 0;
  line-height: 26px;
  padding: 0.5em;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
.wewrite .code-section pre {
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  white-space: normal;
  overflow-x: auto;
  padding: 0 0 0 1em;
}
.wewrite .code-section code {
  display: flex;
  text-wrap: nowrap;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
.wewrite .code-section ul {
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  width: fit-content;
  flex-shrink: 0;
  height: 100%;
  line-height: 26px;
  list-style-type: none;
}
.wewrite .code-section ul > li {
  text-align: right;
}
```
