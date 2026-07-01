#!/usr/bin/env node
/**
 * Fix sourceHtml.ts: merge duplicate chapter 6 block into the first one.
 */
import { readFileSync, writeFileSync } from 'fs';

const FILE = 'books/eye-ent-nursing/data/sourceHtml.ts';
let content = readFileSync(FILE, 'utf-8');

// The duplicate chapter block starts with:
//   chapter: '第六章 耳鼻咽喉科患者\n的护理',
// and contains one section (ds0668530029-3, "第一节 耳科患者的护理")
// We need to:
// 1. Extract the section from the duplicate block
// 2. Append it to the first chapter 6's sections array
// 3. Remove the duplicate chapter block

// Find the duplicate block
const dupMarker = "chapter: '第六章 耳鼻咽喉科患者\\n的护理'";
const dupIdx = content.indexOf(dupMarker);
if (dupIdx === -1) {
  console.log('No duplicate chapter 6 found. Already fixed?');
  process.exit(0);
}

// Find the section inside the duplicate block
// The section starts with titleId: 'ds0668530029-3'
const sectionStart = content.indexOf("titleId: 'ds0668530029-3'", dupIdx);
if (sectionStart === -1) {
  console.log('Could not find section in duplicate block');
  process.exit(1);
}
// Back up to the opening brace
const sectionBraceStart = content.lastIndexOf('{', sectionStart);

// Find the end of this section (next }, then ])
const sectionEnd = content.indexOf('},', sectionStart);
if (sectionEnd === -1) {
  console.log('Could not find end of section');
  process.exit(1);
}

const sectionContent = content.slice(sectionBraceStart, sectionEnd + 1); // include the }

// Find the end of the first chapter 6's sections array
// Look for the closing ] of sections in the first chapter 6 block
const firstCh6Marker = "chapter: '第六章 耳鼻咽喉科患者的护理'";
const firstCh6Idx = content.indexOf(firstCh6Marker);
if (firstCh6Idx === -1) {
  console.log('Could not find first chapter 6');
  process.exit(1);
}

// Find the closing of the first chapter 6's sections array
// It's the first "      ]," after firstCh6Idx and before dupIdx
const sectionsClose = content.indexOf('      ],', firstCh6Idx);
if (sectionsClose === -1 || sectionsClose > dupIdx) {
  console.log('Could not find sections close for first chapter 6');
  process.exit(1);
}

// Insert the section before the closing ]
const beforeClose = content.slice(0, sectionsClose);
const afterClose = content.slice(sectionsClose);

// Add the section with proper indentation
const newSection = '        ' + sectionContent.trim() + ',\n';

// Now remove the duplicate chapter block
// The block starts from "    {" before dupMarker to the matching "    },"
// Find the opening brace of the duplicate block
const blockStart = content.lastIndexOf('    {', dupIdx);
// Find the closing of the duplicate block - it ends with "    },"
const blockEnd = content.indexOf('    },', dupIdx);
if (blockEnd === -1) {
  console.log('Could not find end of duplicate block');
  process.exit(1);
}
const blockEndFull = blockEnd + '    },'.length;

// Reconstruct: insert section into first ch6, then remove duplicate block
// Do it in order: first remove the duplicate block, then insert the section
const withoutDup = content.slice(0, blockStart) + content.slice(blockEndFull);

// Now find the sections close in the withoutDup string (positions shifted)
const newSectionsClose = withoutDup.indexOf('      ],', firstCh6Idx);
const fixed = withoutDup.slice(0, newSectionsClose) + newSection + withoutDup.slice(newSectionsClose);

writeFileSync(FILE, fixed, 'utf-8');
console.log('Fixed: merged duplicate chapter 6 section into first chapter 6');
