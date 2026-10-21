# Zhentao Dong · 董镇滔

中英双语个人学术主页，适用于 GitHub Pages。无需安装依赖或构建。

## 首次发布

1. 在 GitHub 创建仓库，名称必须为 `user-dzt.github.io`。使用 GitHub Free 时选择 Public。
2. 上传本文件夹内的文件和 `assets` 文件夹。确认 `index.html` 位于仓库根目录，而不是嵌套在额外文件夹中。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment → Source** 中选择 **Deploy from a branch**。
5. 分支选择 **main**，目录选择 **/ (root)**，点击 **Save**。
6. 发布完成后访问 `https://user-dzt.github.io/`。

`.nojekyll` 用于直接发布本静态网站。通过网页上传时，隐藏文件不便选择可以省略；本网站没有以下划线开头的资源目录。

## 更新内容

- `content.js`：中英文文本和论文列表。
- `index.html`：姓名、邮箱、ORCID、页面结构、默认英文文本及 metadata。
- `styles.css`：字体、颜色、响应式排版。
- `assets/portrait.jpg`：照片。

修改后提交到 main 分支，GitHub Pages 会重新部署。中英文论文信息和简介应同步更新。

## 本地查看

在本目录运行 `python -m http.server 8000`，然后访问 `http://localhost:8000`。

## 参考

- GitHub Pages 官方说明：https://docs.github.com/en/pages/quickstart
- 布局参考：https://qiaoguanren.github.io/

本网站的简介、照片、论文及教育经历属于 Zhentao Dong，样式与代码重新实现。
