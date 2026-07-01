#!/usr/bin/env python3
"""
解析5本书的JSON，提取每本书的HTML内容，生成可浏览的HTML文件。
"""
import json
import os
import re
from collections import OrderedDict

INPUT = '/Users/apple/Desktop/公司项目库/数智教材2.0/测试图书(1).Json'
OUTPUT_DIR = '/Users/apple/Desktop/公司项目库/bookai2.0baseV2/books-html'

def clean_json_string(raw: str) -> str:
    result = []
    in_string = False
    escape = False
    for c in raw:
        if not in_string:
            if c == '"':
                in_string = True
            result.append(c)
        else:
            if escape:
                if c not in '\r\n':
                    result.append(c)
                escape = False
            elif c == '\\':
                escape = True
                result.append(c)
            elif c == '"':
                in_string = False
                result.append(c)
            elif c == '\r':
                pass
            elif c == '\n':
                result.append('\\')
                result.append('n')
            else:
                result.append(c)
    return ''.join(result)

def number_to_chinese(num: int) -> str:
    m = ['一','二','三','四','五','六','七','八','九','十']
    if num <= 10: return m[num-1]
    if num < 20: return '十' + (m[(num%10)-1] if num%10 else '')
    tens = num // 10
    ones = num % 10
    return (m[tens-1] if tens > 1 else '') + '十' + (m[ones-1] if ones else '')

def sanitize_filename(name: str) -> str:
    return re.sub(r'[\/\\:*?"<>|]', '_', name).strip()[:50]

