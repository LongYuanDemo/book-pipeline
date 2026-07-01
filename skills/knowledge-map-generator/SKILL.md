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
