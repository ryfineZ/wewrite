---
theme_name: NoteToMP MWeb Typo
---

```css
/* MWeb：增大字体，便于阅读 */
.wewrite {
  font-size: 16px;
  min-width: 200px;
  max-width: 760px;
  color: #333;
  background: #fff;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-rendering: optimizelegibility;
  /* 内外边距通常让各个浏览器样式的表现位置不同 */
  /* 重设 HTML5 标签, IE 需要在 js 中 createElement(TAG) */
  /* HTML5 媒体文件跟 img 保持一致 */
  /* 去掉各Table cell 的边距并让其边重合 */
  /* 去除默认边框 */
  /* 块/段落引用 */
  /* Firefox 以外，元素没有下划线，需添加 */
  /* 添加鼠标问号，进一步确保应用的语义是正确的（要知道，交互他们也有洁癖，如果你不去掉，那得多花点口舌） */
  /* 一致的 del 样式 */
  /* 去掉列表前的标识, li 会继承，大部分网站通常用列表来很多内容，所以应该当去 */
  /* 对齐是排版最重要的因素, 别让什么都居中 */
  /* 统一上标和下标 */
  /* 让链接在 hover 状态下显示下划线 */
  /* 默认不显示下划线，保持页面简洁 */
  /* 专名号：虽然 u 已经重回 html5 Draft，但在所有浏览器中都是可以使用的，
  * 要做到更好，向后兼容的话，添加 class="typo-u" 来显示专名号
  * 关于 <u> 标签：http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-u-element
  * 被放弃的是 4，之前一直搞错 http://www.w3.org/TR/html401/appendix/changes.html#idx-deprecated
  * 一篇关于 <u> 标签的很好文章：http://html5doctor.com/u-element/
  */
  /* 标记，类似于手写的荧光笔的作用 */
  /* 一致化 horizontal rule */
  /* 底部印刷体、版本等标记 */
  /* 可拖动文件添加拖动手势 */
  /* 强制文本换行 */
  /* 提供 serif 版本的字体设置: iOS 下中文自动 fallback 到 sans-serif */
  /* 保证块/段落之间的空白隔行 */
  /* 标题应该更贴紧内容，并与其他块区分，margin 值要相应做优化 */
  /* 在文章中，应该还原 ul 和 ol 的样式 */
  /* 同 ul/ol，在文章中应用 table 基本格式 */
  /* Responsive images */
  /* 代码片断 */
}
.wewrite dl,
.wewrite dt,
.wewrite dd,
.wewrite ul,
.wewrite ol,
.wewrite li,
.wewrite h1,
.wewrite h2,
.wewrite h3,
.wewrite h4,
.wewrite h5,
.wewrite h6,
.wewrite pre,
.wewrite code,
.wewrite form,
.wewrite fieldset,
.wewrite legend,
.wewrite input,
.wewrite textarea,
.wewrite p,
.wewrite blockquote,
.wewrite th,
.wewrite td,
.wewrite hr,
.wewrite button,
.wewrite article,
.wewrite aside,
.wewrite details,
.wewrite figcaption,
.wewrite figure,
.wewrite footer,
.wewrite header,
.wewrite menu,
.wewrite nav,
.wewrite section {
  margin: 0;
  padding: 0;
}
.wewrite article,
.wewrite aside,
.wewrite details,
.wewrite figcaption,
.wewrite figure,
.wewrite footer,
.wewrite header,
.wewrite menu,
.wewrite nav,
.wewrite section {
  display: block;
}
.wewrite audio,
.wewrite canvas,
.wewrite video {
  display: inline-block;
}
.wewrite table {
  border-collapse: collapse;
  border-spacing: 0;
}
.wewrite fieldset,
.wewrite img {
  border: 0;
}
.wewrite blockquote {
  position: relative;
  color: #999;
  font-weight: 400;
  border-left: 1px solid #1abc9c;
  padding-left: 1em;
  margin: 1em 3em 1em 2em;
}
.wewrite acronym,
.wewrite abbr {
  border-bottom: 1px dotted;
  font-variant: normal;
  text-decoration: none;
}
.wewrite abbr {
  cursor: help;
}
.wewrite del {
  text-decoration: line-through;
}
.wewrite address,
.wewrite caption,
.wewrite cite,
.wewrite code,
.wewrite dfn,
.wewrite em,
.wewrite th,
.wewrite var {
  font-style: normal;
  font-weight: 400;
}
.wewrite ul,
.wewrite ol {
  list-style: none;
}
.wewrite caption,
.wewrite th {
  text-align: left;
}
.wewrite sub,
.wewrite sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
}
.wewrite :root sub,
.wewrite :root sup {
  vertical-align: baseline;
  /* for ie9 and other modern browsers */
}
.wewrite sup {
  top: -0.5em;
}
.wewrite sub {
  bottom: -0.25em;
}
.wewrite a {
  color: #1abc9c;
}
.wewrite a:hover {
  text-decoration: underline;
}
.wewrite a {
  border-bottom: 1px solid #1abc9c;
}
.wewrite a:hover {
  border-bottom-color: #555;
  color: #555;
  text-decoration: none;
}
.wewrite ins,
.wewrite a {
  text-decoration: none;
}
.wewrite u,
.wewrite .typo-u {
  text-decoration: underline;
}
.wewrite mark {
  background: #fffdd1;
  border-bottom: 1px solid #ffedce;
  padding: 2px;
  /* margin: 0 5px; */
}
.wewrite hr {
  border: none;
  border-bottom: 1px solid #cfcfcf;
  margin-bottom: 0.8em;
  height: 10px;
}
.wewrite small,
.wewrite .typo-small,
.wewrite figcaption {
  font-size: 0.9em;
  color: #888;
}
.wewrite strong,
.wewrite b {
  font-weight: bold;
  color: #000;
}
.wewrite [draggable] {
  cursor: move;
}
.wewrite .clearfix {
  zoom: 1;
}
.wewrite .textwrap,
.wewrite .textwrap td,
.wewrite .textwrap th {
  word-wrap: break-word;
  word-break: break-all;
}
.wewrite .textwrap-table {
  table-layout: fixed;
}
.wewrite .serif {
  font-family: Palatino, Optima, Georgia, serif;
}
.wewrite p,
.wewrite pre,
.wewrite ul,
.wewrite ol,
.wewrite dl,
.wewrite form,
.wewrite hr,
.wewrite table,
.wewrite .typo-p,
.wewrite .typo-pre,
.wewrite .typo-ul,
.wewrite .typo-ol,
.wewrite .typo-dl,
.wewrite .typo-form,
.wewrite .typo-hr,
.wewrite .typo-table,
.wewrite blockquote {
  margin-bottom: 1.2em;
}
.wewrite h1,
.wewrite h2,
.wewrite h3,
.wewrite h4,
.wewrite h5,
.wewrite h6 {
  font-family: PingFang SC, Verdana, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
  font-weight: lighter;
  color: #000;
  line-height: 1.35;
}
.wewrite h1,
.wewrite h2,
.wewrite h3,
.wewrite h4,
.wewrite h5,
.wewrite h6,
.wewrite .typo-h1,
.wewrite .typo-h2,
.wewrite .typo-h3,
.wewrite .typo-h4,
.wewrite .typo-h5,
.wewrite .typo-h6 {
  margin-top: 1.2em;
  margin-bottom: 0.6em;
  line-height: 1.35;
}
.wewrite h1,
.wewrite .typo-h1 {
  font-size: 2em;
}
.wewrite h2,
.wewrite .typo-h2 {
  font-size: 1.8em;
}
.wewrite h3,
.wewrite .typo-h3 {
  font-size: 1.6em;
}
.wewrite h4,
.wewrite .typo-h4 {
  font-size: 1.4em;
}
.wewrite h5,
.wewrite h6,
.wewrite .typo-h5,
.wewrite .typo-h6 {
  font-size: 1.2em;
}
.wewrite ul,
.wewrite .typo-ul {
  margin-left: 1.3em;
  list-style: disc;
}
.wewrite ol,
.wewrite .typo-ol {
  list-style: decimal;
  margin-left: 1.9em;
}
.wewrite li ul,
.wewrite li ol,
.wewrite .typo-ul ul,
.wewrite .typo-ul ol,
.wewrite .typo-ol ul,
.wewrite .typo-ol ol {
  margin-bottom: 0.8em;
  margin-left: 2em;
}
.wewrite li ul,
.wewrite .typo-ul ul,
.wewrite .typo-ol ul {
  list-style: circle;
}
.wewrite table th,
.wewrite table td,
.wewrite .typo-table th,
.wewrite .typo-table td,
.wewrite table caption {
  border: 1px solid #ddd;
  padding: 0.5em 1em;
  color: #666;
}
.wewrite table th,
.wewrite .typo-table th {
  background: #fbfbfb;
}
.wewrite table thead th,
.wewrite .typo-table thead th {
  background: #f1f1f1;
}
.wewrite table caption {
  border-bottom: none;
}
.wewrite .typo-em,
.wewrite em,
.wewrite legend,
.wewrite caption {
  color: #000;
  font-weight: inherit;
}
.wewrite img {
  max-width: 100%;
}
.wewrite .footnotes hr {
  margin-top: 4em;
  margin-bottom: 0.5em;
}
.wewrite pre,
.wewrite code,
.wewrite pre tt {
  font-family: Courier, "Courier New", monospace;
}

/* 代码块 */
.wewrite .code-section {
  display: flex;
  border: solid 1px #ddd;
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
