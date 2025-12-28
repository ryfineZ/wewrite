## WeWrite Dev 手动安装（本地包）

> 当前测试包插件 ID：`wewrite-dev`（可与原 WeWrite 共存）

### 1. 准备插件文件
构建产物位于仓库根目录：
- `main.js`（已由 `npm run build` 生成）
- `manifest.json`
- `styles.css`

### 2. 复制到 Vault 插件目录
1. 打开你的 Obsidian Vault 路径，例如 `<你的库>/.obsidian/plugins/`。
2. 在 `plugins` 下创建目录 `wewrite-dev`（保持与 manifest 中的 id 一致）。
3. 将上述 3 个文件复制到 `…/.obsidian/plugins/wewrite-dev/`：
   - 不需要 `node_modules`、源码或其他文件。
   - 如果已存在旧版同名目录，先删除/备份旧的 `main.js`/`manifest.json`/`styles.css` 后再覆盖。

### 3. 启用插件
1. 打开 Obsidian 设置 → 第三方插件，关闭安全模式。
2. 在第三方插件列表中启用 WeWrite Dev。
3. 若同时保留原 WeWrite，可分别启用/停用；若替换原版，请先停用原版。

### 4. 主题获取与选择
- 下载主题：在 WeWrite 设置中点击“下载主题”，会从 `https://raw.githubusercontent.com/ryfineZ/wewrite/master/themes/` 拉取主题文件到你的主题目录（默认 `wewrite-css-styles`）。已包含 NoteToMP 主题。
- 手动放置：也可将 `themes` 目录中的 md 主题文件拷贝到 Vault 的主题目录，重新打开设置下拉选择即可。

### 5. 常用操作
- 预览/发草稿：打开 Markdown，右侧预览选择主题、封面、摘要，点击“发送到草稿箱”。
- 图片/视频上传：发送前插件会自动上传正文中的图片/SVG/canvas/视频到微信素材并替换 URL。
- 账号配置：在设置中添加公众号 AppID/Secret（或中心 token），测试通过后再发送草稿。

### 6. 更新/回滚
- 更新：重复步骤 1–3 覆盖 `main.js`/`manifest.json`/`styles.css` 即可。
- 回滚：备份当前文件，或从 GitHub release/上个提交取对应版本覆盖。

### 7. 注意事项
- 需要联网：获取微信 token、上传素材、下载主题均需网络。
- 权限：如用中心 token 或远程服务，需信任该服务；否则使用本地 AppID/Secret 模式。
- 主题内联：本版本已加强样式内联（保留类名、支持伪元素）。若样式异常，可在发送前确认主题选择无误。 
