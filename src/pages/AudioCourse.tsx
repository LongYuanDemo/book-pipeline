import { Play, Clock, BookOpen, Headphones } from 'lucide-react';
import { bookData } from '@book/data/bookInfo.ts';
import { audioCourseLessons } from '@book/data/audioCourse';
import type { VisualSequenceLesson } from '../types/audio';
import MobileContainer from '../components/design-system/MobileContainer.tsx';
import TopBar from '../components/design-system/TopBar.tsx';
import Pill from '../components/design-system/Pill.tsx';

interface Props {
  onBack: () => void;
  onOpenPlayer: (id: string) => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioCourse({ onBack, onOpenPlayer }: Props) {
  const lessons: (VisualSequenceLesson & { duration: string; progress: number })[] =
    audioCourseLessons.map((l) => ({
      ...l,
      duration: formatDuration(l.durationSeconds),
      progress: 0,
    }));
  const totalDuration = lessons.reduce((acc, l) => acc + l.durationSeconds, 0);
  const formatTotal = () => formatDuration(totalDuration);

  return (
    <MobileContainer pcWide>
      <div className="flex flex-col h-full bg-stone-50 pb-20 md:pb-6">
        <TopBar title="AI 音频课" onBack={onBack} right={<Pill tone="red">可听 + 可视</Pill>} />

        <div className="px-4 pt-4 md:px-6">
          {/* Header Card */}
          <div className="relative bg-gradient-to-br from-stone-800 to-stone-950 rounded-2xl p-5 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8" />
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold font-serif">{bookData.title}音频课程</h2>
              <p className="text-sm text-white/80 mt-1">从基础概念到评估方法的系统讲解</p>
              <p className="text-xs text-white/70 mt-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                共 {lessons.length} 课 · 总时长 {formatTotal()}
              </p>
            </div>
          </div>

          {/* List */}
          <div className="mt-5">
            <h3 className="text-sm font-bold text-stone-900 mb-3 font-serif">课程目录</h3>
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
              {lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
                >
                  <div className="flex items-center px-3 py-3">
                    <button
                      onClick={() => onOpenPlayer(lesson.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full active:bg-stone-100 mr-2"
                    >
                      <Headphones className="w-4 h-4 text-stone-500" />
                    </button>
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => onOpenPlayer(lesson.id)}
                    >
                      <p className="text-sm font-medium text-stone-900">
                        第{idx + 1}课：{lesson.title.replace(/^第\d+课：/, '')}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span className="text-xs text-stone-400">{lesson.duration}</span>
                        <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-stone-900 rounded-full"
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
                        {lesson.progress > 0 && (
                          <span className="text-[10px] text-stone-400">{lesson.progress}%</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenPlayer(lesson.id)}
                      className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center text-white active:scale-95 transition-transform ml-2"
                    >
                      <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
