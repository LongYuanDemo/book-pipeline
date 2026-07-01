/**
 * 轻量书名读取器
 *
 * 从 bookInfo.ts / sourceParsed.ts 提取书名，供去污染与质量门使用。
 * 不依赖动态 import（避免副作用），用正则从 TS 源里取 title 字段。
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { getBookDataPath } from '../../shared/paths.ts';

/** 读取书名；失败时回退到 bookId。 */
export async function loadBookTitle(bookId: string): Promise<string> {
  const candidates = [
    getBookDataPath(bookId, 'bookInfo.ts'),
    getBookDataPath(bookId, 'sourceParsed.ts'),
  ];
  for (const path of candidates) {
    if (!existsSync(path)) continue;
    try {
      const src = await readFile(path, 'utf-8');
      // 命中第一个 title: '...' / "..."（bookData.title 或 bookMeta.title）
      const m = src.match(/title:\s*(['"`])([^'"`]+)\1/);
      if (m && m[2].trim()) return m[2].trim();
    } catch {
      // 忽略，尝试下一个候选
    }
  }
  return bookId;
}
