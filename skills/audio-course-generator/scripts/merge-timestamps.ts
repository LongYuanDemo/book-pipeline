#!/usr/bin/env node
/**
 * merge-timestamps.ts — 将校准后的时间戳合并到 JSON 文件
 *
 * 用法: npx tsx merge-timestamps.ts <json_file> <timestamps_file>
 * 
 * timestamps_file 格式: 每行一个时间戳（秒），对应 frames[1], frames[2], ...
 * (frames[0] 的 start 固定为 0 或初始延迟)
 */

import { readFileSync, writeFileSync } from 'fs';

const jsonFile = process.argv[2];
const timestampsFile = process.argv[3];

if (!jsonFile || !timestampsFile) {
  console.error('用法: npx tsx merge-timestamps.ts <json_file> <timestamps_file>');
  process.exit(1);
}

const data = JSON.parse(readFileSync(jsonFile, 'utf-8'));
const timestamps = readFileSync(timestampsFile, 'utf-8')
  .trim()
  .split('\n')
  .map(Number);

// frames[0] 保留原始 start（通常为初始延迟）
// frames[1..] 用校准后的时间戳替换
for (let i = 0; i < data.frames.length; i++) {
  if (i < timestamps.length) {
    data.frames[i].start = timestamps[i];
  }
}

writeFileSync(jsonFile, JSON.stringify(data, null, 2));
console.log(`已更新 ${data.frames.length} 帧的时间戳到 ${jsonFile}`);
