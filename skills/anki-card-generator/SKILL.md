---
name: anki-card-generator
description: 从教材 Markdown 生成闪卡 + 测验题，支持翻转卡、选择题、AI 深度解释，集成到数智教材2.0 前端。参考 NotebookLM 闪卡设计。
---

# Anki 卡片生成器

从教材内容生成闪卡（Flashcards）和测验题（Quiz），集成到数智教材2.0 前端的 Anki 页面。

## 产品设计（参考 NotebookLM）

### 闪卡模式
- 正面显示问题，点击翻转到背面看答案
- 背面显示答案 + 关键点 + AI 深度解释（可选展开）
- 评分：会了 / 不会，进度追踪
- 支持洗牌、上一张/下一张导航、重新开始
- 完成后显示统计摘要

### 测验模式
- 四选一选择题
- 答题后即时反馈：正确（绿色✓）/错误（红色✗）
- AI 解释面板：说明为什么对/错，引用教材内容
- 答题前可显示提示
- 进度追踪 + 最终得分

### 费曼复述模式
- 独立于闪卡，使用精选核心卡片（每章 3-5 张）
- 开放性问题：要求学生用自己的话完整解释某个核心论点
- 参考答案为完整论述（2-4句话），而非简短答案
- AI 校对：基于关键词覆盖率 + 文本长度判断复述是否合格
- 结果展示：用户复述 + 参考答案 + 关键点 + 深度解释

## 数据格式

输出文件：`books/{bookId}/data/anki.ts`

```typescript
export interface Flashcard {
  id: string;          // f1, f2, ...
  chapterId: string;   // 对应模块 ID
  chapter: string;     // 模块名称
  question: string;    // 问题
  answer: string;      // 简洁答案
  keyPoint: string;    // 关键点
  explanation?: string; // AI 深度解释（可选）
}

export interface QuizOption {
  id: string;       // a, b, c, d
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;          // q1, q2, ...
  chapterId: string;
  chapter: string;
  question: string;
  options: QuizOption[];  // 4个选项
  explanation: string;    // AI 解释
  hint?: string;          // 提示（可选）
}

export interface FeynmanCard {
  id: string;          // fm1, fm2, ...
  chapterId: string;
  chapter: string;
  question: string;    // 开放性复述题目
  answer: string;      // 完整论述参考答案
  keyPoint: string;    // 复述必须涵盖的核心要素
  explanation?: string; // 深度解释
}

export interface AnkiDeck {
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
  feynmanCards: FeynmanCard[];
}
```

## 生成规则

### 闪卡生成
1. **覆盖范围**：每个模块/章节至少 2 张闪卡，覆盖核心概念
2. **问题类型**：定义类、对比类、技法类、原理类
3. **答案要求**：简洁（1-2句话），突出核心
4. **关键点**：补充答案中未展开的要点
5. **AI 解释**：提供更深入的原理解析、科学背景、实操要点

### 测验题生成
1. **每模块至少 1 遘测验题**
2. **四个选项**：1个正确，3个干扰项（合理但有明显区别）
3. **干扰项设计**：来自常见误解、相似概念、错误操作
4. **解释**：说明正确答案为什么对，错误选项为什么错
5. **提示**：引导思考方向，不直接给出答案

### 费曼复述卡片生成
1. **每章仅 3-5 张**，精选该章节最核心、最值得复述的知识点
2. **问题为开放性**：要求学生用自己的话完整解释，而非简单问答
3. **参考答案为完整论述**（2-4句话），而非简短答案
4. **关键点为复述必须涵盖的核心要素**，用逗号分隔，用于 AI 校对评分
5. **深度解释**帮助学生理解为什么这个知识点重要

### 内容质量标准
- 所有内容基于教材原文，不编造
- 专业术语准确
- 解释要有教育价值，帮助理解而非死记
- 适当联系实际操作场景

## Pipeline

```
书籍 MD → 解析模块/章节结构 → 生成闪卡 + 测验题 + 费曼复述卡片 → 输出 anki.ts → 集成到前端
```

### 步骤

1. **解析书籍结构**：读取 MD，识别模块和任务层级
2. **提取核心知识点**：每模块/任务的关键概念、技法、原理
3. **生成闪卡**：按规则创建 flashcards 数组
4. **生成测验题**：按规则创建 quizQuestions 数组
5. **生成费曼卡片**：按规则创建 feynmanCards 数组（每章 3-5 张核心卡片）
6. **输出 TS 文件**：写入 `books/{bookId}/data/anki.ts`
7. **前端验证**：启动 dev server，打开 Anki 页面验证

## 前端集成

- 页面：`src/pages/Anki.tsx`
- 数据：`books/{bookId}/data/anki.ts`
- 导入：`import { ankiDeck } from '../data/anki.ts'`
- 三种模式通过顶部 tab 切换：闪卡、测验、费曼复述

## 用法

```bash
# 默认（使用通用 fallback prompt）
npx tsx skills/anki-card-generator/scripts/generate-anki.ts \
  --book-id eye-ent-nursing

# 使用 Agent 生成的自定义 prompt（推荐，按教材类型自适应）
npx tsx skills/anki-card-generator/scripts/generate-anki.ts \
  --book-id eye-ent-nursing \
  --prompt-file /tmp/anki-prompt.txt
```

## 批量制作

对于新书：
1. 读取书籍 MD
2. 按上述规则生成闪卡和测验题
3. 覆写 `books/{bookId}/data/anki.ts`
4. 验证前端渲染

## Skills 范式架构说明

本 Skill 遵循 Skills 范式设计：
- **SKILL.md 是唯一真相源**：闪卡规则、测验题规则、费曼卡片规则都在本文档定义
- **TS 脚本只做 I/O**：文件读写、LLM 调用、JSON 解析、TS 校验，不包含业务逻辑
- **Agent 读 SKILL.md 后自适应**：根据教材类型生成 prompt，通过 `--prompt-file` 传入脚本
- **Prompt 不硬编码在 TS 中**：所有业务 prompt 由 Agent 动态生成，脚本只负责执行

### Agent 执行流程

1. 读取本 SKILL.md，理解闪卡/测验/费曼卡片规则
2. 读取 `bookInfo.ts`，判断教材类型（医学/文学/工程/通用）
3. 按教材类型生成 anki prompt 文件
4. 调用 `generate-anki.ts` 传入 `--prompt-file`
5. 脚本执行 LLM 调用，输出 `anki.ts`
6. Agent 验证输出质量（闪卡数量、测验覆盖率、费曼卡片精选度）

### Prompt 模板占位符

- `{{chapterLabel}}` — 章节标签（如 "模块1 · 概述"）
- `{{chapterText}}` — 章节全文（截取前 8000 字符）

如未提供 `--prompt-file`，脚本使用通用 fallback prompt（适用于大多数教材）。
