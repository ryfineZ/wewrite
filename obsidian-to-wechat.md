## Obsidian 笔记 → 渲染 → 微信公众号草稿箱流程对比

本文对比 `note-to-mp` 与 `wewrite` 两个插件，从本地 Markdown 到公众号草稿箱的完整链路，并标出关键实现点与差异。

---

### 业务流程（高层视角）

**NoteToMP 用户流程**
- 前置：在设置里填入 AuthKey、公众号信息，下载主题/高亮资源；可选设置默认主题/高亮、行号、空行渲染、自定义 CSS。
- 操作：
  1) 打开目标 Markdown（可在右键菜单或命令面板触发“复制到公众号/发布草稿”）。
  2) 右侧预览中选主题、高亮，检查样式。
  3) 选择封面（默认/本地文件/Frontmatter 指定），如需先点“上传图片”将本地图上传并替换预览链接。
  4) 点击“发草稿” → 插件自动获取 token、上传图片/封面、内联样式，生成草稿；成功后提示。
  5) 可改用“复制”直接复制带样式的 HTML，到公众号编辑器粘贴。
- 批量：在文件夹右键“发布到公众号”可批量发多篇，支持取消。

**WeWrite 用户流程**
- 前置：在设置里添加公众号账号（或中心 token），配置主题目录（默认 `wewrite-css-styles`）；如需 AI/素材侧栏可额外配置。
- 操作：
  1) 打开 Markdown，右侧预览自动渲染（可选实时渲染开关）。
  2) 预览顶部选择主题（从主题目录的 md 文件中选），填写封面/摘要等文章属性。
  3) 点击“发送到草稿箱” → 插件对当前 DOM 内联样式、上传图片/视频/SVG/canvas，生成草稿并返回草稿链接。
  4) 可用素材视图管理已拉取的素材/草稿。
- 主题获取：可在设置里“下载主题”，从远程主题列表拉取 md 主题到本地目录再选择。

---

### NoteToMP（/Users/zhangyufan/Projects/note-to-mp）

**入口与设置**
- `src/main.ts`：注册右侧预览、命令、右键菜单；调用 `loadSettings`/`loadAssets`。
- 设置页：`src/setting-tab.ts`，配置 AuthKey、公众号信息、默认主题/高亮、数学语法、行号、空行渲染、自定义 CSS/专家设置等。

**渲染链路**
- 预览视图：`src/note-preview.ts`，负责 UI（主题/高亮下拉、封面选择、上传/发草稿/导出）。
- Markdown → HTML：`ArticleRender.renderMarkdown` (`src/article-render.ts`) 调用 `MarkedParser` (`src/markdown/parser.ts`)：
  - marked + 扩展：本地/远程图片、代码块/卡片、链接/脚注/话题、Callout、嵌入、数学、空行等。
  - frontmatter 读取：appid、主题、高亮、摘要、封面、封面裁剪、评论开关等（键名可在 `expert-settings` 中自定义）。
- 样式处理：
  - `AssetsManager` (`src/assets.ts`) 读取 `assets/themes/*.css`、`assets/highlights/*.css`，以及自定义 CSS/基础 CSS。
  - `ArticleRender.getCSS` 拼出 `InlineCSS + highlight + theme + base/custom CSS`。
  - `applyCSS` (`src/utils.ts`) 将 CSS 规则“烘焙”为行内样式，并处理 `::before/::after` 伪元素（插入真实节点），确保公众号粘贴/上传后样式不丢。

**资源与特殊块**
- 图片/附件：`LocalImageManager` (`src/markdown/local-file.ts`) 记录本地/远程图片；上传后替换 URL。
- WebP/水印：`imagelib.ts` + `lib.wasm` 负责 WebP 转 JPG、加水印。
- Mermaid/Excalidraw：`cachedElementsToImages` 用 `html-to-image` 转 PNG 内嵌（或 Excalidraw SVG 渲染）。

