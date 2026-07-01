#!/usr/bin/env node
/**
 * Fix audio duration mismatch in audioCourse.ts
 * Scales durationSeconds and frame start timestamps to match actual MP3 durations.
 */
import { readFileSync, writeFileSync } from 'fs';

const ACTUAL_DURATIONS = {
  'audio-l1.mp3': 830,
  'audio-l2.mp3': 1172,
  'audio-l3.mp3': 840,
  'audio-l4.mp3': 1179,
  'audio-l5.mp3': 1176,
  'audio-l6.mp3': 695,
  'audio-l7.mp3': 985,
  'audio-l8.mp3': 1138,
  'audio-l9.mp3': 1052,
  'audio-l10.mp3': 1037,
};

const FILE = 'books/eye-ent-nursing/data/audioCourse.ts';
let content = readFileSync(FILE, 'utf-8');
const lines = content.split('\n');

// Find all durationSeconds line indices and their corresponding audioUrl
const durLines = [];
for (let i = 0; i < lines.length; i++) {
  const durMatch = lines[i].match(/durationSeconds:\s*(\d+)/);
  if (durMatch) {
    // Search nearby lines (within 20 lines) for audioUrl
    let audioFile = null;
    for (let j = Math.max(0, i - 20); j <= Math.min(lines.length - 1, i + 20); j++) {
      const audioMatch = lines[j].match(/audioUrl:\s*'\/audio\/(audio-l\d+\.mp3)'/);
      if (audioMatch) {
        audioFile = audioMatch[1];
        break;
      }
    }
    durLines.push({ lineIdx: i, oldDur: parseInt(durMatch[1]), audioFile });
  }
}

console.log(`Found ${durLines.length} duration entries`);

// Determine lesson boundaries: each lesson spans from one durationSeconds to the next
for (let li = 0; li < durLines.length; li++) {
  const { lineIdx, audioFile } = durLines[li];
  if (!audioFile) {
    console.log(`Skip line ${lineIdx} - no audio file found`);
    continue;
  }

  const actualDur = ACTUAL_DURATIONS[audioFile];
  if (!actualDur) {
    console.log(`Skip ${audioFile} - no actual duration`);
    continue;
  }

  const oldDur = durLines[li].oldDur;
  const ratio = actualDur / oldDur;
  const lessonStart = lineIdx;
  const lessonEnd = li + 1 < durLines.length ? durLines[li + 1].lineIdx : lines.length;

  console.log(`${audioFile}: ${oldDur}s → ${actualDur}s (ratio: ${ratio.toFixed(4)}), lines ${lessonStart}-${lessonEnd}`);

  // Update durationSeconds
  lines[lineIdx] = lines[lineIdx].replace(/durationSeconds:\s*\d+/, `durationSeconds: ${actualDur}`);

  // Scale all frame start: values within this lesson range
  for (let i = lessonStart; i < lessonEnd; i++) {
    const startMatch = lines[i].match(/^(\s*start:\s*)(\d+)(,?\s*)$/);
    if (startMatch) {
      const oldStart = parseInt(startMatch[2]);
      const newStart = Math.round(oldStart * ratio);
      lines[i] = `${startMatch[1]}${newStart}${startMatch[3]}`;
    }
  }
}

writeFileSync(FILE, lines.join('\n'), 'utf-8');
console.log('Done! audioCourse.ts patched.');
