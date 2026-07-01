# 数智教材 2.0 — 图书制作流水线

本仓库包含将一本教材从原始 Markdown 转化为交互式数字产品的完整流水线脚手架。

## 架构概览

```
JSON/PDF 原始素材
    │
    ▼
┌──────────────────────────────────┐
│  source-parser                   │  ← json-to-source.py / extract-html.py
│  (JSON → sourceRaw.ts + source.md)│
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│  book-info-generator             │  ← 生成 bookInfo.ts（书籍元数据中枢）
│  (source.md → bookInfo.ts)       │
└──────────┬───────────────────────┘
           │
     ┌─────┼─────┬─────┬───────┐
     ▼     ▼     ▼     ▼       ▼
  chapter  anki  audio  video  knowledge
  content  card  course keyframe map
  generator gen   gen    extr    gen
     │     │     │     │       │
     ▼     ▼     ▼     ▼       ▼
  chapterContent.ts  anki.ts  audioCourse.ts  video.ts  knowledgeMap.ts
     │
     ▼
  前端渲染（React + TailwindCSS）
```

## 目录结构

```
skills/                          # 各环节 Skill（AI Agent 可读 + 可执行）
├── pipeline.sh                  # 主流水线编排脚本
├── pipeline-orchestrator/
│   └── AGENT.md                 # AI Agent 执行指南（含依赖图、错误处理策略）
├── shared/                      # 共享工具库
│   ├── llm.ts                   # LLM 调用封装（DeepSeek/Kimi/Coze）
│   ├── tts.ts                   # TTS 语音合成封装
│   ├── markdown.ts              # Markdown 解析工具
│   ├── paths.ts                 # 路径常量
│   ├── types.ts                 # 共享类型定义
│   ├── validator.ts             # 数据校验器
│   ├── deepseek.ts              # DeepSeek API 适配
│   ├── kimi.ts                  # Kimi API 适配
│   └── coze.ts                  # Coze API 适配
├── source-parser/               # 源文件解析
├── book-info-generator/         # 书籍元数据生成（中枢节点）
├── chapter-content-generator/   # 章节内容 + AI 增强生成
├── anki-card-generator/         # 闪卡 + 测验生成
├── audio-course-generator/      # 音频课生成（TTS + ASR 对齐）
├── knowledge-map-generator/     # 知识地图生成（实体抽取 + 关系构建）
├── video-keyframe-extractor/    # 视频关键帧提取
├── monitor-dashboard-generator/ # 工程监控看板生成
└── orchestrator/                # 编排器脚本

scripts/                         # 辅助脚本
├── json-to-source.py            # JSON → sourceRaw.ts + source.md
├── extract-html.py              # HTML 提取与清洗
├── split-books.mjs              # 大书拆分
├── fix-source-html.mjs          # 源 HTML 修复
├── fix-audio-durations.mjs      # 音频时长修正
├── fix-audio-relations.mjs      # 音频关系修正
├── verify-book.ts               # 书籍数据完整性校验
├── batch-build.sh               # 批量构建
├── validate.sh                  # 数据验证
└── deploy.sh                    # 部署脚本
```

## 流水线执行顺序

1. **源文件解析** — `json-to-source.py` / `extract-html.py` → `sourceRaw.ts` + `source.md`
2. **书籍元数据生成** — `book-info-generator` → `bookInfo.ts`（⚠️ 手动执行 Skill）
3. **章节内容生成** — `chapter-content-generator` → `chapterContent.ts`（⚠️ 手动执行 Skill）
4. **闪卡生成** — `anki-card-generator` → `anki.ts`（⚠️ 手动执行 Skill）
5. **音频课生成** — `audio-course-generator` → `audioCourse.ts`（含 TTS + ASR）
6. **知识地图生成** — `knowledge-map-generator` → `knowledgeMap.ts`（⚠️ 手动执行 Skill）
7. **视频关键帧提取** — `video-keyframe-extractor` → `video.ts`
8. **构建验证** — `verify-book.ts` + `validate.sh`

> 标注 ⚠️ 的步骤需要 AI Agent 手动执行对应的 Skill（涉及 LLM 调用）。
> 步骤 3-6 理论上可以并发（都依赖步骤 2 的输出，彼此无依赖）。

## Skill 范式

每个 Skill 遵循统一结构：
- `SKILL.md` — AI Agent 可读的执行指南（含 prompt 模板、输入输出规范、成功标准）
- `scripts/` — 可执行的 TypeScript/Shell 脚本
- `references/` — 参考文档（如实体类型表、范式说明等）

## 技术栈

- **Runtime**: Node.js + tsx (TypeScript 执行)
- **LLM**: DeepSeek / Kimi / Coze（多模型适配）
- **TTS**: 语音合成 API
- **ASR**: 语音识别 API（用于音频时间戳对齐）
- **前端**: React + TailwindCSS + Vite（不在本仓库中）

## 关于本仓库

本仓库仅包含**制作流水线的脚手架代码**，不含前端应用和已生成的书籍数据。
目的是让 AI Agent（如 Claude）审查流水线设计，评估优化空间。
