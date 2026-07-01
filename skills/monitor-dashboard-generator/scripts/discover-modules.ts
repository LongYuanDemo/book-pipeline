#!/usr/bin/env tsx
/**
 * discover-modules.ts — 自动扫描项目结构，发现可监控的模块
 *
 * 用法: npx tsx skills/monitor-dashboard-generator/scripts/discover-modules.ts --root .
 *
 * 输出 JSON 到 stdout，包含发现的模块列表、数据源路径、依赖关系。
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { join, basename, dirname, relative } from 'path';

interface DiscoveredModule {
  key: string;
  name: string;
  scriptPath: string | null;
  outputDir: string | null;
  outputFile: string;
  deps: string[];
  enabled: boolean | null;
  description: string;
}

interface EntityData {
  id: string;
  name: string;
  dataDir: string;
  files: string[];
  config: Record<string, boolean>;
  manualStatus: ManualStatus | null;
}

interface ManualStatus {
  modules: Record<string, { status: string; detail: string; note?: string }>;
  todos: string[];
  history: { date: string; action: string; result: string }[];
}

interface DiscoveryResult {
  projectRoot: string;
  modules: DiscoveredModule[];
  entities: string[];
  entityData: EntityData[];
  configFiles: string[];
  pipelineDocs: string[];
  warnings: string[];
}

const args = process.argv.slice(2);
const rootArg = args[args.indexOf('--root') + 1] || process.cwd();
const projectRoot = rootArg;

function safeReaddir(dir: string): string[] {
  try { return readdirSync(dir); } catch { return []; }
}

function safeRead(path: string): string {
  try { return readFileSync(path, 'utf-8'); } catch { return ''; }
}

function findScriptDirs(root: string): string[] {
  const candidates = ['skills', 'scripts', 'pipeline', 'tools', 'src/modules'];
  return candidates.filter(d => existsSync(join(root, d)));
}

function extractModuleKey(filename: string): string {
  const base = basename(filename).replace(/\.(ts|js|mjs|py|sh)$/, '');
  return base
    .replace(/^generate[-_]/, '')
    .replace(/^run[-_]/, '')
    .replace(/[-_]pipeline$/, '')
    .replace(/[-_]/g, '-');
}

function extractDepsFromScript(content: string): string[] {
  const deps: string[] = [];
  const importPattern = /from\s+['"](.+?)['"]/g;
  let match: RegExpExecArray | null;
  while ((match = importPattern.exec(content)) !== null) {
    const imp = match[1];
    if (imp.includes('shared/') || imp.includes('../shared')) continue;
    if (imp.startsWith('.')) {
      const depKey = basename(imp).replace(/\.(ts|js)$/, '');
      if (depKey && !depKey.startsWith('index')) deps.push(depKey);
    }
  }
  const inputPattern = /--input\s+\S+\/(\w+)\.(ts|js|json|md)/g;
  while ((match = inputPattern.exec(content)) !== null) {
    deps.push(match[1]);
  }
  return [...new Set(deps)];
}

function scanScriptDir(dir: string, root: string): DiscoveredModule[] {
  const modules: DiscoveredModule[] = [];
  const entries = safeReaddir(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    let stat;
    try { stat = statSync(fullPath); } catch { continue; }

    if (!stat.isDirectory()) {
      if (/\.(ts|js|mjs|py|sh)$/.test(entry)) {
        const key = extractModuleKey(entry);
        const content = safeRead(fullPath);
        modules.push({
          key,
          name: entry,
          scriptPath: relative(root, fullPath),
          outputDir: null,
          outputFile: inferOutputFile(key, content),
          deps: extractDepsFromScript(content),
          enabled: null,
          description: content.split('\n').find(l => l.startsWith('//') || l.startsWith('#'))?.replace(/^[\/#]+\s*/, '') || '',
        });
      }
      continue;
    }

    // Pattern 1: skill dir with SKILL.md + scripts/ subdir
    const skillMd = join(fullPath, 'SKILL.md');
    const scriptsSubdir = join(fullPath, 'scripts');

    if (existsSync(skillMd)) {
      const desc = safeRead(skillMd)
        .split('\n')
        .find(l => l.startsWith('description:'))
        ?.replace(/^description:\s*/, '')
        ?.trim() || '';
      const key = entry.replace(/[-_]/g, '-');

      // Find main script in scripts/ subdir
      let scriptFile: string | null = null;
      if (existsSync(scriptsSubdir)) {
        const scriptEntries = safeReaddir(scriptsSubdir);
        // Match generate-*.ts, run-*.ts, generate.ts, index.ts etc.
        scriptFile = scriptEntries
          .filter(f => /^generate[-_].*\.(ts|js|mjs)$/.test(f) || /^(generate|run|index)\.(ts|js|mjs)$/.test(f))
          .map(f => join(scriptsSubdir, f))
          .find(f => existsSync(f)) || null;
      }

      const content = scriptFile ? safeRead(scriptFile) : '';
      modules.push({
        key,
        name: entry,
        scriptPath: scriptFile ? relative(root, scriptFile) : null,
        outputDir: null,
        outputFile: inferOutputFile(key, content),
        deps: extractDepsFromScript(content),
        enabled: null,
        description: desc,
      });
      continue;
    }

    // Pattern 2: dir with direct script files
    const scriptFile = ['generate.ts', 'generate.js', 'run.ts', 'run.js', 'index.ts', 'index.js']
      .map(f => join(fullPath, f))
      .find(f => existsSync(f));

    if (scriptFile) {
      const key = basename(fullPath).replace(/[-_]/g, '-');
      const content = safeRead(scriptFile);
      const skMd = join(fullPath, 'SKILL.md');
      const desc = safeRead(skMd)
        .split('\n')
        .find(l => l.startsWith('description:'))
        ?.replace(/^description:\s*/, '')
        ?.trim() || '';

      modules.push({
        key,
        name: basename(fullPath),
        scriptPath: relative(root, scriptFile),
        outputDir: null,
        outputFile: inferOutputFile(key, content),
        deps: extractDepsFromScript(content),
        enabled: null,
        description: desc,
      });
    }
  }

  return modules;
}

