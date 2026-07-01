#!/usr/bin/env python3
"""
将 JSON 教材导出文件转换为三个产物：
  1. books/{bookId}/data/sourceRaw.ts  — 原始数据保全（零处理，零损失）
  2. books/{bookId}/data/sourceHtml.ts — 按 Chapter/Title 分组的 HTML（前端渲染基准）
  3. books/{bookId}/source.md          — Markdown 版本（LLM 模块输入）

用法:
  python3 scripts/json-to-source.py \
    --input "../测试图书(1).Json" \
    --book-name "急危重症护理学" \
    --book-id critical-care-nursing
"""

import argparse
import json
import os
import re
from collections import OrderedDict


def clean_json_string(raw: str) -> str:
    """清理 JSON 字符串中的非法裸换行符。"""
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


def html_to_markdown(html: str) -> str:
    """将 HTML 转为 Markdown 纯文本（仅用于 LLM 输入，丢失表格图片可接受）。"""
    text = html
    text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.S)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.S)
    text = re.sub(r'</p>\s*', '\n\n', text, flags=re.S)
    text = re.sub(r'<p[^>]*>', '', text, flags=re.S)
    text = re.sub(r'<br\s*/?>', '\n', text, flags=re.S)
    text = re.sub(r'<img[^>]*>', '', text, flags=re.S)
    text = re.sub(r'<figure[^>]*>.*?</figure>', '', text, flags=re.S)
    text = re.sub(r'<[^>]+>', '', text, flags=re.S)
    text = text.replace('&nbsp;', ' ')
    text = text.replace('&lt;', '<')
    text = text.replace('&gt;', '>')
    text = text.replace('&amp;', '&')
    text = text.replace('\\"', '"')
    text = text.replace('\\/', '/')
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def escape_ts_string(s: str) -> str:
    """转义 TypeScript 字符串中的特殊字符（用单引号包裹）。"""
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\r', '\\r').replace('\n', '\\n')


def escape_ts_backtick(s: str) -> str:
    """转义 TypeScript 模板字符串中的特殊字符（用反引号包裹）。"""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')


def group_items(items: list) -> OrderedDict:
    """按 Chapter → Title 分组，同 Title 多条 item 按 Sequence 排序。
    返回 OrderedDict: { chapter: { title: [items...] } }
    """
    chapters = OrderedDict()
    for item in items:
        ch = item.get('Chapter', '').strip() or '正文'
        title = item.get('Title', '').strip() or '未命名'
        if ch not in chapters:
            chapters[ch] = OrderedDict()
        if title not in chapters[ch]:
            chapters[ch][title] = []
        chapters[ch][title].append(item)
    return chapters


def generate_source_raw(book_guid: str, book_name: str, items: list) -> str:
    """生成 sourceRaw.ts — 原始数据保全，零处理。"""
    lines = []
    lines.append('export interface RawItem {')
    lines.append('  titleId: string;')
    lines.append('  title: string;')
    lines.append('  chapter: string;')
    lines.append('  sequence: string;')
    lines.append('  content: string;')
    lines.append('}')
    lines.append('')
    lines.append('export interface RawBook {')
    lines.append('  bookGuid: string;')
    lines.append('  bookName: string;')
    lines.append('  items: RawItem[];')
    lines.append('}')
    lines.append('')
    lines.append('export const sourceRaw: RawBook = {')
    lines.append(f"  bookGuid: '{escape_ts_string(book_guid)}',")
    lines.append(f"  bookName: '{escape_ts_string(book_name)}',")
    lines.append('  items: [')
    for item in items:
        title_id = item.get('TitleID', '')
        title = item.get('Title', '').strip()
        chapter = item.get('Chapter', '').strip()
        sequence = item.get('Sequence', '')
        content = item.get('Content', '')
        lines.append('    {')
        lines.append(f"      titleId: '{escape_ts_string(title_id)}',")
        lines.append(f"      title: '{escape_ts_string(title)}',")
        lines.append(f"      chapter: '{escape_ts_string(chapter)}',")
        lines.append(f"      sequence: '{escape_ts_string(sequence)}',")
        lines.append(f"      content: '{escape_ts_string(content)}',")
        lines.append('    },')
    lines.append('  ],')
    lines.append('};')
    lines.append('')
    lines.append('export default sourceRaw;')
    return '\n'.join(lines)


