# 小豌先生的随笔日志

> 顺势而为，持续成长  
> 分享投资笔记、AI与生活随想

<div align="center">

![Apple Style Badge](https://img.shields.io/badge/Design-Apple%20Style-007aff?style=for-the-badge&logo=apple)
![Jekyll Badge](https://img.shields.io/badge/Built%20with-Jekyll-cc0000?style=for-the-badge&logo=jekyll)
![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?style=for-the-badge&logo=github)

[🌐 在线访问](https://xiaoallocinit.github.io/xiaowanBlog.github.io/) • [📝 关于我](https://xiaoallocinit.github.io/xiaowanBlog.github.io/about/) • [🔍 搜索文章](https://xiaoallocinit.github.io/xiaowanBlog.github.io/search/)

</div>

---

## ✨ 关于这个数字花园

你好，我是**小豌先生**，一名技术爱好者和投资学习者。

这里是我的数字花园，我会在这里分享关于投资理财、技术开发、AI应用以及生活感悟的内容。希望通过持续的学习和记录，与志同道合的朋友一起成长。

### 🎯 我的技能与兴趣

- 💰 **投资理财**：关注价值投资、市场分析
- 💻 **技术开发**：Swift/iOS、Vue.js、前端技术  
- 🤖 **AI应用**：关注人工智能在生活和工作中的应用
- 📚 **持续学习**：读书、思考、实践

---

## 🎨 设计特色

这个博客采用了全新的 **Apple 风格设计**，为你带来优雅的阅读体验：

### 📱 Apple 风格界面
- **卡片式布局** - 毛玻璃效果的现代设计
- **流畅动画** - 60fps 的丝滑交互体验
- **响应式设计** - 完美适配所有设备
- **苹果字体** - SF Pro 字体系统

### ⚡ 交互体验
- **3D 悬停效果** - 鼠标悬停时的立体变换
- **页面过渡动画** - 流畅的页面切换效果
- **智能搜索** - 实时搜索，高亮显示
- **阅读进度** - 文章阅读进度条

### 🚀 性能优化
- **图片懒加载** - 智能加载优化
- **CSS/JS 压缩** - 极速加载体验
- **PWA 支持** - 离线访问功能
- **SEO 优化** - 搜索引擎友好

---

## 🛠️ 技术栈

### 核心技术
- **Jekyll** - 静态网站生成器
- **GitHub Pages** - 部署平台
- **Apple Design** - 设计语言

### 功能特性
- **Gitalk** - 评论系统
- **搜索功能** - 全文搜索
- **标签系统** - 文章分类
- **RSS 订阅** - 内容订阅

### 开发工具
- **Node.js** ≥ 14.0.0
- **Ruby** ≥ 2.5.0
- **Grunt** - 构建工具

---

## 🚀 快速开始

### 环境准备
```bash
# 确保已安装 Ruby 和 Bundler
ruby --version
bundle --version

# 确保已安装 Node.js 和 npm
node --version
npm --version
```

### 本地运行

#### 快速启动
```bash
# 1. 克隆项目
git clone https://github.com/xiaoallocinit/xiaowanBlog.git
cd xiaowanBlog

# 2. 运行启动脚本（推荐）
./start.sh
```

#### 手动启动
```bash
# 1. 安装Jekyll依赖
bundle install

# 2. 启动开发服务器
bundle exec jekyll serve --livereload

# 3. 访问 http://localhost:4000
```

#### 故障排除
如果遇到 "Could not locate Gemfile" 错误：
1. 确保在项目根目录下运行命令
2. 确保已创建 Gemfile（已包含在项目中）
3. 运行 `bundle install` 安装依赖

### 构建部署
```bash
# 生产构建
npm run build

# 自动化部署
npm run deploy
```

---

## 📝 写作指南

### 文章格式
在 `_posts` 目录下创建 `YYYY-MM-DD-title.md` 文件：

```yaml
---
layout: post
title: "文章标题"
subtitle: "文章副标题"
date: 2024-09-08
author: 小豌先生
header-img: img/post-bg-example.jpg
catalog: true
tags:
    - 标签1
    - 标签2
---

文章内容使用 Markdown 语法...
```

### 图片管理
- 将图片放在 `img/` 目录
- 推荐命名：`post-bg-title-year.jpg`
- 文章中引用：`![描述](/img/image.jpg)`

---

## 🎯 项目结构

```
xiaowanBlog/
├── 📄 _config.yml          # Jekyll 配置
├── 📁 _posts/              # 博客文章
├── 📁 _layouts/            # 页面布局
├── 📁 _includes/           # 组件模块
├── 📁 css/                 # 样式文件
│   ├── apple-style.css     # Apple 风格样式
│   └── apple-post.css      # 文章页面样式
├── 📁 js/                  # JavaScript
│   ├── apple-animations.js # 动画效果
│   └── apple-navigation.js # 导航交互
├── 📁 img/                 # 图片资源
├── 🏠 index.html           # 首页
├── ℹ️ about.html            # 关于页面
└── 🔍 search.html          # 搜索页面
```

---

## 🌟 特色功能

### 🔍 智能搜索
- 实时搜索结果
- 关键词高亮显示
- 支持标题、内容、标签搜索

### 📖 阅读体验
- Apple 风格排版
- 智能目录导航
- 阅读进度指示
- 图片点击放大

### 💬 互动功能
- Gitalk 评论系统
- 社交媒体分享
- RSS 订阅支持

### 📱 移动优化
- 完美的移动端适配
- 触摸友好的交互
- 快速加载优化

---

## 📧 联系我

如果你对投资、技术或是生活有什么想法，欢迎与我交流探讨！

- **GitHub**: [@xiaoallocinit](https://github.com/xiaoallocinit)
- **Email**: xiao2683@gmail.com
- **微博**: [@小豌先生](https://weibo.com/u/5089298519)
- **知乎**: [@Zhoudalu](https://www.zhihu.com/people/Zhoudalu)

---

## 📄 开源许可

本项目基于 [MIT License](LICENSE) 开源，欢迎 fork 和贡献代码。

<div align="center">

**⭐ 如果这个项目对你有帮助，欢迎给个 Star！**

*Made with ❤️ by 小豌先生*

</div>