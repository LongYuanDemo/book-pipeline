---
name: source-parser
description: 将原始教材 Markdown（source.md）解析为结构化数据 sourceParsed.ts（书籍元数据、模块、任务层级），供下游 book-info-generator、chapter-content-generator 等 Skill 消费。当需要把一本教材的原始 Markdown/HTML 加工进流水线、或下游 Skill 找不到 sourceParsed.ts 时使用。
---

# source-parser

## 概述

将原始教材 Markdown（source.md）解析为结构化数据（sourceParsed.ts），供下游 Skill（book-info-generator、chapter-content-generator）消费。

## 输入

- `books/{bookId}/source.md` — 原始教材 Markdown + HTML 表格混合文件

## 输出

- `books/{bookId}/data/sourceParsed.ts` — 结构化 TypeScript 数据文件

## 数据结构

```ts
export interface BookMeta {
  title: string;
  authors: string[];
  publisher: string;
  isbn?: string;
}

export interface Task {
  id: string;          // 如 "task1", "task1-1"
  title: string;       // 任务标题（含编号）
  rawContent: string;  // 该任务在 source.md 中的原始 Markdown 内容
  rawHtml?: string;    // 原始 HTML（前端渲染基准，优先于 rawContent）
  order: number;     // 在模块中的顺序（从1开始）
}

export interface Module {
  id: string;          // 如 "module1"
  title: string;       // 模块标题（含编号）
  summary?: string;    // 模块摘要（规则生成或 LLM 增强）
  tasks: Task[];
}

export interface SourceParsed {
  bookMeta: BookMeta;
  modules: Module[];
}
```

## 解析规则

### 书名提取
1. 优先取第一个**非结构化标题**（非模块/任务/节）作为书名
2. 回退到 `extractTitle()`（取第一个 H1）
3. 再回退到文件名

### 作者/出版社提取
- 从 `主编：xxx` / `副主编：xxx` / `参编：xxx` 行提取作者
- 匹配"出版社"关键词的行提取出版社

### 模块识别
- H1/H2 中以"模块X"开头的标题（如有）
- 无"模块"前缀时，H1 作为模块层
- H2 中以特定关键词结尾的标题（补充模块，仅在有前置模块时）

### 任务/节识别
- H1/H2 中以"任务X"或"第X节"开头的标题（如有）
- 无上述前缀时，所有非模块的 H2 标题作为章节
- 排除目录页格式（末尾带页码数字）
- 排除辅助标题：任务导入、任务目标、任务实施、任务评价、知识巩固、知识链接、制作要点、模块导学、模块目标
- "前言"、"绪论"、"终章"、"附录"等非标准标题视为正式章节内容，不作为辅助标题过滤

### 任务内容提取
- 从任务标题到下一个任务/模块标题之间的所有原始内容保留为 `rawContent`

### 摘要生成
- 优先调用 LLM（`callLLM` → `callCoze`：DeepSeek → Coze 回退链）生成结构化摘要
- LLM 不可用时，降级为规则摘要（基于模块目标和任务列表拼接）

## 用法

```bash
# 默认（使用通用 fallback prompt）
npx tsx skills/source-parser/scripts/parse-source.ts \
  --book-id eye-ent-nursing

# 使用 Agent 生成的自定义 prompt（推荐，按教材类型自适应）
npx tsx skills/source-parser/scripts/parse-source.ts \
  --book-id eye-ent-nursing \
  --prompt-file /tmp/source-parser-prompt.txt
```

## Skills 范式架构说明

本 Skill 遵循 Skills 范式设计：
- **SKILL.md 是唯一真相源**：解析规则、摘要格式在本文档定义
- **TS 脚本只做 I/O**：文件读写、Markdown 解析、LLM 调用、TS 校验，不包含业务逻辑
- **Agent 读 SKILL.md 后自适应**：根据教材类型生成摘要 prompt，通过 `--prompt-file` 传入
- **Prompt 不硬编码在 TS 中**：所有业务 prompt 由 Agent 动态生成，脚本只负责执行

### Agent 执行流程

1. 读取本 SKILL.md，理解解析规则和摘要格式
2. 读取 `source.md`，判断教材类型和结构特征
3. 按教材类型生成 summary prompt 文件
4. 调用 `parse-source.ts` 传入 `--prompt-file`
5. 脚本执行解析 + LLM 调用，输出 `sourceParsed.ts`
6. Agent 验证输出质量（模块数量、任务数量、摘要完整性）

### Prompt 模板占位符

- `{{moduleTitle}}` — 模块名称
- `{{taskList}}` — 包含任务列表（顿号分隔）

如未提供 `--prompt-file`，脚本使用通用 fallback prompt（适用于大多数教材）。

## 下游消费

- `book-info-generator`：读取 `sourceParsed.ts` 中的 `modules` 和 `bookMeta` 生成 `bookInfo.ts`
- `chapter-content-generator`：读取 `sourceParsed.ts` 中的 `tasks[].rawContent` 生成 `chapterContent.ts`

## LLM 调用链

```
callLLM(prompt) → callCoze → 优先 DeepSeek（DEEPSEEK_API_KEY）→ 回退 Coze Bot（COZE_API_KEY + COZE_BOT_ID）
```

> `shared/llm.ts` 目前不含 Anthropic/Claude 直连。

## 向后兼容

当 `sourceParsed.ts` 不存在时，下游 Skill 自动回退到直接解析 `source.md` 的原有逻辑。

## 通用适配

本 Skill 自动适配不同类型的书籍结构：
- 有"模块X/任务X"前缀的教材：按前缀识别层级
- 无前缀的书籍：H1 作为模块，H2 作为章节
- 非标准章节标题（"前言"、"终章"、"附录"等）被正确识别为正式内容