def generate_source_html(book_name: str, chapters: OrderedDict) -> str:
    """生成 sourceHtml.ts — 按 Chapter/Title 分组的 HTML。"""
    lines = []
    lines.append('export interface HtmlSection {')
    lines.append('  titleId: string;')
    lines.append('  title: string;')
    lines.append('  sequence: string;')
    lines.append('  html: string;')
    lines.append('}')
    lines.append('')
    lines.append('export interface HtmlChapter {')
    lines.append('  chapter: string;')
    lines.append('  sections: HtmlSection[];')
    lines.append('}')
    lines.append('')
    lines.append('export interface SourceHtml {')
    lines.append('  bookName: string;')
    lines.append('  chapters: HtmlChapter[];')
    lines.append('}')
    lines.append('')
    lines.append('export const sourceHtml: SourceHtml = {')
    lines.append(f"  bookName: '{escape_ts_string(book_name)}',")
    lines.append('  chapters: [')

    for chapter, titles in chapters.items():
        lines.append('    {')
        lines.append(f"      chapter: '{escape_ts_string(chapter)}',")
        lines.append('      sections: [')
        for title, title_items in titles.items():
            # 合并同 Title 多条 item 的 HTML
            combined_html = '\n'.join(item.get('Content', '') for item in title_items)
            first_item = title_items[0]
            title_id = first_item.get('TitleID', '')
            sequence = first_item.get('Sequence', '')
            lines.append('        {')
            lines.append(f"          titleId: '{escape_ts_string(title_id)}',")
            lines.append(f"          title: '{escape_ts_string(title)}',")
            lines.append(f"          sequence: '{escape_ts_string(sequence)}',")
            lines.append(f"          html: '{escape_ts_string(combined_html)}',")
            lines.append('        },')
        lines.append('      ],')
        lines.append('    },')

    lines.append('  ],')
    lines.append('};')
    lines.append('')
    lines.append('export default sourceHtml;')
    return '\n'.join(lines)


def generate_source_md(book_name: str, chapters: OrderedDict) -> str:
    """生成 source.md — Markdown 版本（LLM 输入）。"""
    lines = [f'## {book_name}', '']
    lines.append('本书由 JSON 教材数据自动转换生成。')
    lines.append('')

    module_idx = 1
    for chapter, titles in chapters.items():
        lines.append(f'# 模块{module_idx} {chapter}')
        lines.append('')

        task_idx = 1
        for title, title_items in titles.items():
            lines.append(f'## 任务{task_idx} {title}')
            lines.append('')

            # 合并同 Title 多条 item 的 Markdown
            for item in title_items:
                content = html_to_markdown(item.get('Content', ''))
                if content:
                    lines.append(content)
                    lines.append('')

            task_idx += 1

        module_idx += 1

    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description='将 JSON 教材转换为 sourceRaw.ts + sourceHtml.ts + source.md')
    parser.add_argument('--input', required=True, help='输入 JSON 文件路径')
    parser.add_argument('--book-name', required=True, help='要提取的书籍名称')
    parser.add_argument('--book-id', required=True, help='输出 book ID')
    parser.add_argument('--output-dir', default='books', help='输出目录')
    args = parser.parse_args()

    with open(args.input, 'r', encoding='utf-8-sig') as f:
        raw = f.read()

    cleaned = clean_json_string(raw)
    data = json.loads(cleaned, strict=False)
    print(f'解析成功，共 {len(data)} 条数据')

    # 过滤目标书籍
    items = [item for item in data
             if item.get('BookName', '').replace('\n', '').replace('\r', '').strip() == args.book_name]
    if not items:
        raise ValueError(f'未找到书籍: {args.book_name}')

    # 按 Sequence 排序
    items = sorted(items, key=lambda x: x.get('Sequence', ''))
    print(f'《{args.book_name}》: {len(items)} 条')

    # 按 Chapter → Title 分组
    chapters = group_items(items)
    print(f'共 {len(chapters)} 个 Chapter')
    for ch, titles in chapters.items():
        print(f'  {ch}: {len(titles)} 个 Title')

    # 获取 BookGuid
    book_guid = items[0].get('BookGuid', '')

    # 生成三个文件
    output_dir = os.path.join(args.output_dir, args.book_id)
    data_dir = os.path.join(output_dir, 'data')
    os.makedirs(data_dir, exist_ok=True)

    # 1. sourceRaw.ts
    raw_ts = generate_source_raw(book_guid, args.book_name, items)
    raw_path = os.path.join(data_dir, 'sourceRaw.ts')
    with open(raw_path, 'w', encoding='utf-8') as f:
        f.write(raw_ts)
    print(f'已生成: {raw_path} ({len(raw_ts)} 字符)')

    # 2. sourceHtml.ts
    html_ts = generate_source_html(args.book_name, chapters)
    html_path = os.path.join(data_dir, 'sourceHtml.ts')
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_ts)
    print(f'已生成: {html_path} ({len(html_ts)} 字符)')

    # 3. source.md
    source_md = generate_source_md(args.book_name, chapters)
    md_path = os.path.join(output_dir, 'source.md')
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(source_md)
    print(f'已生成: {md_path} ({len(source_md)} 字符)')


if __name__ == '__main__':
    main()