**上传草稿**
- 触发：`NotePreview.postArticle` → `ArticleRender.postArticle(appid, cover)`。
- Token：`wxGetToken` (`src/weixin-api.ts`) 使用 AuthKey + appid/secret。
- 封面选择：frontmatter thumb_media_id → frontmatter cover（本地/远程）→ 本地上传 → 默认永久素材。
- 图片上传：本地/远程图片统一走微信素材接口，替换 DOM 中的 src。
- 最终调用微信草稿接口 `wxAddDraft` 提交：标题/摘要/封面 media_id + 已内联样式的正文 HTML，返回 media_id。

---

### WeWrite（/Users/zhangyufan/Projects/wewrite）

**入口与设置**
- `src/main.ts`：注册预览视图（PreviewPanel）、素材视图、命令、状态栏 spinner；账号/设置存储在 PouchDB（`settings/wewrite-setting.ts`），支持“中心 token”模式。
- 设置页：`src/settings/setting-tab.ts`，配置公众号账号、主题目录、行号、实时渲染等。

**渲染链路**
- 预览视图：`src/views/previewer.ts`（右侧）：
  - `WechatRender` (`src/render/wechat-render.ts`) 使用 marked + 扩展（代码高亮、数学、表格、链接/摘要、图片、嵌入、Icon、Footnote 等）生成 HTML。
  - 初始 Markdown 渲染依赖 Obsidian `MarkdownRenderer` (`src/render/markdown-render.ts`)，等待 callout/mermaid 等渲染完成。
- 主题处理：
  - `ThemeManager` (`src/theme/theme-manager.ts`) 读取默认样式块 + 用户主题（vault 内 `css_styles_folder` 目录的 md 文件里 ```css``` 代码块）。
  - `CSSMerger` (`src/theme/CssMerger.ts`) 合并变量与规则，并“写入行内样式”；已改进为保留类名、支持 `::before/::after`（将伪元素转为真实子节点），避免公众号端丢样式。
  - 预览曾依赖 Shadow DOM 的样式表；发送前需再次对 DOM 执行主题内联（现已在 `PreviewPanel.sendArticleToDraftBox` 调用）。
  - 代码高亮需用户在主题 CSS 里自行附加（默认不会加载独立高亮 CSS）。

**资源与特殊块**
- 图片/视频/SVG/canvas：`src/render/post-render.ts` 在发送前遍历 DOM：
  - SVG：转 PNG 上传；Canvas：截图上传；图片/视频：本地/远程 fetch → 微信素材接口 → 替换 URL。
  - 不处理背景图/伪元素图片，若主题依赖需扩展。
- 素材侧栏：`views/material-view` + `assets/draft-manager` 管理已拉取的素材与草稿。

**上传草稿**
- 触发：`PreviewPanel.sendArticleToDraftBox`。
- 前置步骤：对文章 DOM 再次执行主题内联 → 上传 SVG/Canvas/图片/视频素材并替换 URL。
- 调用：`WechatClient.sendArticleToDraftBox`（封装微信草稿接口），正文为当前 DOM 的 innerHTML。
- 封面/摘要等由 `MPArticleHeader` 表单收集并存储。

---

### 样式兼容的关键差异
- NoteToMP：全量内联 CSS，并处理伪元素、类依赖；主题/高亮由 assets 统一管理，保证公众号端样式一致。
- WeWrite：原版仅通过 CSSMerger 局部内联且会移除类名、忽略伪元素，易导致公众号端样式缺失；已在本地修改为保留类名并处理伪元素，并在发送前强制内联。高亮需手动并入主题 CSS。

### 适配建议（针对 WeWrite）
- 确保发送前对文章根元素执行一次 `ThemeManager.applyTheme`（已改），避免仅依赖 Shadow DOM。
- 主题 CSS 内加入代码高亮样式，或扩展 ThemeManager 读取 `highlights` 目录。
- 若主题使用背景图/伪元素图片，需在 `post-render.ts` 添加背景图抓取与上传逻辑。
- 保持类名，避免选择器失效；必要时将伪元素内容显式转为 DOM。
