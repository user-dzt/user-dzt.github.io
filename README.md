# Zhentao Dong · 当前版学术主页

主页地址：https://user-dzt.github.io/

以 https://qiaoguanren.github.io/ 的布局为基础：白色背景、Trebuchet MS 字体、15px 正文、925/1280px 内容容器、窄侧栏、顶部导航、简介 → 教育 → 动态 → 代表论文 → 荣誉 → 实习 → 服务的章节顺序，论文使用左图右文、蓝色标签与可展开完整列表。已按反馈缩小头像、校徽、联系图标和论文缩略图。

网站文件统一存放于“个人主页/网站文件”；旧版备份放在同级“历史版本”，参考材料放在同级“参考资料”。当前上传包仅使用同级的“主页上传包.zip”。

网站文字、照片与论文使用 Zhentao Dong 的个人资料；没有复制参考作者的照片、论文、个人介绍、统计脚本或访客追踪。中英文切换保留。

## 上传到现有 GitHub 仓库

1. 解压同级“主页上传包.zip”，或直接使用当前文件夹内的文件。
2. 打开 https://github.com/user-dzt/user-dzt.github.io/upload/main 。
3. 将本文件夹**内部的全部文件**拖入上传区，提交到 main 分支。这版所需文件全部在同一层，不需要上传子文件夹。
4. 等待 Pages 部署完成后访问 https://user-dzt.github.io/ 。页面缓存未更新时按 Ctrl+F5。

仓库已经开启 Pages，无需重新设置。旧版 assets 文件夹可以保留；新版直接引用根目录图片。

## 主要文件

- `index.html`：结构、默认英文内容、教育、论文、荣誉。
- `styles.css`：布局与移动端适配。
- `content.js`：中英文文案，以及用于生成论文列表的数据。
- `app.js`：语言切换与年份更新。
- `portrait.jpg`：个人照片。
- `bjtu-badge.png`、`bjtu-name.png`、`changan.jpg`：已有本地校徽校名素材。
- `paper-*.svg`：根据论文题名制作的文字封面，仅作版面展示，不是论文实验图。可用自己的论文框架图替换，并在 HTML 中修改文件名。

已按用户补充信息加入：中国电信天翼交通智驾算法实习经历；IEEE Transactions on Intelligent Vehicles（T-IV）和 IEEE Open Journal of Intelligent Transportation Systems（OJ-ITS）期刊审稿服务；CSC 支持的英国伯明翰大学一年期博士联合培养。简介、侧栏、当前位置和教育经历已同步更新。用户未提供联合培养及实习的起止年月，页面没有补造日期。机构名使用文字排版，不作为官方标志。

动态仅使用简历中的已发表论文年份和教育年份，没有补造接收日期。

部署不需要安装依赖或构建。若编辑 `content.js` 中的论文记录，可运行 `node build.cjs` 重新生成 `index.html` 的论文区和文字封面，再提交修改后的文件。直接在网页上修改论文时，应同时更新代表作和完整列表。

## 核验说明

尺寸、配色、字体、间距与断点根据参考站公开 HTML/CSS 对照实现。当前环境未提供可用浏览器，无法完成同窗口截图比对，不能保证逐像素完全一致。