function scanConfigFiles(root: string): { configs: string[]; moduleEnables: Record<string, boolean> } {
  const configs: string[] = [];
  const enables: Record<string, boolean> = {};

  const configCandidates = ['meta.json', 'config.json', 'config.yml', 'config.yaml', '.env'];
  for (const c of configCandidates) {
    const path = join(root, c);
    if (existsSync(path)) {
      configs.push(c);
      if (c.endsWith('.json')) {
        try {
          const data = JSON.parse(safeRead(path));
          if (data.modules) {
            for (const [k, v] of Object.entries(data.modules)) {
              enables[k] = v === true;
            }
          }
          if (data.MODULES) {
            for (const [k, v] of Object.entries(data.MODULES)) {
              enables[k] = v === true;
            }
          }
        } catch {}
      }
    }
  }

  const booksDir = join(root, 'books');
  if (existsSync(booksDir)) {
    for (const book of safeReaddir(booksDir)) {
      const metaPath = join(booksDir, book, 'meta.json');
      if (existsSync(metaPath)) {
        try {
          const data = JSON.parse(safeRead(metaPath));
          if (data.modules) {
            for (const [k, v] of Object.entries(data.modules)) {
              enables[`${book}/${k}`] = v === true;
            }
          }
        } catch {}
      }
    }
  }

  return { configs, moduleEnables: enables };
}

function findEntityDir(root: string): string | null {
  const entityDirs = ['books', 'services', 'packages', 'apps'];
  for (const d of entityDirs) {
    const path = join(root, d);
    if (existsSync(path)) return d;
  }
  return null;
}

function scanEntities(root: string): string[] {
  const entityDir = findEntityDir(root);
  if (!entityDir) return [];
  const path = join(root, entityDir);
  return safeReaddir(path).filter(e => { try { return statSync(join(path, e)).isDirectory(); } catch { return false; } });
}

function inferOutputFile(modKey: string, scriptContent: string): string {
  const keyClean = modKey.replace(/-generator$/, '').replace(/-extractor$/, '');
  const keyCamel = keyClean.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const keyShort = modKey.split('-')[0];
  const candidates = [
    `${keyCamel}.ts`,
    `${keyShort}.ts`,
    `${keyCamel.replace(/([a-z])([A-Z])/g, '$1$2')}.ts`,
  ];
  const patterns = [
    new RegExp(`outputFile['"]?\\s*[:=]\\s*['"](\w+\.ts)['"]`, 'i'),
    new RegExp(`writeFile.*?(\w+\.ts)`, 'i'),
  ];
  for (const p of patterns) {
    const m = scriptContent.match(p);
    if (m) return m[1];
  }
  for (const c of candidates) {
    if (scriptContent.includes(c)) return c;
  }
  return candidates[0];
}

function scanEntityData(root: string, entities: string[], modules: DiscoveredModule[]): EntityData[] {
  const entityDir = findEntityDir(root);
  if (!entityDir || entities.length === 0) return [];

  return entities.map((entityId) => {
    const dir = join(root, entityDir!, entityId);
    const dataDir = join(dir, 'data');
    const files: string[] = existsSync(dataDir) ? safeReaddir(dataDir).filter(f => /\.(ts|js|json)$/.test(f)) : [];

    const config: Record<string, boolean> = {};
    const metaPath = join(dir, 'meta.json');
    if (existsSync(metaPath)) {
      try {
        const data = JSON.parse(safeRead(metaPath));
        if (data.modules) for (const [k, v] of Object.entries(data.modules)) config[k] = v === true;
      } catch {}
    }

    const manualStatus = parsePipelineStatus(join(dir, 'pipeline-status.md'));
    const name = entityId;

    return { id: entityId, name, dataDir: relative(root, dataDir), files, config, manualStatus };
  });
}

