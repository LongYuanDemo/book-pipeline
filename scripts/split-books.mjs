#!/usr/bin/env node
/**
 * 解析西安5本图书JSON，按 BookGuid 拆分为独立 Markdown 文件
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const INPUT = '/Users/apple/Desktop/西安5本图书文章(1).json';
const OUTPUT_DIR = '/Users/apple/Desktop/公司项目库/数智教材2.0/bookai2.0base/books-raw';

// Read raw bytes and decode
const rawBytes = readFileSync(INPUT);
let raw = rawBytes.toString('utf-8');
// Remove BOM
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);

// Fix literal CR/LF inside string values by removing them entirely
// Also handle \ + CRLF + char: the \ was meant to escape the char after CRLF
let fixed = '';
let inString = false;
let escaped = false;
for (let i = 0; i < raw.length; i++) {
  const ch = raw[i];
  const code = raw.charCodeAt(i);

  if (escaped) {
    fixed += ch;
    escaped = false;
    continue;
  }

  if (inString && ch === '\\') {
    // Check if next is literal CR/LF — if so, the \ was meant for the char after CRLF
    if (i + 1 < raw.length) {
      const nextCode = raw.charCodeAt(i + 1);
      if (nextCode === 0x0D || nextCode === 0x0A) {
        // Skip the \ and all consecutive CR/LF, keep the \ for the next real char
        let j = i + 1;
        while (j < raw.length && (raw.charCodeAt(j) === 0x0D || raw.charCodeAt(j) === 0x0A)) j++;
        // Now raw[j] is the char that \ was meant to escape
        if (j < raw.length) {
          fixed += '\\' + raw[j];
          i = j;
        }
        continue;
      }
    }
    fixed += ch;
    escaped = true;
    continue;
  }

  if (ch === '"') {
    inString = !inString;
    fixed += ch;
    continue;
  }

  // Delete literal CR/LF inside strings (they're noise in HTML content)
  if (inString && (code === 0x0D || code === 0x0A || code === 0x09)) {
    continue;
  }

  fixed += ch;
}

// Use Function for tolerant parsing — handles remaining invalid escapes
// Replace \% and other invalid JS escapes by removing the backslash
fixed = fixed.replace(/\\(.)/g, (m, ch) => {
  if ('"\\bfnrtu/\'`'.includes(ch)) return m;
  return ch; // remove backslash for invalid escapes
});

let data;
try {
  data = new Function('return (' + fixed + ')')();
} catch (e) {
  // Try JSON.parse with the fixed string to get position info
  try {
    JSON.parse(fixed);
  } catch (e2) {
    const posMatch = e2.message.match(/position (\d+)/);
    const pos = posMatch ? parseInt(posMatch[1]) : 0;
    console.error('Parse error at position', pos);
    console.error('Context:', JSON.stringify(fixed.substring(pos - 50, pos + 50)));
    // Show hex around the position
    const seg = fixed.substring(pos - 5, pos + 5);
    let hex = '';
    for (let i = 0; i < seg.length; i++) hex += seg.charCodeAt(i).toString(16) + ' ';
    console.error('Hex:', hex);
    process.exit(1);
  }
  throw e;
}
console.log(`Total items: ${data.length}`);

// Group by BookGuid
const books = new Map();
for (const item of data) {
  const guid = item.BookGuid || 'unknown';
  if (!books.has(guid)) {
    books.set(guid, {
      name: item.BookName || 'unknown',
      guid,
      chapters: new Map(), // chapter -> items
      totalChars: 0,
    });
  }
  const book = books.get(guid);
  const chapter = item.Chapter || '未分类';
  if (!book.chapters.has(chapter)) {
    book.chapters.set(chapter, []);
  }
  book.chapters.get(chapter).push(item);
  book.totalChars += (item.Content || '').length;
}

// Print summary
console.log(`\nFound ${books.size} books:\n`);
for (const [guid, book] of books) {
  console.log(`  ${book.name}`);
  console.log(`    GUID: ${guid}`);
  console.log(`    Chapters: ${book.chapters.size}`);
  console.log(`    Items: ${data.filter(i => i.BookGuid === guid).length}`);
  console.log(`    Content chars: ${book.totalChars}`);
  console.log();
}

// Create output directory
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Convert each book to Markdown
for (const [guid, book] of books) {
  // Sanitize book name for filename
  const safeName = book.name.replace(/[\/\\:*?"<>|]/g, '_').substring(0, 50);
  const bookDir = join(OUTPUT_DIR, safeName);
  if (!existsSync(bookDir)) {
    mkdirSync(bookDir, { recursive: true });
  }

  // Build markdown
  let md = `# ${book.name}\n\n`;
  
  // Sort chapters by sequence
  const sortedChapters = [...book.chapters.entries()].sort((a, b) => {
    const aSeq = Math.min(...a[1].map(i => parseInt(i.Sequence || '9999')));
    const bSeq = Math.min(...b[1].map(i => parseInt(i.Sequence || '9999')));
    return aSeq - bSeq;
  });

  for (const [chapterName, items] of sortedChapters) {
    // Sort items by sequence
    items.sort((a, b) => parseInt(a.Sequence || '9999') - parseInt(b.Sequence || '9999'));
    
    md += `## ${chapterName}\n\n`;
    
    for (const item of items) {
      const title = item.Title || '';
      const content = (item.Content || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
      
      if (title && title !== chapterName) {
        md += `### ${title}\n\n`;
      }
      md += `${content}\n\n`;
    }
  }

  const mdPath = join(bookDir, 'source.md');
  writeFileSync(mdPath, md, 'utf-8');
  console.log(`Written: ${mdPath} (${md.length} chars)`);
}

console.log('\n✅ All books converted to Markdown');
