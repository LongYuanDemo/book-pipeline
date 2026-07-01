---
name: knowledge-map-generator
description: >-
  Generates adaptive knowledge map data from any textbook Markdown. Extracts entities,
  builds relations, selects a visualization paradigm, and outputs knowledgeMap.ts.
  Supports 8 paradigms (radial, tree, metro, network, adaptation-flow, process-flow,
  spatial-map, skill-tree). Use when processing textbooks for knowledge graph generation
  or when the user mentions knowledge maps, entity extraction, or textbook digitization.
metadata:
  author: bookai-team
  version: "2.0"
compatibility: Requires Node.js 18+, tsx, and access to an LLM API (Kimi/Coze/DeepSeek/Gemini).
license: Proprietary
---

# Knowledge Map Generator

Generates interactive knowledge map data from textbook content. One command runs the full 7-step pipeline: structure analysis → entity extraction → disambiguation → classification → event extraction → relation building → review → layout → quality evaluation.

## Quick Start

```bash
# Single book (uses fallback prompts)
npx tsx skills/knowledge-map-generator/scripts/generate-knowledge-map.ts --book-id <bookId>

# Force regenerate (ignore cache)
npx tsx skills/knowledge-map-generator/scripts/generate-knowledge-map.ts --book-id <bookId> --force

# With custom prompts (recommended for best quality)
npx tsx skills/knowledge-map-generator/scripts/generate-knowledge-map.ts \
  --book-id <bookId> --force \
  --entity-prompt-file /tmp/entity-prompt.txt \
  --relation-prompt-file /tmp/relation-prompt.txt
```

**Input**: `books/{bookId}/data/bookInfo.ts` + `books/{bookId}/data/chapterContent.ts`
**Output**: `books/{bookId}/data/knowledgeMap.ts`

## Pipeline Overview (7 Steps)

| Step | Script | shiji-kb | Description |
|------|--------|----------|-------------|
| 1. Structure analysis | `scripts/analyze-structure.ts` | SKILL_02 | Parse bookInfo + chapterContent, detect paradigm |
| 2a. Entity extraction | `scripts/extract-entities.ts` | SKILL_03a | LLM extracts entities per module, with refs + occurrences |
| 2b. Entity disambiguation | `scripts/disambiguate-entities.ts` | SKILL_03b/03g | LLM merges duplicates, splits ambiguities |
| 2c. Entity classification | `scripts/classify-entities.ts` | SKILL_03h-03k | LLM normalizes type/culture, builds taxonomy |
| 3. Event extraction | `scripts/extract-events.ts` | SKILL_04 | LLM extracts events with verb + participants |
| 4a. Relation building | `scripts/build-relations.ts` | SKILL_05b | LLM builds entity relations, fallback to rule-based |
| 4b. Event relations | `scripts/build-event-relations.ts` | SKILL_05a | Temporal/causal relations between events |
| 5. Review | `scripts/review-knowledge-map.ts` | SKILL_03c-03f | Dedup, refs validation, auto-merge, isolation fix |
| 6. Layout + serialize | `scripts/generate-knowledge-map.ts` | SKILL_00 | Compute coordinates, write knowledgeMap.ts |
| 7. Quality evaluation | `scripts/evaluate-quality.ts` | SKILL_08 | Coverage/correctness/confidence scoring |

See [references/PIPELINE.md](references/PIPELINE.md) for detailed stage specifications.

## Paradigm Selection

Auto-detected from content keyword density. 8 paradigms supported:

| Paradigm | Trigger | Example |
|----------|---------|---------|
| adaptation-flow | translation/adaptation keywords | 翻译研究、比较文学 |
| metro | time + person density | 历史、文学史 |
| network | person density | 人物传记、小说 |
| process-flow | process keywords | 工程、实训 |
| spatial-map | place keywords | 地理、旅游 |
| tree | deep concept hierarchy | 理工、计算机 |
| skill-tree | skill dependencies | 编程、语言 |
| radial | fallback | 通用教材 |

See [references/PARADIGMS.md](references/PARADIGMS.md) for full selection rules.

## Entity & Relation Types

Entity types are **not hardcoded** — the LLM selects appropriate types based on textbook content. Common patterns:

