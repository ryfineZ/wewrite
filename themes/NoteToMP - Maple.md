---
theme_name: NoteToMP Maple
---

```css
/* =========================================================== */
/* 笔记样式 https://github.com/xbmlz/hexo-theme-maple            */
/* =========================================================== */
.wewrite {
    user-select: text;
    -webkit-user-select: text;
    color: #555;
    font-family: "Inter", Inter var, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}

.wewrite:last-child {
    margin-bottom: 0;
}

.wewrite .fancybox-img {
    border: none;
}

.wewrite .fancybox-img:hover {
    opacity: none;
    border: none;
}

/*
  =================================
   Heading 
  ==================================
  */
.wewrite h1 {
    color: #222;
    font-weight: 800;
    font-size: 2.25em;
    margin-top: 0;
    margin-bottom: 0.8888889em;
    line-height: 1.1111111;
}

.wewrite h2 {
    color: inherit;
    font-weight: 700;
    font-size: 1.5em;
    margin-top: 2em;
    margin-bottom: 1em;
    line-height: 1.3333333;
}

.wewrite h3 {
    color: inherit;
    font-weight: 600;
    font-size: 1.25em;
    margin-top: 1.6em;
    margin-bottom: 0.6em;
    line-height: 1.6;
}

.wewrite h4 {
    color: inherit;
    font-weight: 600;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    line-height: 1.5;
}

/*
  =================================
  Horizontal Rules
  ==================================
  */
.wewrite hr {
    border-color: rgba(125, 125, 125, 0.3);
    margin-top: 3em;
    margin-bottom: 3em;
}

/*
  =================================
  Paragraphs
  ==================================
  */
.wewrite p {
    margin: 1em 0;
}

/*
  =================================
  Emphasis
  ==================================
  */
.wewrite strong {
    color: #222;
    font-weight: 600;
}

.wewrite em {
    color: inherit;
}

.wewrite s {
    color: inherit;
}

/*
  =================================
  Blockquotes
  ==================================
  */
.wewrite blockquote {
    font-size: 1rem;
    display: block;
    margin: 1em 0;
    padding: 1em 1.2em 1em 1.2em;
    position: relative;
    color: inherit;
    border-left: 0.25rem solid rgba(125, 125, 125, 0.302);
}

.wewrite blockquote p {
    margin: 0;
}

.wewrite blockquote footer strong {
    margin-right: 0.5em;
}

/*
  =================================
  List
  ==================================
  */
.wewrite ul {
    margin: 0;
    /* padding: 0; */
    margin-top: 1.25em;
    margin-bottom: 1.25em;
}

.wewrite ul>li {
    position: relative;
    /* padding-left: 1.75rem; */
    line-height: 1.8em;
}


.wewrite ul>li::marker {
    color: #555;
    /* font-size: 1.5em; */
}

.wewrite ol {
    margin: 0;
    padding: 0;
    margin-top: 1.25em;
    margin-bottom: 0em;
    list-style-type: decimal;
}

.wewrite ol>li {
    position: relative;
    padding-left: 0.8em;
    margin-left: 2em;
    line-height: 1.8em;
}

/*
  =================================
  Link
  ==================================
  */
.wewrite a {
    color: #000;
    text-decoration: none;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid rgba(125, 125, 125, 0.3);
    transition: border 0.3s ease-in-out;
}

.wewrite a:hover {
    border-bottom: 1px solid #555;
}

/*
  =================================
  Table
  ==================================
  */
.wewrite table {
    width: 100%;
    table-layout: auto;
    text-align: left;
    margin-top: 2em;
    margin-bottom: 2em;
    font-size: 0.875em;
    line-height: 1.7142857;
    border-collapse: collapse;
    border-color: inherit;
    text-indent: 0;
}

.wewrite table thead {
    color: #000;
    font-weight: 600;
    border-bottom-width: 1px;
    border-bottom-color: #d1d5db;
}

.wewrite table thead th {
    vertical-align: bottom;
    padding-right: 0.5714286em;
    padding-bottom: 0.5714286em;
    padding-left: 0.5714286em;
}

.wewrite table thead th:first-child {
    padding-left: 0;
}

.wewrite table thead th:last-child {
    padding-right: 0;
}

.wewrite table tbody tr {
    border-bottom-width: 1px;
    border-bottom-color: #e5e7eb;
}

.wewrite table tbody tr:last-child {
    border-bottom-width: 0;
}

.wewrite table tbody td {
    vertical-align: top;
    padding-top: 0.5714286em;
    padding-right: 0.5714286em;
    padding-bottom: 0.5714286em;
    padding-left: 0.5714286em;
}

.wewrite table tbody td:first-child {
    padding-left: 0;
}

.wewrite table tbody td:last-child {
    padding-right: 0;
}

/*
  =================================
  Images
  ==================================
  */
.wewrite img {
    margin: 2em auto;
}

.wewrite .footnotes hr {
    margin-top: 4em;
    margin-bottom: 0.5em;
}

/*
  =================================
  Code
  ==================================
  */
.wewrite .code-section {
    display: flex;
    border: solid 1px rgb(240, 240, 240);
    margin: 1.5em 0;
    line-height: 26px;
    padding: 0.5em;
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
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

.wewrite .code-section ul>li {
    line-height: 26px;
    text-align: right;
}

.wewrite .code-section pre {
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    white-space: normal;
    overflow-x: auto;
    padding: 0 0 0 1em;
    background: transparent !important;
}

.wewrite code {
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
    color: #333;
    background: rgb(250, 250, 250);
    font-size: 0.875em;
    padding: 1em;
    text-wrap: nowrap;
}

.wewrite .code-section pre code {
    color: inherit;
    display: flex;
    text-wrap: nowrap;
    font-size: inherit;
    padding: 0;
    background: transparent;
}
```
