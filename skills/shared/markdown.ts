/**
 * Markdown 解析工具
 * 读取 Markdown 文件并提取标题、章节等结构化信息
 */

import { existsSync, readFileSync } from 'fs';

export interface MarkdownSection {
  /** 标题层级 1-6 */
  level: number;
  /** 标题文本 */
  title: string;
  /** 该章节下的原始文本内容（不包含子章节） */
  content: string;
}

/**
 * 读取 Markdown 文件内容
 * @param filePath 文件绝对路径
 * @returns 文件文本内容
 */
export function readMarkdown(filePath: string): string {
  if (!existsSync(filePath)) {
    throw new Error(`Markdown 文件不存在: ${filePath}`);
  }
  return readFileSync(filePath, 'utf-8');
}

/**
 * 提取 Markdown 中的书名
 * 规则：
 *   1. 优先 frontmatter 的 title 字段
 *   2. 其次取第一个 ## 标题（教材通常用 ## 作为书名）
 *   3. 最后取第一个 # 标题
 * @param content Markdown 文本
 * @returns 书名，未找到时返回空字符串
 */
export function extractTitle(content: string): string {
  // 优先检查 YAML frontmatter
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (fmMatch) {
    const titleMatch = fmMatch[1].match(/^title:\s*(.+)$/m);
    if (titleMatch) {
      return titleMatch[1].trim();
    }
  }

  // 优先取第一个 # 标题（书名通常用 H1）
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }

  // 其次取第一个 ## 标题
  const h2Match = content.match(/^##\s+(.+)$/m);
  if (h2Match) {
    return h2Match[1].trim();
  }

  return '';
}

/**
 * 提取所有章节标题（# / ## / ###）及其内容
 * 按文档顺序返回，每个 section 包含该标题层级下的直接内容
 * @param content Markdown 文本
 * @returns 章节列表
 */
export function extractSections(content: string): MarkdownSection[] {
  const lines = content.split('\n');
  const sections: MarkdownSection[] = [];

  let current: MarkdownSection | null = null;
  const buffer: string[] = [];

  const flush = () => {
    if (current) {
      current.content = buffer.join('\n').trim();
      sections.push(current);
      buffer.length = 0;
    }
  };

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flush();
      current = {
        level: headingMatch[1].length,
        title: headingMatch[2].trim(),
        content: '',
      };
    } else if (current) {
      buffer.push(line);
    }
  }

  flush();

  return sections;
}

/**
 * 提取指定层级的所有标题
 * @param content Markdown 文本
 * @param level 标题层级 1-6
 * @returns 标题文本数组
 */
export function extractHeadingsByLevel(content: string, level: number): string[] {
  const sections = extractSections(content);
  return sections
    .filter((s) => s.level === level)
    .map((s) => s.title);
}
