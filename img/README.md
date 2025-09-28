# 图片管理指南

## 📁 文件夹结构

```
img/
├── site/                    # 网站级别图片
│   ├── favicon.ico         # 网站图标
│   ├── apple-touch-icon.png # 苹果设备图标
│   ├── home-bg.jpg         # 首页背景
│   ├── sidebar-avatar.jpg  # 侧边栏头像
│   ├── post-bg-debug.png   # 默认文章背景
│   ├── post-bg-rwd.jpg     # 关于页面背景
│   └── heart_love.ico      # 微信分享图标
├── posts/                   # 文章图片（按年月分类）
│   ├── 2024/
│   │   ├── 09/             # 2024年9月文章图片
│   │   │   ├── investment-bg.jpg
│   │   │   ├── tech-bg.jpg
│   │   │   └── life-bg.jpg
│   │   ├── 10/             # 2024年10月文章图片
│   │   ├── 11/             # 2024年11月文章图片
│   │   └── 12/             # 2024年12月文章图片
│   └── 2025/
│       └── 01/             # 2025年1月文章图片
│           └── investment-analysis-bg.jpg
└── backup/                  # 备用图片
    ├── post-bg-android.jpg
    ├── post-bg-coffee.jpeg
    └── post-bg-hacker.jpg
```

## 📋 使用规范

### 1. 网站级别图片 (site/)
- **favicon.ico**: 网站图标，16x16 或 32x32 像素
- **apple-touch-icon.png**: 苹果设备图标，180x180 像素
- **home-bg.jpg**: 首页背景图，推荐 1920x1080
- **sidebar-avatar.jpg**: 侧边栏头像，推荐 300x300
- **post-bg-debug.png**: 默认文章背景图
- **heart_love.ico**: 微信分享小图标

### 2. 文章图片 (posts/YYYY/MM/)
按照文章发布的年月创建对应文件夹，文件命名规范：
- **背景图**: `topic-bg.jpg` (如 investment-bg.jpg)
- **内容图**: `article-title-image.jpg`
- **图表图**: `chart-name.png`

### 3. 图片规格建议
- **文章背景图**: 1920x1080 或 1200x600
- **内容图片**: 最大宽度 800px
- **图表截图**: 清晰可读，建议 PNG 格式
- **照片**: JPG 格式，适当压缩

## 🎯 新增文章图片流程

### 步骤 1: 创建日期文件夹
```bash
# 如果是 2024年12月的文章
mkdir -p img/posts/2024/12
```

### 步骤 2: 添加文章背景图
```bash
# 复制或创建背景图
cp background.jpg img/posts/2024/12/my-article-bg.jpg
```

### 步骤 3: 在文章中引用
```yaml
---
layout: post
title: "我的文章标题"
header-img: img/posts/2024/12/my-article-bg.jpg
---
```

### 步骤 4: 文章内容图片
```markdown
![图片描述](/img/posts/2024/12/content-image.jpg)
```

## 🔧 维护建议

### 定期清理
- 每季度检查一次未使用的图片
- 删除过期的临时图片
- 压缩大尺寸图片

### 命名规范
- 使用英文和数字
- 用连字符分隔单词
- 避免空格和特殊字符
- 保持语义化命名

### 图片优化
- JPG: 用于照片，质量设为 80-90%
- PNG: 用于图标、图表、透明背景
- WebP: 现代浏览器的优选格式
- 避免过大的图片文件 (>500KB)

## 📝 图片引用示例

### 文章背景图
```yaml
# 在文章的 Front Matter 中
header-img: img/posts/2024/09/investment-bg.jpg
```

### 文章内容图片
```markdown
# Markdown 语法
![投资分析图表](/img/posts/2024/09/investment-chart.png)

# HTML 语法 (如需更多控制)
<img src="/img/posts/2024/09/investment-chart.png" alt="投资分析图表" style="max-width: 100%;">
```

### 网站图标
```html
<!-- 在 _includes/head.html 中 -->
<link rel="shortcut icon" href="{{ site.baseurl }}/img/site/favicon.ico">
<link rel="apple-touch-icon" href="{{ site.baseurl }}/img/site/apple-touch-icon.png">
```

## ⚠️ 注意事项

1. **版权问题**: 确保使用的图片有合法使用权
2. **文件大小**: 控制图片文件大小，避免影响加载速度
3. **响应式**: 考虑不同设备的显示效果
4. **SEO**: 为图片添加有意义的 alt 属性
5. **备份**: 重要图片建议保留原始高清版本

## 🆘 故障排除

### 图片不显示
1. 检查文件路径是否正确
2. 确认文件名大小写是否匹配
3. 验证图片文件是否存在
4. 检查文件权限

### 加载速度慢
1. 压缩图片文件大小
2. 使用适当的图片格式
3. 启用图片懒加载
4. 考虑使用 CDN

---

*最后更新：2024-09-28*
*维护者：小豌先生*