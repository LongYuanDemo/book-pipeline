export interface VideoStep {
  id: string;
  title: string;
  timestamp: string;
  imageUrl: string;
  description: string;
  tips?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  difficulty: '简单' | '中等' | '困难';
  module: string;
  steps: VideoStep[];
}

export const videoList: VideoItem[] = [

];
