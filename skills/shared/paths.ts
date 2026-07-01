/**
 * 路径常量与辅助函数
 * 统一管理 books/ 目录下的文件路径
 */

import { mkdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

/** 项目根目录（基于当前文件向上推算） */
export const PROJECT_ROOT = resolve(
  fileURLToPath(new URL(import.meta.url)),
  '../../..',
);

/** books 目录根路径 */
export const BOOKS_ROOT = join(PROJECT_ROOT, 'books');

/**
 * 获取指定教材的数据文件路径
 * @param bookId 教材标识
 * @param file 文件名，如 bookInfo.ts
 * @returns 绝对路径
 */
export function getBookDataPath(bookId: string, file: string): string {
  return join(BOOKS_ROOT, bookId, 'data', file);
}

/**
 * 获取指定教材的资源目录路径
 * @param bookId 教材标识
 * @returns 绝对路径
 */
export function getBookAssetsPath(bookId: string): string {
  return join(BOOKS_ROOT, bookId, 'assets');
}

/**
 * 获取指定教材的日志目录路径
 * @param bookId 教材标识
 * @returns 绝对路径
 */
export function getBookLogsPath(bookId: string): string {
  return join(BOOKS_ROOT, bookId, 'logs');
}

/**
 * 确保目录存在，不存在则递归创建
 * @param dir 目录绝对路径
 */
export function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
}

/**
 * 确保文件所在目录存在
 * @param filePath 文件绝对路径
 */
export function ensureFileDir(filePath: string): void {
  ensureDir(dirname(filePath));
}
