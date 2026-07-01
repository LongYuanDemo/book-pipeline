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
  sourceModuleId?: string;
}

export interface AnkiCard {
  id: string;
  chapterId: string;
  chapter: string;
  question: string;
  answer: string;
  keyPoint: string;
}

export interface AudioLesson {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  progress: number;
  description: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ChecklistStep {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  title: string;
  category: string;
  difficulty: '简单' | '中等' | '困难';
  itemCount: number;
  duration: string;
  steps: ChecklistStep[];
}

export interface MindMapNode {
  id: string;
  label: string;
  status: 'completed' | 'learning' | 'not-started';
  angle: number;
}

export interface BookData {
  title: string;
  publisher: string;
  author: string;
  isbn: string;
  totalChapters: number;
  completedChapters: number;
  readMinutes: number;
  totalMinutes: number;
  streakDays: number;
  chapters: Chapter[];
  ankiCards: AnkiCard[];
  audioLessons: AudioLesson[];
  checklists: Checklist[];
  mindMapNodes: MindMapNode[];
}

export const bookData: BookData = {
  title: '急危重症护理学',
  publisher: '',
  author: '',
  isbn: '',
  totalChapters: 4,
  completedChapters: 0,
  readMinutes: 0,
  totalMinutes: 72,
  streakDays: 0,
  chapters: [
    {
      id: 'ch1',
      title: '第一章 急危重症护理学基础知识',
      section: '模块一',
      status: 'learning',
      summary: '急危重症护理学基础以急救医疗服务体系为框架，涵盖院前急救、急诊科救护与重症监护，如院前心肺复苏。未涉及具体操作细节。',
      sourceModuleId: 'module2',
      subSections: [
        { id: 'ch1-1', title: '第一节 急危重症护理学概况', completed: false },
        { id: 'ch1-2', title: '第二节 急救医疗服务体系', completed: false },
        { id: 'ch1-3', title: '第三节 院前急救', completed: false },
        { id: 'ch1-4', title: '第四节 急诊科救护', completed: false },
        { id: 'ch1-5', title: '第五节 重症监护', completed: false },
      ],
    },
    {
      id: 'ch2',
      title: '第二章 常用救护技术',
      section: '模块二',
      status: 'not-started',
      summary: '常用救护技术是急救核心技能，涵盖心肺复苏、气道管理、创伤处理等要点。例如胸外按压。未涉及具体药物使用。',
      sourceModuleId: 'module3',
      subSections: [
        { id: 'ch2-1', title: '第一节 心肺脑复苏术', completed: false },
        { id: 'ch2-2', title: '第二节 通畅气道术', completed: false },
        { id: 'ch2-3', title: '第三节 创伤急救技术', completed: false },
        { id: 'ch2-4', title: '第四节 呼吸支持技术', completed: false },
        { id: 'ch2-5', title: '第五节 洗胃术', completed: false },
        { id: 'ch2-6', title: '第六节 常用的重症监护技术', completed: false },
      ],
    },
    {
      id: 'ch3',
      title: '第三章 常见急危重症患者的救护',
      section: '模块三',
      status: 'not-started',
      summary: '本章聚焦常见急危重症的救护原则与方法，涵盖急性中毒、环境损伤及常见急症的现场处理，如一氧化碳中毒的急救，未涉及心脑血管急症的详细诊疗。',
      sourceModuleId: 'module4',
      subSections: [
        { id: 'ch3-1', title: '第一节 急性中毒患者的救护', completed: false },
        { id: 'ch3-2', title: '第二节 环境及理化因素损伤患者的救护', completed: false },
        { id: 'ch3-3', title: '第三节 常见急症患者的救护', completed: false },
      ],
    },
    {
      id: 'ch4',
      title: '第四章 灾害事故的现场救护',
      section: '模块四',
      status: 'not-started',
      summary: '灾害现场救护核心是快速检伤分类与精准施救，包括概述灾害特点、检伤分类原则、常见灾害现场救护方法。例如地震中按红黄绿黑分级处理。未涉及心理干预。',
      sourceModuleId: 'module5',
      subSections: [
        { id: 'ch4-1', title: '第一节 概述', completed: false },
        { id: 'ch4-2', title: '第二节 灾害现场检伤分类', completed: false },
        { id: 'ch4-3', title: '第三节 常见灾害事故的现场救护', completed: false },
      ],
    }
  ],
  ankiCards: [],
  audioLessons: [],
  checklists: [],
  mindMapNodes: [
    { id: 'ch1', label: '第一章 急危重症护理学基础知识', status: 'learning' as const, angle: 0 },
    { id: 'ch2', label: '第二章 常用救护技术', status: 'not-started' as const, angle: 90 },
    { id: 'ch3', label: '第三章 常见急危重症患者的救护', status: 'not-started' as const, angle: 180 },
    { id: 'ch4', label: '第四章 灾害事故的现场救护', status: 'not-started' as const, angle: 270 },
  ],
};

export type ViewType =
  | 'home'
  | 'anki'
  | 'audio'
  | 'audio-player'
  | 'mindmap'
  | 'checklist'
  | 'checklist-detail'
  | 'chapter-content'
  | 'agent'
  | 'profile';

export type ToolType = 'anki' | 'audio' | 'mindmap' | 'checklist';

export const MODULES = {
  audioCourse: true,
  video: false,
  knowledgeMap: true,
  anki: true,
  chapterContent: true,
  agent: true,
} as const;

export const TOOLS: { key: ToolType; label: string; icon: string }[] = [
  { key: 'anki', label: 'Anki卡片', icon: '🗂️' },
  { key: 'audio', label: '音频课', icon: '🎧' },
  { key: 'mindmap', label: '知识地图', icon: '🗺️' },
  ...(MODULES.video ? [{ key: 'checklist' as ToolType, label: '视频清单', icon: '🎬' }] : []),
];

export default bookData;
