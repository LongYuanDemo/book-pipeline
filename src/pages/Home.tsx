import { BookOpen, Layers, Headphones, Network, ClipboardList } from 'lucide-react';
import { bookData, TOOLS, type ViewType } from '@book/data/bookInfo.ts';
import MobileContainer from '../components/design-system/MobileContainer.tsx';
import BookCard from '../components/design-system/BookCard.tsx';
import ToolGrid from '../components/design-system/ToolGrid.tsx';
import ChapterList from '../components/design-system/ChapterList.tsx';

interface Props {
  onNavigate: (view: ViewType) => void;
  openTask: (taskId: string) => void;
}

const toolMeta: Record<string, { color: string; bg: string }> = {
  anki: { color: 'text-stone-700', bg: 'bg-stone-100' },
  audio: { color: 'text-stone-700', bg: 'bg-stone-100' },
  mindmap: { color: 'text-stone-700', bg: 'bg-stone-100' },
  checklist: { color: 'text-stone-700', bg: 'bg-stone-100' },
};

const toolIconMap: Record<string, typeof Layers> = {
  anki: Layers,
  audio: Headphones,
  mindmap: Network,
  checklist: ClipboardList,
};

export default function Home({ onNavigate, openTask }: Props) {
  const completedChapters = bookData.chapters.filter((c) => c.status === 'completed').length;
  const progress = bookData.totalChapters > 0 ? completedChapters / bookData.totalChapters : 0;
  const currentChapter = bookData.chapters.find((c) => c.status === 'learning') || bookData.chapters[0];

  const tools = TOOLS.map((tool) => ({
    id: tool.key,
    name: tool.label,
    sub: toolSub(tool.key),
    icon: toolIconMap[tool.key] || Layers,
    ...toolMeta[tool.key],
  }));

  return (
    <MobileContainer pcWide>
      <div className="pb-24 md:pb-6 md:p-6">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="md:space-y-6">
            <BookCard
              tag={bookData.publisher}
              title={`《${bookData.title}》`}
              publisher={bookData.author}
              progress={progress}
              progressLabel={`已学 ${completedChapters}/${bookData.totalChapters} 章`}
              cta={
                <button
                  onClick={() => onNavigate('agent')}
                  className="w-full flex items-center justify-center gap-2 bg-stone-100 text-stone-900 rounded-xl py-2.5 text-sm font-semibold transition-colors active:bg-stone-200"
                >
                  <BookOpen size={16} /> 继续学习 · {currentChapter?.title || '第1章'}
                </button>
              }
            />

            <ToolGrid
              tools={tools}
              onClick={(id) => {
                onNavigate(id as ViewType);
              }}
            />
          </div>

          <div className="md:mt-0">
            <ChapterList chapters={bookData.chapters} onOpenTask={openTask} />
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}

function toolSub(key: string): string {
  switch (key) {
    case 'anki':
      return '闪卡复习 · 随堂测验';
    case 'audio':
      return '音频讲解 · 流程图同步';
    case 'mindmap':
      return '知识结构可视化';
    case 'checklist':
      return '视频步骤拆解';
    default:
      return '';
  }
}
