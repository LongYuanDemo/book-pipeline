# Pipeline Stages

Detailed specification for each stage of the 7-step knowledge map generation pipeline.

## Step 1: Structure Analysis (= shiji-kb SKILL_02)

**Script**: `scripts/analyze-structure.ts`
**Input**: `books/{bookId}/data/bookInfo.ts` + `books/{bookId}/data/chapterContent.ts`
**Output**: `StructureAnalysisResult { bookInfo, chapterContent, paradigm, rationale }`

### Parsing Rules

1. Identify hierarchy levels (typically 3-4):
   - Level 1: Module/Part (e.g. "模块一 XX")
   - Level 2: Task/Chapter (e.g. "任务一 XX" or "第一节 XX")
   - Level 3: Knowledge point/Step (e.g. "原料准备" / "核心概念")
   - Level 4 (optional): Sub-knowledge point

2. Title pattern recognition:
   - `# ` → Level 1
   - `## ` → Level 2
   - `### ` → Level 3
   - `#### ` → Level 4
   - Chinese numbering: "模块一" / "任务一" / "步骤1"

3. Node metadata:
   - `id`: unique identifier (e.g. ch1, ch1-1, ch1-1-1)
   - `title`: heading text
   - `level`: depth
   - `summary`: first paragraph or keywords
   - `status`: learning status (default: not-started)

### ID Mapping

`bookInfo.ts` uses `chX-Y` format IDs for subSections. These are the canonical task IDs used throughout the pipeline. `chapterContent.ts` source entries are mapped to these IDs via the bookLoader.

## Step 2a: Entity Extraction (= shiji-kb SKILL_03a)

**Script**: `scripts/extract-entities.ts`
**Input**: Module text + task IDs
**Output**: `knowledgeMap-entities.json` with refs + occurrences

### Extraction Process

1. For each module, build an LLM prompt with:
   - Module text content
   - Valid task IDs (from bookInfo)
   - Textbook type hint (for entity type guidance)

2. LLM extracts entities with:
   - `id`: unique entity ID
   - `title`: entity name
   - `type`: entity type (string, LLM-selected, see [ENTITY-TYPES.md](ENTITY-TYPES.md))
   - `gloss`: brief definition
   - `desc`: longer description
   - `refs`: array of `{ chapter, title, pn }` — where entity appears
   - `aliases`: alternative names
   - `occurrences`: array of `{ taskId, pn, offset, length }` — precise position for highlighting

3. Post-processing:
   - Deduplicate by ID + title, merge refs
   - Validate refs against valid task IDs
   - Strip entities with empty refs or all-same-chapter refs

### Prompt Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{{bookTitle}}` | Book title |
| `{{moduleTitle}}` | Module heading |
| `{{moduleId}}` | Module ID |
| `{{taskIds}}` | Comma-separated valid task IDs |
| `{{validIds}}` | Full valid chapter ID list |
| `{{moduleText}}` | Raw module text content |

If no `--prompt-file` is provided, a generic fallback prompt is used.

## Step 2b: Entity Disambiguation (= shiji-kb SKILL_03b/03g)

**Script**: `scripts/disambiguate-entities.ts`
**Input**: `knowledgeMap-entities.json`
**Output**: `knowledgeMap-entities-disambiguated.json`

### Disambiguation Process

1. LLM analyzes entity list for:
   - **Merges**: Same entity with different IDs (alias/synonym)
   - **Splits**: Same name but different meanings
2. Merges are applied: refs combined, aliases unioned, count summed
3. If LLM fails, passes through unchanged

## Step 2c: Entity Classification (= shiji-kb SKILL_03h-03k)

**Script**: `scripts/classify-entities.ts`
**Input**: `knowledgeMap-entities-disambiguated.json`
**Output**: `knowledgeMap-entities-classified.json` (with taxonomy)

### Classification Process

1. LLM normalizes `type` (English lowercase) and `culture` (Chinese category) per entity
2. LLM builds a 2-level taxonomy tree: culture → type → count
3. If LLM fails, rule-based taxonomy from existing entity fields

## Step 3: Event Extraction (= shiji-kb SKILL_04)

**Script**: `scripts/extract-events.ts`
**Input**: bookInfo + chapterContent (via bookLoader)
**Output**: `knowledgeMap-events.json`

### Event Structure

Each event includes:
- `id`, `title`, `verb` (action word)
- `participants`: entity IDs/names involved
- `time`, `location` (if available)
- `summary`, `refs`

Events are optional — some textbooks (e.g. pure theory) may yield zero events.

## Step 4a: Relation Building (= shiji-kb SKILL_05b)

