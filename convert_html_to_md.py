import os
import re
from datetime import datetime
import html

# 定义文件路径
posts_dir = "_posts"
output_dir = "_posts"

def extract_title(html_content):
    """提取标题"""
    title_match = re.search(r'<h2>(.*?)</h2>', html_content)
    if title_match:
        return html.unescape(title_match.group(1)).strip()
    return "未命名文章"

def extract_author(html_content):
    """提取作者"""
    author_match = re.search(r'<div><span>(.*?)</span>', html_content)
    if author_match:
        return author_match.group(1).strip()
    return "小豌先生"

def extract_timestamp(html_content):
    """提取时间戳"""
    timestamp_match = re.search(r'new Date\((\d+)\)', html_content)
    if timestamp_match:
        timestamp = int(timestamp_match.group(1)) // 1000  # 转换为秒
        return datetime.fromtimestamp(timestamp)
    return datetime.now()

def extract_content(html_content):
    """提取正文内容"""
    # 移除头部和脚部的HTML代码
    content = re.sub(r'<html>.*?<div><h2>.*?</h2>.*?</div></div>', '', html_content, flags=re.DOTALL)
    content = re.sub(r'<p style="display: none;">.*?</script></html>', '', content, flags=re.DOTALL)
    
    # 移除script标签
    content = re.sub(r'<script>.*?</script>', '', content, flags=re.DOTALL)
    
    # 转换粗体
    content = re.sub(r'<span style="font-weight: bold;">(.*?)</span>', r'**\1**', content)
    content = re.sub(r'<span style="font-weight: 700;">(.*?)</span>', r'**\1**', content)
    
    # 转换下划线
    content = re.sub(r'<span style="text-decoration: underline;">(.*?)</span>', r'_\1_', content)
    
    # 转换图片
    content = re.sub(r'<section>.*?<img.*?data-src="(.*?)".*?</section>', r'![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/\1)', content, flags=re.DOTALL)
    
    # 转换段落
    content = re.sub(r'<p><br\s*/?></p>', '\n', content)
    content = re.sub(r'<p>(.*?)</p>', r'\1\n\n', content)
    
    # 移除多余的HTML标签
    content = re.sub(r'<.*?>', '', content)
    
    # 清理多余空行
    content = re.sub(r'\n\s*\n', '\n\n', content)
    
    return content.strip()

def generate_front_matter(title, author, date, subtitle=""):
    """生成Front Matter"""
    # 生成合适的图片路径
    date_str = date.strftime("%Y/%m")
    header_img = f"img/posts/{date_str}/investment-bg.jpg"
    
    # 生成标签
    tags = ["投资", "市场分析", "趋势研究"]
    if "电影" in title or "票房" in title:
        tags.append("影视")
    if "业绩" in title:
        tags.append("财报")
    
    front_matter = f'''---
layout: post
title: "{title}"
subtitle: "{subtitle}"
date: {date.strftime("%Y-%m-%d")}
author: {author}
header-img: {header_img}
catalog: true
tags:
'''
    for tag in tags:
        front_matter += f"    - {tag}\n"
    front_matter += "---\n\n"
    return front_matter

def convert_html_to_md(html_file_path):
    """将单个HTML文件转换为Markdown"""
    with open(html_file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    title = extract_title(html_content)
    author = extract_author(html_content)
    date = extract_timestamp(html_content)
    content = extract_content(html_content)
    
    # 生成Front Matter
    front_matter = generate_front_matter(title, author, date)
    
    # 组合完整内容
    md_content = front_matter + content
    
    # 生成新的文件名
    date_str = date.strftime("%Y-%m-%d")
    # 清理文件名中的特殊字符
    safe_title = re.sub(r'[^\w\u4e00-\u9fff\-]', '', title)
    md_file_name = f"{date_str}-{safe_title}.md"
    md_file_path = os.path.join(output_dir, md_file_name)
    
    # 写入文件
    with open(md_file_path, 'w', encoding='utf-8') as f:
        f.write(md_content)
    
    print(f"已转换: {html_file_path} -> {md_file_path}")

def main():
    """主函数"""
    # 查找所有HTML文件
    html_files = [f for f in os.listdir(posts_dir) if f.endswith('.html')]
    
    print(f"找到 {len(html_files)} 个HTML文件需要转换")
    
    # 转换每个文件
    for html_file in html_files:
        html_file_path = os.path.join(posts_dir, html_file)
        try:
            convert_html_to_md(html_file_path)
        except Exception as e:
            print(f"转换 {html_file} 时出错: {e}")
    
    print("转换完成!")

if __name__ == "__main__":
    main()