export interface SubSection {
  id: string;
  title: string;
  completed: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  section: string;
  status: 'completed' | 'learning' | 'not-started';
  subSections: SubSection[];
  summary: string;
}

export interface BookDataShape {
  title: string;
  chapters: Chapter[];
}

export interface ContentBlock {
  type: string;
  content?: string;
  imageCaption?: string;
  items?: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
  callout?: {
    variant: string;
    title: string;
    body: string;
    brief?: {
      claim: string;
      points: string[];
      example: string;
      unaddressed: string;
    };
  };
}

export interface TaskContent {
  taskId: string;
  title: string;
  module: string;
  blocks: ContentBlock[];
}

export interface ChapterContentShape {
  chapterContents: Record<string, TaskContent>;
}

export type Paradigm =
  | 'radial'
  | 'tree'
  | 'skill-tree'
  | 'metro'
  | 'network'
  | 'adaptation-flow'
  | 'process-flow'
  | 'spatial-map';

export interface EntityRef {
  chapter: string;
  title: string;
  pn: string;
}

export interface EntityOccurrence {
  taskId: string;
  pn: string;
  offset?: number;
  length?: number;
}

export interface CanvasNode {
  id: string;
  type: 'text' | 'group';
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  label?: string;
  color?: string;
  taskId?: string;
  knowledgePoints?: { id: string; type: string; title: string; summary?: string; difficulty?: number; paragraphRefs?: string[] }[];
}

export interface CanvasEdge {
  id: string;
  fromNode: string;
  toNode: string;
  fromSide?: string;
  toSide?: string;
  label?: string;
  color?: string;
  type?: string;
}

export interface AdaptationWork {
  id: string;
  title: string;
  author?: string;
  year?: number | string;
  culture: string;
  medium: string;
  summary?: string;
}

export interface AdaptationRelation {
  from: string;
  to: string;
  type: string;
  label?: string;
  reason?: string;
}

export interface KnowledgeLine {
  id: string;
  name: string;
  color: string;
  stations: { chapter: string; title: string; quote?: string; x: number }[];
}

export interface EnrichedEntity {
  id: string;
  title: string;
  type: string;
  gloss?: string;
  desc?: string;
  summary?: string;
  count?: number;
  refs?: EntityRef[];
  culture?: string;
  medium?: string;
  aliases?: string[];
  occurrences?: EntityOccurrence[];
}

export interface EnrichedRelation {
  from: string;
  to: string;
  type: string;
  label?: string;
  reason?: string;
}

export interface KnowledgeEvent {
  id: string;
  title: string;
  verb: string;
  participants?: string[];
  time?: string;
  location?: string;
  summary?: string;
  refs?: EntityRef[];
}

export interface EventRelation {
  from: string;
  to: string;
  type: 'temporal' | 'causal' | 'conditional' | 'concurrent';
  label?: string;
}

export interface QualityReport {
  entityCount: number;
  relationCount: number;
  eventCount: number;
  coverage: number;
  duplicateIds: number;
  isolatedNodes: number;
  invalidRelations: number;
  emptyRefsEntities: number;
  avgRefsPerEntity: number;
  confidenceScore: number;
  issues: string[];
  suggestions: string[];
}

export interface CanvasData {
  paradigm: Paradigm;
  rationale: string;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  aliases?: { standard: string; variant: string }[];
  adaptationFlow?: {
    works: AdaptationWork[];
    relations: AdaptationRelation[];
    cultureLanes: string[];
    lines?: KnowledgeLine[];
  };
  enrichedEntities?: EnrichedEntity[];
  enrichedRelations?: EnrichedRelation[];
  events?: KnowledgeEvent[];
  eventRelations?: EventRelation[];
  quality?: QualityReport;
}

export interface StructureAnalysisResult {
  bookInfo: BookDataShape;
  chapterContent: ChapterContentShape;
  paradigm: Paradigm;
  rationale: string;
}