function parsePipelineStatus(filePath: string): ManualStatus | null {
  if (!existsSync(filePath)) return null;
  const content = safeRead(filePath);
  if (!content.trim()) return null;

  const result: ManualStatus = { modules: {}, todos: [], history: [] };
  const lines = content.split('\n');
  let section = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^#{1,3}\s.*模块/i.test(trimmed)) { section = 'modules'; continue; }
    if (/^#{1,3}\s.*待办/i.test(trimmed)) { section = 'todos'; continue; }
    if (/^#{1,3}\s.*历史/i.test(trimmed)) { section = 'history'; continue; }
    if (/^#{1,3}\s/.test(trimmed)) { section = ''; continue; }

    if (section === 'modules' && trimmed.startsWith('|')) {
      const cells = trimmed.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 2 && cells[0] !== '模块' && cells[0] !== '---' && !cells[0].startsWith('-')) {
        const [modKey, statusRaw, detail, note] = cells;
        const statusMap: Record<string, string> = { '✅': 'complete', '✓': 'complete', '⚠️': 'partial', '⚠': 'partial', '❌': 'empty', '✗': 'empty', '—': 'disabled', '⏸': 'not-run' };
        const status = statusMap[statusRaw] || statusRaw || 'unknown';
        result.modules[modKey] = { status, detail: detail || '', note };
      }
    }
    if (section === 'todos' && trimmed.startsWith('- [')) {
      result.todos.push(trimmed.replace(/^\s*[-*]\s*/, '').replace(/\[.\]\s*/, ''));
    }
    if (section === 'history' && trimmed.startsWith('|')) {
      const cells = trimmed.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 3 && cells[0] !== '日期' && cells[0] !== '---') {
        result.history.push({ date: cells[0], action: cells[1], result: cells.slice(2).join(' ') });
      }
    }
  }

  return result;
}

function scanPipelineDocs(root: string): string[] {
  const docs: string[] = [];
  const docCandidates = ['AGENT.md', 'README.md', 'CLAUDE.md'];
  for (const d of docCandidates) {
    if (existsSync(join(root, d))) docs.push(d);
  }
  const skillsDir = join(root, 'skills');
  if (existsSync(skillsDir)) {
    for (const sub of safeReaddir(skillsDir)) {
      const agentMd = join(skillsDir, sub, 'AGENT.md');
      if (existsSync(agentMd)) docs.push(`skills/${sub}/AGENT.md`);
    }
  }
  return docs;
}

function main() {
  const warnings: string[] = [];

  const scriptDirs = findScriptDirs(projectRoot);
  if (scriptDirs.length === 0) {
    warnings.push('未找到 skills/scripts/pipeline/tools 目录，无法自动发现模块');
  }

  let modules: DiscoveredModule[] = [];
  for (const dir of scriptDirs) {
    modules.push(...scanScriptDir(join(projectRoot, dir), projectRoot));
  }

  const { configs, moduleEnables } = scanConfigFiles(projectRoot);
  for (const mod of modules) {
    if (moduleEnables[mod.key] !== undefined) {
      mod.enabled = moduleEnables[mod.key];
    }
  }

  const entities = scanEntities(projectRoot);
  const pipelineDocs = scanPipelineDocs(projectRoot);

  if (modules.length === 0) {
    warnings.push('未发现任何模块，请手动指定项目模块列表');
  }

  const entityData = scanEntityData(projectRoot, entities, modules);

  // Cross-reference: refine outputFile by matching against actual entity files
  if (entityData.length > 0) {
    const allFiles = new Set<string>();
    entityData.forEach(e => e.files.forEach(f => allFiles.add(f)));
    for (const mod of modules) {
      if (allFiles.has(mod.outputFile)) continue;
      const keyClean = mod.key.replace(/-generator$/, '').replace(/-extractor$/, '');
      const keyCamel = keyClean.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const keyShort = mod.key.split('-')[0];
      const alts = [`${keyCamel}.ts`, `${keyShort}.ts`, `${keyShort}Parsed.ts`, `${keyShort}Content.ts`];
      const match = alts.find(a => allFiles.has(a));
      if (match) mod.outputFile = match;
    }
  }

  const result: DiscoveryResult = {
    projectRoot: relative(projectRoot, projectRoot) || '.',
    modules,
    entities,
    entityData,
    configFiles: configs,
    pipelineDocs,
    warnings,
  };

  console.log(JSON.stringify(result, null, 2));
}

main();
