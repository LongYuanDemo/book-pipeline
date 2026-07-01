/**
 * 知识地图流水线入口
 *
 * 7-step pipeline (aligned with shiji-kb skill architecture):
 *   Step 1: analyze-structure  — structure parsing + paradigm detection
 *   Step 2: extract-entities   — LLM entity extraction
 *   Step 2b: disambiguate      — LLM entity disambiguation
 *   Step 2c: classify           — LLM entity classification + taxonomy
 *   Step 3: extract-events      — LLM event extraction + verb annotation
 *   Step 4: build-relations     — LLM entity relations
 *   Step 4b: build-event-relations — event temporal/causal relations
 *   Step 5: review              — multi-pass review + auto-fix
 *   Step 7: evaluate-quality    — coverage/correctness/confidence scoring
 */

export { analyzeStructure } from './analyze-structure.ts';

export { extractEntities, saveEntities, type KnowledgeEntity, type EntityExtractionResult } from './extract-entities.ts';
export { disambiguateEntities, saveDisambiguated, type DisambiguationResult } from './disambiguate-entities.ts';
export { classifyEntities, saveClassified, type ClassificationResult, type TaxonomyNode } from './classify-entities.ts';

export { extractEvents, saveEvents, type EventExtractionResult } from './extract-events.ts';

export { buildRelations, saveRelations, type KnowledgeRelation, type RelationResult, type RelationType } from './build-relations.ts';
export { buildEventRelations, saveEventRelations, type EventRelationResult } from './build-event-relations.ts';

export { reviewKnowledgeMap, saveReviewed, type ReviewResult } from './review-knowledge-map.ts';

export { evaluateQuality } from './evaluate-quality.ts';

export type {
  CanvasData, CanvasNode, CanvasEdge, Paradigm,
  EnrichedEntity, EnrichedRelation,
  KnowledgeEvent, EventRelation, QualityReport,
  BookDataShape, ChapterContentShape, StructureAnalysisResult,
} from './types.ts';
