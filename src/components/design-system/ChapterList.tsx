import { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen } from 'lucide-react';

interface SubSection {
  id: string;
  title: string;
  completed: boolean;
}

interface Chapter {
  id: string;
  title: string;
  status: 'completed' | 'learning' | 'not-started';
  subSections: SubSection[];
}

interface Props {
  chapters: Chapter[];
  onOpenTask?: (taskId: string) => void;
}

export default function ChapterList({ chapters, onOpenTask }: Props) {
  const [expanded, setExpanded] = useState<string | null>(
    chapters.find((c) => c.status === 'learning')?.id || chapters[0]?.id || null
  );

  const statusMeta = {
    completed: { dot: 'bg-stone-400', label: '已学完' },
    learning: { dot: 'bg-amber-500', label: '学习中' },
    'not-started': { dot: 'bg-stone-300', label: '未开始' },
  };

  return (
    <div className="px-4 mt-6">
      <div className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-1.5 font-serif">
        章节目录
      </div>
      <div className="space-y-2">
        {chapters.map((chapter, idx) => {
          const isExpanded = expanded === chapter.id;
          const meta = statusMeta[chapter.status];
          return (
            <div
              key={chapter.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : chapter.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-stone-50"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-600">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-800 truncate">{chapter.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                    <span className="text-xs text-stone-400">{meta.label}</span>
                    <span className="text-xs text-stone-400">· {chapter.subSections.length} 个任务</span>
                  </div>
                </div>
                {isExpanded
                  ? <ChevronDown size={16} className="text-stone-400" />
                  : <ChevronRight size={16} className="text-stone-400" />}
              </button>

              {isExpanded && (
                <div className="border-t border-stone-200">
                  {chapter.subSections.map((sub) => (
                    <button
                      key={sub.id}
                      className="w-full flex items-center gap-3 py-2.5 px-4 text-left active:bg-stone-50 border-b border-stone-100 last:border-b-0"
                      onClick={() => onOpenTask?.(sub.id)}
                    >
                      <BookOpen size={14} className="text-stone-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-stone-800 truncate">{sub.title}</span>
                      <ChevronRight size={14} className="text-stone-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