| Textbook type | Entity types | Relation types |
|---------------|-------------|----------------|
| Literature/Translation | work, person, concept, medium, place | translation, adaptation, influence, remake |
| Medical | disease, drug, procedure, anatomy, concept | prerequisite, application, progressive |
| Engineering | tool, process, material, step, safety | application, progressive, parallel |
| General | concept, principle, method, case | prerequisite, parallel, progressive, application |

See [references/ENTITY-TYPES.md](references/ENTITY-TYPES.md) for full type catalog.

## Architecture

- **SKILL.md** (this file): Pipeline overview + quick start. The single entry point for Agent discovery.
- **references/**: Detailed specifications loaded on demand.
- **scripts/**: TypeScript executables. Scripts handle I/O only — all business logic (entity types, relation rules, paradigm thresholds) is defined in SKILL.md and references.

### Agent Workflow

1. Read this SKILL.md to understand the pipeline and available paradigms
2. Read `bookInfo.ts` to determine textbook type
3. Optionally read [references/ENTITY-TYPES.md](references/ENTITY-TYPES.md) for type guidance
4. Generate entity/relation prompts tailored to the textbook type
5. Run `generate-knowledge-map.ts` with `--entity-prompt-file` and `--relation-prompt-file`
6. Verify output quality (entity count, relation count, refs completeness, no duplicate IDs)

## Quality Gate（阻塞式质量门 + 反思重跑）

`evaluate-quality.ts` 不再只是打分，而是一道**可阻塞的质量门**——每本书的知识图谱必须达标才算合格交付物（面向 2000+ 本批量制作）。

**门槛指标**（默认阈值见 `types.ts` 的 `DEFAULT_QUALITY_THRESHOLDS`）：

| 指标 | 默认门槛 | 含义 |
|------|----------|------|
| 关系密度 | ≥ 0.3 | 关系数 / 非中心实体数（防"实体一堆、关系稀疏"的散点图） |
| reason 覆盖率 | ≥ 0.5 | 带 `reason` 的关系占比（防空关系） |
| 引用覆盖率 | ≥ 0.6 | 有 `refs` 的实体占比 |
| 孤立节点占比 | ≤ 0.1 | 未连边实体占比 |
| 重复实体 ID | = 0 | 去重是否彻底 |
| 未知关系类型 | 无 | 关系类型须在 `relation-vocab.ts` 词表内 |
| 跨书污染 | 无 | 中心节点文案须由本书书名生成（详见去污染） |

**命令行用法**：

```bash
# 只评估 + 打印门结果（不阻塞）
npx tsx skills/knowledge-map-generator/scripts/evaluate-quality.ts --book-id <bookId>

# 阻塞模式：门未通过则退出码 1（供 orchestrator / CI 拦截）
npx tsx skills/knowledge-map-generator/scripts/evaluate-quality.ts --book-id <bookId> --gate

# 生成时启用阻塞门 + 有界反思重跑（门未过则重跑关系构建+审查，最多 N 次）
npx tsx skills/knowledge-map-generator/scripts/generate-knowledge-map.ts --book-id <bookId> --strict --reflect 2
```

**去污染（review 阶段，幂等）**：`review-knowledge-map.ts` 每次都按本书 `bookInfo.ts` 的书名重建 `center-work` 中心节点，覆盖任何上游（如 `extract-workflow.ts` 的文学模板）泄漏的跨书文案。

**关系类型词表**：`relation-vocab.ts` 是关系类型的单一真相源；前端 `KnowledgeMapOverview` 的 `RELATION_STYLES` 按此镜像样式，确保医学/工程类关系（prerequisite/progressive/application/causal 等）也有颜色+标签，不落灰色默认。新增类型时两处同步登记。

## Output Data Structure

```typescript
interface KnowledgeMapData {
  paradigm: string;
  rationale: string;
  nodes: KnowledgeMapNode[];
  edges: KnowledgeMapEdge[];
  enrichedEntities: EnrichedEntity[];    // with refs, occurrences, aliases
  enrichedRelations: EnrichedRelation[];
  events?: KnowledgeEvent[];             // from Step 3
  eventRelations?: EventRelation[];      // from Step 4b
  quality?: QualityReport;               // from Step 7
}
```

`enrichedEntities` includes `refs` (chapter/title/pn), `occurrences` (taskId/pn/offset/length), and `aliases` for entity highlighting in chapter content. `quality` provides coverage, confidence score, and issue diagnostics.
