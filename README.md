# 小豌先生的博客

> 分享投资笔记、AI与生活随想

[![GitHub Pages](https://github.com/xiaoallocinit/xiaowanBlog.github.io/workflows/Jekyll%20site%20CI/badge.svg)](https://github.com/xiaoallocinit/xiaowanBlog.github.io/actions)

## 关于这个博客

这是一个基于 Jekyll 静态网站生成器搭建的个人博客，部署在 GitHub Pages 上。博客主要分享投资理财、技术开发、AI应用以及生活感悟的内容。

**博客地址**: https://xiaoallocinit.github.io/xiaowanBlog.github.io/

## 内容分类

### 📈 投资笔记
- 价值投资理念与实践
- 市场分析与思考
- 投资心得体会

### 🤖 AI与技术
- 人工智能在生活中的应用
- 技术开发经验分享
- Swift/iOS、Vue.js等技术探讨

### 🌱 生活感悟
- 读书笔记与思考
- 生活中的小确幸
- 个人成长心得

## 技术栈

- **静态网站生成器**: Jekyll
- **主题**: 基于 Clean Blog 主题定制
- **部署平台**: GitHub Pages
- **评论系统**: Gitalk
- **统计分析**: Google Analytics

## 项目结构

```
├── _config.yml          # Jekyll 配置文件
├── _posts/              # 博客文章目录
├── _layouts/            # 页面布局模板
├── _includes/           # 可重用的页面组件
├── css/                 # 样式文件
├── js/                  # JavaScript 文件
├── img/                 # 图片资源
├── index.html           # 首页
├── about.html           # 关于页面
└── tags.html            # 标签页面
```

## 本地开发

如果你想在本地运行这个博客，请按照以下步骤：

### 环境要求

- Ruby >= 2.5.0
- Jekyll >= 4.0
- Bundler

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/xiaoallocinit/xiaowanBlog.github.io.git
cd xiaowanBlog.github.io
```

2. 安装依赖
```bash
bundle install
```

3. 启动开发服务器
```bash
bundle exec jekyll serve
```

4. 在浏览器中访问 `http://localhost:4000`

## 写文章

### 文章格式

所有文章都应该放在 `_posts` 目录下，文件名格式为 `YYYY-MM-DD-title.md`。

每篇文章都需要包含 YAML Front Matter：

```yaml
---
layout:     post
title:      文章标题
subtitle:   文章副标题（可选）
date:       YYYY-MM-DD
author:     小豌先生
header-img: img/post-bg-example.jpg
catalog: true
tags:
    - 标签1
    - 标签2
---
```

### 图片资源

- 将图片放置在 `img/` 目录下
- 在文章中使用相对路径引用：`![描述](/img/image-name.jpg)`
- 建议图片命名规范：`post-bg-title-YYYY.jpg`

## 定制化

### 修改个人信息

编辑 `_config.yml` 文件中的以下部分：

```yaml
# 站点基本信息
title: 你的博客标题
description: 你的博客描述
url: 你的博客地址

# 作者信息
author:
  name: 你的名字
  email: 你的邮箱
  github: 你的GitHub用户名
```

### 修改社交链接

在 `_config.yml` 中修改社交网站设置：

```yaml
github_username: 你的GitHub用户名
weibo_username: 你的微博ID
zhihu_username: 你的知乎用户名
```

## 部署

这个博客配置了 GitHub Actions 自动部署，当你推送代码到 `main` 分支时，会自动构建并部署到 GitHub Pages。

## 许可证

本项目基于 MIT 许可证开源。

## 联系我

- **GitHub**: [@superZhouDaLu](https://github.com/superZhouDaLu)
- **Email**: xiao2683@gmail.com
- **微博**: [@小豌先生](https://weibo.com/u/5089298519)
- **知乎**: [@Zhoudalu](https://www.zhihu.com/people/Zhoudalu)

---

⭐ 如果这个项目对你有帮助，欢迎给个 Star！