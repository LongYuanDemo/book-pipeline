# 数智教材 2.0 — 图书加工流水线

本仓库是将一本教材从原始 Markdown 加工为**数据文件**的流水线（skills + scripts）。
产出的 `data/*.ts` 由**固定前端框架**（另一仓库）消费渲染。本仓库不含前端源码、
书籍数据与成品演示。

## 架构概览

```
JSON/PDF 原始素材
    │  scripts/json-to-source.py · extract-html.py
    ▼
source-parser ──────────────► sourceParsed.ts
    │  book-info-generator（中枢，并对齐 sourceParsed 的 id 到子章节 id）
    ▼
bookInfo.ts
    │  下游 5 个 Skill 都依赖 bookInfo.ts，彼此无依赖（可并发）
    ├──────────┬──────────┬───────────┬──────────────┐
    ▼          ▼          ▼           ▼              ▼
 chapter-    anki-      audio-      knowledge-     （video-keyframe-
 content     card       course      map            extractor 依赖
 generator   generator  generator   generator      chapterContent.ts）
    ▼          ▼          ▼           ▼              ▼
 chapterContent.ts   anki.ts   audioCourse.ts   knowledgeMap.ts   video.ts
 aiEnhancement.ts
```

## 前端消费契约（数据文件 → 固定前端）

各页面按 **子章节 id（`ch{N}-{M}`，如 `ch1-1`）** 作为统一 join key：

| 前端页面 | 消费的数据 | join / 键 |
|---|---|---|
| 阅读页 ChapterContent | `sourceParsed.ts`(原文) + `aiEnhancement.ts`(浮层) + `knowledgeMap.enrichedEntities`(高亮) | `task.id / key / refs[].chapter === 子章节id` |
| 知识地图 MindMap | `knowledgeMap.ts`（enrichedEntities + enrichedRelations） | `refs[].chapter === 子章节id` |
| 闪卡 Anki | `anki.ts`（ankiDeck） | `chapterId` |
| 音频课 AudioCourse | `audioCourse.ts`（audioCourseLessons） | 模块 |
| 视频清单 Checklist | `video.ts`（videoList） | 模块 |
| 首页/导航 | `bookInfo.ts`（bookData / TOOLS / MODULES） | 章节 |

> `chapterContent.ts`（ContentBlock）现为**流水线中间产物**，被
> anki / knowledge-map / video 消费，不直接上前端阅读页。

## 目录结构

```
skills/                          # 每个子目录 = 一个 Skill（SKILL.md + scripts/[+ references/]）
├── source-parser/               # 源文件解析 → sourceParsed.ts
├── book-info-generator/         # 书籍元数据生成（中枢；对齐 sourceParsed id）
├── chapter-content-generator/   # 章节内容 + AI 增强（含 aiEnhancement 质量门）
├── anki-card-generator/         # 闪卡 + 测验
├── audio-course-generator/      # 音频课（TTS + ASR 对齐）
├── knowledge-map-generator/     # 知识地图（实体抽取 + 关系构建 + 质量门 + 反思重跑）
├── video-keyframe-extractor/    # 视频关键帧提取
├── monitor-dashboard-generator/ # 工程监控看板生成
└── shared/                      # ⚠️ 支持库，非 Skill（llm/tts/markdown/paths/types/validator/coze/deepseek）

orchestration/                   # 流水线编排（非 Skill）
├── AGENT.md                     # 总控 Agent 执行指南（依赖图、错误处理策略）
├── pipeline.sh                  # 主流水线编排脚本
└── scripts/                     # run-pipeline.ts（串联运行器）+ verify-content-integrity.ts

scripts/                         # 辅助脚本（json-to-source / extract-html / verify-book / 批量构建等）
```

> **skills/ 目录契约**：每个子目录都是一个可被 Agent 发现的 Skill（含带
> frontmatter 的 `SKILL.md`）。唯一例外是 `skills/shared/`——它是所有 Skill 共享的
> 支持库，不是 Skill。流水线编排（运行器、总控文档、shell）统一放在顶层
> `orchestration/`，不与 Skill 混放。

## 流水线执行顺序

1. **源文件解析** — `scripts/json-to-source.py` / `extract-html.py` → `sourceParsed.ts`
2. **书籍元数据** — `book-info-generator` → `bookInfo.ts`（并对齐 sourceParsed 的 id）
3. **章节内容 + AI 增强** — `chapter-content-generator` → `chapterContent.ts` + `aiEnhancement.ts`
4. **闪卡** — `anki-card-generator` → `anki.ts`
5. **知识地图** — `knowledge-map-generator` → `knowledgeMap.ts`
6. **音频课** — `audio-course-generator` → `audioCourse.ts`
7. **视频清单** — `video-keyframe-extractor` → `video.ts`

> 步骤 3–6 都只依赖步骤 2 的 `bookInfo.ts`，彼此无依赖，可并发。

## 质量门（阻塞式，达标才交付）

面向 2000+ 本批量制作，关键环节把"存在即通过"升级为"达标才交付"：

- **知识地图**：`evaluate-quality.ts --gate`（关系密度 / reason 覆盖率 / 未知关系类型 /
  跨书污染 等）；`generate-knowledge-map.ts --strict --reflect N` 未过则重跑关系构建+审查。
- **AI 增强**：`enhancement-gate.ts --gate`（warning 覆盖 / 通用标题占比 / 标题去重率 /
  quiz 覆盖 等）；`generate-ai-enhancement.ts --strict` 未过则失败。

## Skill 范式

每个 Skill：`SKILL.md`（Agent 可读执行指南 + prompt 模板 + 输入输出规范 + 成功标准）
+ `scripts/`（可执行 TS/Shell）+ 可选 `references/`。业务 prompt 由 Agent 按教材类型
动态生成，通过 `--prompt-file` 注入，脚本内只保留通用 fallback。

## 技术栈

- **Runtime**: Node.js + tsx（TypeScript 直接执行）
- **LLM**: DeepSeek / Coze（多模型适配，见 `skills/shared/`）
- **TTS/ASR**: 语音合成 + 识别（音频时间戳对齐）

## 运行

```bash
npm install
# 单个 Skill（示例）
npx tsx skills/knowledge-map-generator/scripts/generate-knowledge-map.ts --book-id <bookId> --strict --reflect 2
# 类型检查
npm run typecheck
```

> 书籍数据（`books/{bookId}/`）不在本仓库，由加工时在本地/CI 生成。
