---
theme_name: NoteToMP MWeb Dieci
---

```css
/*
 * PrismJS default theme
 * 这个文件只应该包含变量
 */
/*
 * Default bear theme，适用于 core/mweb-bear.scss。
 * 所有 bear 主题，只需 import 这个文件，然后修改配色方案即可。
 */
/* font */
/* container */
/*  spacing */
/* color */
/* other */
/**
 * 在 bear 的主题中，某些变量的取值和其他变量是绑定的。
 * 统一写在这里，这个文件应该在变量文件的最后被引入。
 */
/**
 * Bear 的默认样式表。通过调整各个颜色变量的取值，就可以得到不同的 bear 主题。
 * Bear 的配色方案位于 src/themes/bear-palettes 目录下。
 */
.wewrite {
  font-size: 16px;
  color: rgb(212, 212, 212);
  background-color: rgb(0, 0, 0);
  line-height: 1.6em;
  margin: 0 0;
  padding: 1em 1em;
}
.wewrite p,
.wewrite pre,
.wewrite dl,
.wewrite form,
.wewrite details,
.wewrite dl,
.wewrite blockquote,
.wewrite table,
.wewrite xmp,
.wewrite plaintext,
.wewrite listing,
.wewrite figure {
  margin: 0.75em 0 0.45em;
}
.wewrite hr {
  margin: 0.75em auto;
}
.wewrite h1,
.wewrite h2,
.wewrite h3,
.wewrite h4,
.wewrite h5,
.wewrite h6 {
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  margin-left: 0;
  margin-right: 0;
  font-weight: 600;
  line-height: 1.5em;
  color: rgb(252, 206, 35);
}
.wewrite h1 {
  font-size: 1.5em;
}
.wewrite h2 {
  font-size: 1.3em;
}
.wewrite h3 {
  font-size: 1.1em;
}
.wewrite h4 {
  font-size: 1em;
}
.wewrite h5 {
  font-size: 1em;
}
.wewrite h6 {
  font-size: 1em;
}
.wewrite hr {
  height: 1px;
  border: 0;
  background-color: rgb(29, 29, 29);
  border-style: inset;
  border-width: 1px;
}
.wewrite p {
  margin-left: 0;
  margin-right: 0;
}
.wewrite pre {
  padding: 0;
  border: 0;
}
.wewrite blockquote {
  display: block;
  padding-left: 0.8em;
  border-left: 0.2em solid rgb(242, 148, 41);
  color: rgb(212, 212, 212);
}
.wewrite blockquote > :first-child {
  margin-top: 0;
}
.wewrite blockquote > :last-child {
  margin-bottom: 0;
}
.wewrite li {
  word-wrap: break-all;
}
.wewrite ul {
  margin-left: 1.3em;
  padding: 0;
}
.wewrite li::marker {
  color: rgb(242, 148, 41);
}
.wewrite li > p {
  margin: 0;
}
.wewrite ol {
  padding-left: 1.3em;
  list-style-type: decimal;
}
.wewrite img {
  max-width: 100%;
  height: auto;
}
.wewrite u {
  text-decoration: none;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgb(242, 148, 41) 50%);
  background-repeat: repeat-x;
  background-size: 2px 2px;
  background-position: 0 1em;
}
.wewrite a {
  color: rgb(227, 146, 9);
  text-decoration: none;
}
.wewrite a img {
  border: none;
}
.wewrite b,
.wewrite strong {
  font-weight: bold;
}
.wewrite i,
.wewrite cite,
.wewrite em,
.wewrite var,
.wewrite address,
.wewrite dfn {
  font-style: italic;
}
.wewrite del,
.wewrite s {
  color: rgb(146, 147, 146);
}
.wewrite pre,
.wewrite xmp,
.wewrite plaintext,
.wewrite listing,
.wewrite code,
.wewrite kbd,
.wewrite tt,
.wewrite samp {
  font-family: Menlo-Regular, Menlo, Monaco, Consolas, "Courier New", monospace;
}
.wewrite mark {
  color: inherit;
  display: inline;
  padding: 0.2em 0.5em;
  background-color: rgb(16, 68, 3);
}
.wewrite figcaption {
  text-align: center;
}
.wewrite table {
  color: rgb(229, 227, 229);
  border-collapse: collapse;
  background-color: rgb(16, 16, 16);
  border-spacing: 2px;
  font-size: 1em;
  border: 1px;
  border-spacing: 0;
}
.wewrite th,
.wewrite td {
  padding: 0.7em 1em;
  font-size: 0.9em;
  border: 1px solid rgb(29, 29, 29);
}
.wewrite caption,
.wewrite th,
.wewrite td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}
.wewrite .footnotes > ol li {
  text-indent: 0;
}
.wewrite .footnotes hr {
  margin-top: 4em;
  margin-bottom: 0.5em;
}
.wewrite code {
  display: inline;
  color: rgb(229, 227, 229);
}

/* 代码块 */
.wewrite .code-section {
  display: flex;
  border: solid 1px rgb(29, 29, 29);
  margin: 1.5em 0;
  line-height: 26px;
  padding: 0.5em;
  font-family: Menlo-Regular, Menlo, Monaco, Consolas, "Courier New", monospace;
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
  font-family: Menlo-Regular, Menlo, Monaco, Consolas, "Courier New", monospace;
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
