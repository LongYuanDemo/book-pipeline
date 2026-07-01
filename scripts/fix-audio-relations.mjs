#!/usr/bin/env node
/**
 * Patch audioCourse.ts: add relation labels to edge arrows.
 * Transforms `A --> N0["text"]` into `A -->|"relation"| N0["text"]`
 */
import { readFileSync, writeFileSync } from 'fs';

const FILE = 'books/eye-ent-nursing/data/audioCourse.ts';
let content = readFileSync(FILE, 'utf-8');

// Infer relation from node text
function inferRelation(text, idx) {
  if (idx === 0) return '展开';
  if (/包括|包含|分为|分类|种类/.test(text)) return '包含';
  if (/例如|比如|如|例/.test(text)) return '举例';
  if (/首先|然后|接着|最后|步骤|流程/.test(text)) return '步骤';
  if (/对比|区别|不同|相反/.test(text)) return '对比';
  if (/定义|是指|是|指/.test(text)) return '定义';
  if (/作用|功能|用于|能够/.test(text)) return '功能';
  if (/注意|需要|必须|应该/.test(text)) return '注意';
  return '展开';
}

let patchCount = 0;

// Pattern: ` A --> T0["text"]` or ` A --> N0["text"]` or ` A --> B["text"]`
// Skip if already has |"..."|
content = content.replace(
  /(\s+A\s*-->)\s*(T\d+|N\d+|B|S\d+)\["([^"]*)"\]/g,
  (match, arrow, nodeId, text) => {
    // Skip if already has relation label
    if (match.includes('|"')) return match;
    const idx = parseInt((nodeId.match(/\d+/) || ['0'])[0]) || 0;
    const rel = inferRelation(text, idx);
    patchCount++;
    return `${arrow}|"${rel}"| ${nodeId}["${text}"]`;
  }
);

// Also fix summary frame: `A --> B["课后复习"]` → `A -->|"总结"| B["课后复习"]`
// Already covered by the pattern above if it matches A --> B[...]

writeFileSync(FILE, content, 'utf-8');
console.log(`Patched ${patchCount} edges with relation labels.`);