def generate_book_html(book_name, items):
    items = sorted(items, key=lambda x: x.get('Sequence', ''))
    
    chapters = OrderedDict()
    for item in items:
        ch = item.get('Chapter', '').strip() or '正文'
        if ch not in chapters:
            chapters[ch] = []
        chapters[ch].append(item)
    
    html_parts = []
    html_parts.append(f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{book_name}</title>
<style>
  body {{ font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.8; color: #333; background: #faf9f6; }}
  h1 {{ font-size: 1.8em; text-align: center; border-bottom: 2px solid #8b4513; padding-bottom: 15px; margin-bottom: 30px; color: #5a3e1b; }}
  h2 {{ font-size: 1.4em; color: #5a3e1b; border-left: 4px solid #8b4513; padding-left: 12px; margin-top: 40px; }}
  h3 {{ font-size: 1.15em; color: #6b4c2a; margin-top: 25px; }}
  .content {{ background: white; padding: 20px 30px; border-radius: 8px; margin: 10px 0 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }}
  .content p {{ margin: 0.8em 0; text-indent: 2em; }}
  .toc {{ background: #f5f0e8; padding: 20px 30px; border-radius: 8px; margin-bottom: 30px; }}
  .toc h2 {{ border: none; margin-top: 0; }}
  .toc ul {{ list-style: none; padding-left: 20px; }}
  .toc li {{ margin: 4px 0; }}
  .toc a {{ text-decoration: none; color: #5a3e1b; }}
  .toc a:hover {{ text-decoration: underline; }}
  img {{ max-width: 100%; height: auto; }}
  table {{ border-collapse: collapse; width: 100%; margin: 10px 0; }}
  td, th {{ border: 1px solid #ddd; padding: 8px 12px; }}
  th {{ background: #f5f0e8; }}
</style>
</head>
<body>
<h1>{book_name}</h1>
''')

    # TOC
    toc_items = []
    module_idx = 1
    for chapter, chapter_items in chapters.items():
        module_title = f'模块{number_to_chinese(module_idx)} {chapter}'
        toc_items.append(f'<li><a href="#mod{module_idx}">{module_title}</a>')
        if len(chapter_items) > 1:
            toc_items.append('<ul>')
            task_idx = 1
            for item in chapter_items:
                title = item.get('Title', '').strip() or f'第{number_to_chinese(task_idx)}节'
                anchor = f'mod{module_idx}-task{task_idx}'
                toc_items.append(f'<li><a href="#{anchor}">{title}</a></li>')
                task_idx += 1
            toc_items.append('</ul>')
        toc_items.append('</li>')
        module_idx += 1
    
    html_parts.append('<div class="toc"><h2>目录</h2><ul>')
    html_parts.extend(toc_items)
    html_parts.append('</ul></div>')

    # Content
    module_idx = 1
    for chapter, chapter_items in chapters.items():
        module_title = f'模块{number_to_chinese(module_idx)} {chapter}'
        html_parts.append(f'<h2 id="mod{module_idx}">{module_title}</h2>')
        
        task_idx = 1
        for item in chapter_items:
            title = item.get('Title', '').strip()
            if not title:
                title = f'第{number_to_chinese(task_idx)}节'
            anchor = f'mod{module_idx}-task{task_idx}'
            html_parts.append(f'<h3 id="{anchor}">{title}</h3>')
            
            content = item.get('Content', '')
            if content:
                html_parts.append(f'<div class="content">{content}</div>')
            task_idx += 1
        
        module_idx += 1
    
    html_parts.append('</body></html>')
    return '\n'.join(html_parts)


def main():
    with open(INPUT, 'r', encoding='utf-8-sig') as f:
        raw = f.read()
    
    cleaned = clean_json_string(raw)
    data = json.loads(cleaned)
    print(f'解析成功，共 {len(data)} 条数据')
    
    # Group by cleaned BookName (merge items with same name but different GUIDs)
    books = OrderedDict()
    for item in data:
        name = item.get('BookName', '').replace('\n', '').replace('\r', '').strip()
        if not name:
            continue
        if name not in books:
            books[name] = {'name': name, 'items': []}
        books[name]['items'].append(item)
    
    print(f'共 {len(books)} 本书')
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Generate index page
    index_parts = ['<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">']
    index_parts.append('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
    index_parts.append('<title>5本教材 - HTML预览</title>')
    index_parts.append('<style>')
    index_parts.append('body { font-family: "Noto Serif SC", serif; max-width: 700px; margin: 0 auto; padding: 60px 20px; background: #faf9f6; color: #333; }')
    index_parts.append('h1 { text-align: center; color: #5a3e1b; border-bottom: 2px solid #8b4513; padding-bottom: 15px; }')
    index_parts.append('.book-list { list-style: none; padding: 0; }')
    index_parts.append('.book-list li { background: white; margin: 12px 0; padding: 20px 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: transform 0.2s; }')
    index_parts.append('.book-list li:hover { transform: translateY(-2px); box-shadow: 0 3px 8px rgba(0,0,0,0.12); }')
    index_parts.append('.book-list a { text-decoration: none; font-size: 1.2em; color: #5a3e1b; font-weight: bold; }')
    index_parts.append('.book-list a:hover { text-decoration: underline; }')
    index_parts.append('.meta { color: #999; font-size: 0.85em; margin-top: 5px; }')
    index_parts.append('</style></head><body>')
    index_parts.append('<h1>📚 5本教材 - HTML预览</h1>')
    index_parts.append('<ul class="book-list">')
    
    for name, book in books.items():
        safe = sanitize_filename(name)
        count = len(book['items'])
        
        # Generate individual book HTML
        html = generate_book_html(name, book['items'])
        filepath = os.path.join(OUTPUT_DIR, f'{safe}.html')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'  生成: {filepath} ({count} 章节, {len(html)} 字符)')
        
        index_parts.append(f'<li><a href="{safe}.html">{name}</a><div class="meta">{count} 个章节</div></li>')
    
    index_parts.append('</ul></body></html>')
    
    index_path = os.path.join(OUTPUT_DIR, 'index.html')
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(index_parts))
    print(f'\n索引页: {index_path}')
    print('✅ 完成！用浏览器打开 index.html 即可浏览所有书籍。')


if __name__ == '__main__':
    main()
