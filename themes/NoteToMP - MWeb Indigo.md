---
theme_name: NoteToMP MWeb Indigo
---

```css
.wewrite {
  padding: 0 1em;
  color: #595959;
  font-size: 16px;
  line-height: 1.8em;
  background-image: linear-gradient(90deg, rgba(60, 10, 30, 0.05) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, 0.05) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  word-break: break-all;
  /* 主题自定义 */
  /* 主题自定义 end */
  /* 布局，一般不需要改动 */
}
.wewrite blockquote {
  margin-left: 0;
  background-color: #ebf4ff;
  border-color: #7f9cf5;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #667eea;
}
.wewrite strong {
  color: #5a67d8;
}
.wewrite a {
  border-color: #667eea;
}
.wewrite blockquote,
.wewrite details,
.wewrite dl,
.wewrite ol,
.wewrite p,
.wewrite pre,
.wewrite table,
.wewrite ul {
  margin-bottom: 1rem;
}
.wewrite ol {
  list-style: decimal;
}
.wewrite ul {
  list-style: disc;
}
.wewrite ol,
.wewrite ul {
  padding-left: 2em;
}
.wewrite h1,
.wewrite h2 {
  border-color: #5a67d8;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 0px;
  font-weight: 600;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
}
.wewrite h1,
.wewrite h2 {
  border-bottom: 1px solid #eaecef !important;
  border-left-width: 6px;
}
.wewrite h1,
.wewrite h2,
.wewrite h3,
.wewrite h4,
.wewrite h5,
.wewrite h6 {
  margin-bottom: 16px;
  line-height: 1.25;
}
.wewrite blockquote {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-left: 0.25em solid;
}
.wewrite blockquote > :last-child {
  margin-bottom: 0;
}
.wewrite blockquote > :first-child {
  margin-top: 0;
}
.wewrite strong {
  font-weight: bold;
}
.wewrite strong::before {
  content: "「";
}
.wewrite strong::after {
  content: "」";
}
.wewrite a {
  text-decoration: none;
  border-bottom: 1px solid;
}
.wewrite .footnote-ref {
  border-width: 0px;
}
.wewrite picture img {
  border-radius: 6px;
  display: block;
  margin: 10px auto;
  -o-object-fit: contain;
  object-fit: contain;
  box-shadow: 2px 4px 7px #999;
}
.wewrite img {
  max-width: 100%;
  display: block;
  margin: 10px auto;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 2px 4px 7px #999;
}
.wewrite picture {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
}
.wewrite .footnotes {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.wewrite .footnotes hr {
  margin-top: 4em;
  margin-bottom: 0.5em;
}
.wewrite code,
.wewrite a {
  color: #5a67d8;
}
.wewrite a {
  border-color: #667eea;
}
.wewrite code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  background-color: #ebf4ff;
}
.wewrite pre > code {
  background-color: transparent;
}

/* 代码块 */
.wewrite .code-section {
  display: flex;
  border: solid 1px #5a67d8;
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
