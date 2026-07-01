/**
 * 校验工具
 * 使用 tsc / tsx 检查生成的 TypeScript 文件能否编译通过
 */

import { execFileSync } from 'child_process';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { ValidationResult } from './types.ts';

/**
 * 使用 tsc --noEmit 校验单个 TS 文件能否编译
 * 优先使用项目根目录的 tsc，否则尝试 npx tsc
 * @param filePath 待校验文件绝对路径
 * @returns 校验结果
 */
export async function validateTsFile(filePath: string): Promise<ValidationResult> {
  const messages: string[] = [];

  if (!existsSync(filePath)) {
    return { valid: false, messages: [`文件不存在: ${filePath}`] };
  }

  try {
    const projectRoot = fileURLToPath(new URL('../../..', import.meta.url));
    const tscBin = `${projectRoot}/node_modules/.bin/tsc`;
    const resolvedFile = resolve(filePath);

    const args = [
      '--noEmit',
      '--skipLibCheck',
      '--target', 'ES2020',
      '--module', 'ESNext',
      '--moduleResolution', 'bundler',
      '--strict',
      resolvedFile,
    ];

    const execOptions = {
      stdio: 'pipe' as const,
      cwd: projectRoot,
      maxBuffer: 10 * 1024 * 1024,
    };

    if (existsSync(tscBin)) {
      execFileSync(tscBin, args, execOptions);
    } else {
      execFileSync('npx', ['tsc', ...args], execOptions);
    }

    return { valid: true, messages: [] };
  } catch (err) {
    const execErr = err as { stderr?: Buffer; stdout?: Buffer; message?: string };
    const stderr = execErr.stderr?.toString() || execErr.stdout?.toString() || execErr.message || '';
    const lines = stderr.split('\n').filter((l: string) => l.includes('error TS'));
    messages.push(...lines.slice(0, 10));
    if (messages.length === 0) {
      messages.push(stderr.slice(0, 500));
    }
    return { valid: false, messages };
  }
}

/**
 * 基础字段存在性检查：读取文件内容，用正则确认 exportName 包含 sampleShape 中的关键字段
 * 注意：此检查较宽松，仅用于快速验证结构，不替代 tsc 类型检查
 * @param filePath 待检查文件绝对路径
 * @param exportName 期望的导出变量名，如 bookData
 * @param sampleShape 期望包含的字段名数组
 * @returns 校验结果
 */
export async function validateInterface(
  filePath: string,
  exportName: string,
  sampleShape: string[],
): Promise<ValidationResult> {
  const messages: string[] = [];

  if (!existsSync(filePath)) {
    return { valid: false, messages: [`文件不存在: ${filePath}`] };
  }

  const content = await readFile(filePath, 'utf-8');

  const exportPattern = new RegExp(`export\\s+(const|let|var)\\s+${exportName}\\s*[:=]`);
  if (!exportPattern.test(content)) {
    messages.push(`未找到导出变量: ${exportName}`);
  }

  for (const field of sampleShape) {
    const fieldPattern = new RegExp(`\\b${field}\\s*:`);
    if (!fieldPattern.test(content)) {
      messages.push(`缺失字段: ${field}`);
    }
  }

  return { valid: messages.length === 0, messages };
}
