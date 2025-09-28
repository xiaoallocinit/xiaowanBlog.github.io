#!/bin/bash

echo "🚀 启动小豌先生的博客开发环境..."
echo "================================"

# 检查是否安装了bundler
if ! command -v bundle &> /dev/null; then
    echo "📦 安装 Bundler..."
    gem install bundler
fi

# 安装依赖
echo "📦 安装项目依赖..."
bundle install

# 启动Jekyll服务器
echo "🌟 启动Jekyll开发服务器..."
echo "访问地址: http://localhost:4000"
echo "按 Ctrl+C 停止服务器"
echo "================================"

bundle exec jekyll serve --livereload --open-url