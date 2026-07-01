export interface ProgressiveNode {
  id: string;
  label: string;
  category: 'root' | 'section' | 'concept' | 'detail';
}

export interface ProgressiveEdge {
  from: string;
  to: string;
}

export interface TimelineStep {
  time: number;
  nodeIds: string[];
  focusNodeId: string;
  description: string;
}

export interface ProgressiveMermaidData {
  nodes: ProgressiveNode[];
  edges: ProgressiveEdge[];
  timeline: TimelineStep[];
  duration: number;
}

export interface AudioLessonData {
  id: string;
  title: string;
  chapterId: string;
  durationSeconds: number;
  graphData: ProgressiveMermaidData;
}

// === VisualSequence format (server-rendered Mermaid SVGs) ===

export interface DiagramElement {
  content: string;
}

export interface VisualFrame {
  start: number;
  element: {
    diagram?: DiagramElement;
  };
}

export interface VisualSequence {
  audioUrl: string;
  dialog: {
    id: string;
  };
  frames: VisualFrame[];
}

export interface VisualSequenceLesson {
  id: string;
  title: string;
  moduleTitle: string;
  durationSeconds: number;
  audioUrl: string;
  visualSequence: VisualSequence;
}
