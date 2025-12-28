# WeWrite - 微信公众号写作Obsidian 插件

> 维护说明：原作者 Learner Chen 近期开源仓库更新较少，本 fork 由 ryfineZ 持续维护，修复兼容问题并优化性能，保留原作者署名。

### 本次 fork 的背景与修复
- 原版维护节奏较慢，微信草稿编辑态会在列表中插入空行/空序号。
- 预览性能欠佳：Shadow DOM + 双重渲染链路，切换/输入时卡顿。
- 主题获取不稳定：远程主题源不易访问，样式选择受限。

### 我们的改动（持续迭代中）
- 列表兼容：清理空节点，避免微信编辑态插入空 `<li>` 并重排编号。
- 性能优化：移除 Shadow DOM，简化渲染链路（直接 marked 解析，无双重渲染），主题应用异步化，减少卡顿。
- 主题增强：切换主题下载源到当前仓库；引入 NoteToMP 全套主题并适配 `.wewrite` 根类。
- 安装指引：新增 `INSTALL-OBSIDIAN.md`，提供本地安装/测试包（wewrite-dev）说明。

[English Version](README_en.md)

## 概述

WeWrite 是 Obsidian (https://obsidian.md) 的一款插件。

它旨在将笔记渲染并发布到微信公众号平台，同时集成 AI 写作辅助功能，使 Obsidian 成为微信公众号内容的强大写作工具。不依赖外部的图床或第三方平台。

## 更新
- 2023.06.16 文章属性中，默认打开评论。（原来默认关闭， 采纳geosmart建议）
- 2023.06.16 合并bushnerd 提出的更正：暗色模式下预览界面，出现不协调的白色 Closes: #3 (PR #4)，感谢 bushnerd
- 2023.06.16 增加一个自定义的渲染风格《12.  爱范儿.md》，参考公众号《爱范儿》排版
    

## 教程（不定期发布，欢迎关注）

- [WeWrite教程：发布文章到微信公众号](https://mp.weixin.qq.com/s/9NOy9xYXq498jxJTIV3-Bw)

- [写作的利器-WeWrite@obsidian](https://mp.weixin.qq.com/s/iQ-M0042CT2mTevhx3nlfg)


## 功能

### Obsidian 特色内容渲染为微信公众号格式
- **Markdown 渲染**：支持标准 Markdown 内容。
- **Excalidraw**：支持直接嵌入 Excalidraw 插件的图表。
- **Mermaid**：支持 Mermaid 图表。
- **LaTeX**：支持 LaTeX 公式。
- **Callout & Admonition**：支持 Obsidian 原生的 Callout 和 Admonition。
- **代码高亮**：支持代码块和行内代码。
- **图标**：支持 Obsidian 图标、Iconize 插件以及 Remix 图标在 Markdown 内容中的使用。
- **Charts**：支持 Obsidian Charts插件的内容。
- **PDF++**：支持 Obsidian PDF++ 插件中的笔记和图片。
- **嵌套笔记**：支持在笔记中嵌入其它笔记的渲染。
- **链接与脚注**：将链接和脚注转换为微信公众号格式。

### AI 写作辅助
- **内容润色**：使用 AI 优化文章内容。
- **双语翻译**：支持中英文双向翻译。
- **Mermaid 生成**：自动生成 Mermaid 图表。
- **LaTeX 生成**：自动生成 LaTeX 公式。
- **同义词建议**：为选中的词语提供同义词替换建议。
<video controls src="ai-aided-writing.mp4" title="AI 写作辅助"></video>

### 微信公众号集成
- **素材管理**：管理微信公众号素材，包括图片、音频和视频。
- **草稿管理**：创建、预览和发布微信公众号文章。
- **账号管理**：支持切换多个微信公众号账号。

### 其他功能
- **主题管理**：支持自定义主题样式。
- **实时预览**：提供文章实时预览功能。

## 安装指南

1. 在 Obsidian 中打开 **设置**。
2. 进入 **社区插件** 页面。
3. 搜索 "WeWrite"。
4. 点击 **安装** 并启用插件。

## 使用说明
### 配置

这是一个简单的示例配置。
[配置简介](settings.md)

更多的使用方法细节，我们未来在公众号中会发布一系列教程。

### 基本用法
1. 使用编辑器的右键菜单访问 AI 写作辅助功能（例如，内容润色、翻译等）。
2. 通过右键菜单或命令面板访问 WeWrite 功能。
3. 在右侧预览器中设置草稿属性（例如，标题、摘要、封面图片等）。
4. 使用 AI 辅助一键生成摘要和封面图片。
5. 将草稿发送到微信公众号。
6. 自定义主题可以作为普通笔记（`.md` 文件）进行管理。

### 微信公众号集成
1. 使用 **素材管理** 上传和管理素材。
2. 使用 **草稿管理** 删除、预览、批量发布和发布草稿。

## 致谢

本插件的开发深受以下项目的启发：
1. https://github.com/sunbooshi/note-to-mp
2. https://github.com/ai-chen2050/obsidian-wechat-public-platform
3. https://github.com/zhouhua/obsidian-export-image
4. https://marked.js.org/
5. https://github.com/jonschlinkert/gray-matter
6. https://highlightjs.org/
7. https://www.mathjax.org/

以及更多项目。这些都是非常棒的项目，我对它们的开发者表示敬意和感谢，感谢他们对开源社区的贡献。

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。