**Script**: `scripts/build-relations.ts`
**Input**: Entity list + directory structure
**Output**: Relation edge list JSON

### Relation Types (Base)

| Type | Description | Example |
|------|-------------|---------|
| prerequisite | Learning B requires A first | 基础概念 → 进阶应用 |
| parallel | A and B are sibling tasks | 同一模块下的独立章节 |
| progressive | A is prerequisite step to B | 入门方法 → 高级方法 |
| application | A is tool/material for B | 理论基础 → 实践操作 |

### Extended Types (by textbook category)

- **Literature/Translation**: translation, adaptation, influence, remake, citation
- **Medical**: same 4 base types, semantics oriented to disease-drug-procedure
- **Engineering**: application, progressive, parallel (oriented to tool-process-step)

### Discovery Methods

- **Hierarchy**: parent-child auto-generates containment edges
- **Prerequisite**: extracted from "任务导入" / "知识链接" sections
- **Parallel**: same-module tasks auto-connected
- **Progressive**: inferred from difficulty ordering within module
- **Application**: extracted from "原料" / "工具" cross-references

### Fallback

If LLM fails or produces insufficient relations, rule-based fallback connects:
- Central topic to all entities
- Entities with similar titles
- Entities sharing the same module

## Step 4b: Event Relations (= shiji-kb SKILL_05a)

**Script**: `scripts/build-event-relations.ts`
**Input**: `knowledgeMap-events.json`
**Output**: `knowledgeMap-event-relations.json`

### Event Relation Types

| Type | Description |
|------|-------------|
| temporal | A occurs before B |
| causal | A causes B |
| conditional | A is prerequisite for B |
| concurrent | A and B co-occur |

LLM-based with rule-based fallback (temporal ordering by time field).

## Step 5: Review (= shiji-kb SKILL_03c-03f)

**Script**: `scripts/review-knowledge-map.ts`
**Input**: `knowledgeMap-entities.json` + `knowledgeMap-relations.json`
**Output**: `knowledgeMap-reviewed.json`

### Checks

1. **Duplicate ID detection**: Entities with same ID are auto-merged (refs combined, aliases unioned)
2. **Refs validation**: Entities with empty refs or all refs pointing to same chapter are flagged
3. **Isolated node fix**: Entities with no relations are connected to central topic
4. **Invalid relation cleanup**: Relations referencing non-existent entities are removed

### LLM Deep Review (optional)

If enabled, LLM reviews entity quality:
- Checks for overly generic entities
- Validates entity type consistency
- Suggests merges for near-duplicates

## Step 6: Layout + Serialization (= shiji-kb SKILL_00)

**Script**: `scripts/generate-knowledge-map.ts` (orchestrator)
**Input**: Paradigm + reviewed entities/relations + events + event relations + quality
**Output**: `books/{bookId}/data/knowledgeMap.ts`

Paradigm detection happens in Step 1 (`analyze-structure.ts`). See [PARADIGMS.md](PARADIGMS.md) for full selection rules.

### Layout Algorithms

| Paradigm | Algorithm |
|----------|-----------|
| radial | Polar coordinates, angle by module, radius by level |
| adaptation-flow | Horizontal swim lanes by culture/medium |
| tree | Reingold-Tilford or similar hierarchical layout |
| metro | Linear timeline with branch lines |
| network | Force-directed (d3-force) |
| process-flow | Vertical swim lanes by stage |
| spatial-map | Geographic projection or grid |
| skill-tree | Prerequisite DAG with XP-based positioning |

### Output File

The generated `knowledgeMap.ts` exports:
- `knowledgeMapData`: CanvasData with paradigm, nodes, edges, enrichedEntities, enrichedRelations, events, eventRelations, quality
- Typed TypeScript, directly importable by frontend components

## Step 7: Quality Evaluation (= shiji-kb SKILL_08)

**Script**: `scripts/evaluate-quality.ts`
**Input**: `knowledgeMap-reviewed.json` + `knowledgeMap-events.json` + `knowledgeMap-event-relations.json`
**Output**: `QualityReport` (embedded in CanvasData)

### Metrics

| Metric | Description |
|--------|-------------|
| coverage | Fraction of entities with non-empty refs |
| confidenceScore | Weighted score (0-1) based on data completeness |
| duplicateIds | Count of duplicate entity IDs |
| isolatedNodes | Entities with no relations |
| invalidRelations | Relations referencing non-existent entities |
| avgRefsPerEntity | Average refs per entity |

Quality report is embedded in the output `knowledgeMap.ts` as `quality` field.
