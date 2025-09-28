# CLAUDE.md

CLAUDE.md - 个人 GitHub 博客项目指南
项目概述
这是一个基于 Jekyll 静态网站生成器和 GitHub Pages 服务的个人博客项目。您当前看到的代码仓库是一个半成品，已经完成了基础框架的搭建。本指南将协助您完成剩余的所有配置，将其彻底转化为您专属的、可通过 https://<您的用户名>.github.io 访问的在线博客。

项目结构（简要说明）
text
├── _config.yml               # -> 站点的核心配置文件（标题、描述、主题设置等）
├── _posts/                   # -> 您的博客文章存放目录（.md文件）
├── _includes/               # -> 可重用的HTML组件（头部、尾部、导航栏等）
├── _layouts/                # -> 网页布局模板（default.html, post.html等）
├── assets/
│   ├── css/                 # -> 自定义样式文件
│   └── images/              # -> 网站图片、头像等资源
├── about.md                 # -> “关于我”页面
└── index.md                 # -> 网站首页
🎯 第一步：完成基础配置 (_config.yml)
这是最重要的文件，它定义了您博客的“身份信息”。请用您的个人信息替换以下关键字段：

yaml
# 站点基本信息
title: 您的博客标题 (e.g., "小豌先生的技术笔记")
description: 您博客的简短描述 (e.g., "分享投资笔记、AI与生活随想")
baseurl: "" # 如果仓库名是 `用户名.github.io`，则保持为空。如果是项目页，则填仓库名。
url: "https://xiaoallocinit.github.io/xiaowanBlog.github.io/" # 您的博客最终访问地址

# 您的个人信息
author:
  name: 您的名字
  email: 您的邮箱（可选）
  github: 您的GitHub用户名（可选）
  twitter: 您的Twitter用户名（可选） # 或其他社交链接

# 主题和插件设置（根据您当前使用的主题进行配置，如果是从主题fork的，请保留其原有结构）
theme: jekyll-theme-minimal # 示例主题，请根据实际情况修改或删除
Claude 提示：修改此文件后，强烈建议先在本地运行 bundle exec jekyll serve 测试一下，确保没有语法错误。

✏️ 第二步：替换核心内容
1. 修改首页 (index.md)
首页通常是您最新文章的列表。您可能需要修改顶部的“Front Matter”和 introductory 文字。

markdown
---
# 首页的Front Matter
layout: home
title: 首页
subtitle: "欢迎来到我的数字花园"
---
2. 创建/修改“关于”页面 (about.md)
这是访问者了解您的地方。

markdown
---
layout: page
title: 关于我
---

![我的头像](/assets/images/avatar.jpg) <!-- 替换为您自己的头像图片 -->

这里是关于您的详细介绍...
您的技能、兴趣、经历，以及为什么创建这个博客。
📝 第三步：撰写您的文章
所有文章都应放在 _posts 目录下，并遵循严格的命名约定：YYYY-MM-DD-文章标题.md。

示例： _posts/2024-05-20-welcome-to-my-blog.md

每篇文章的顶部必须包含 YAML Front Matter：

yaml
---
layout: post
title:  "您的文章标题"
date:   2024-05-20 14:00:00 +0800
categories: [文章分类1, 文章分类2] # 例如 [Web, JavaScript]
tags: [标签1, 标签2] # 例如 [Vue, 教程]
---
文章正文使用标准的 Markdown 语法编写。

Claude 提示：您可以从模仿 _posts 目录中已有的示例文章开始，复制它的结构，然后修改内容。

🎨 第四步：个性化定制
替换图片和资源
将您的头像、网站图标 (favicon)、横幅图等放入 assets/images/ 目录。

在所有相关文件（如 _config.yml, about.md, 布局文件）中更新图片的引用路径。

修改样式 (CSS)
主要的样式文件通常在 assets/css/ 目录下（如 main.scss 或 style.css）。

您可以修改颜色、字体、间距等来匹配您的个人品牌。

找到 :root 选择器或包含 --primary-color 这样的 CSS 变量处进行修改，是最高效的方式。

调整布局和包含文件
如果您想修改网站的结构（如增加一个导航栏链接），请编辑 _includes/header.html 或 _includes/navigation.html（如果存在）。

如果您想修改所有页面的底部，请编辑 _includes/footer.html。

🎨 第五步：补充完善README.md文件