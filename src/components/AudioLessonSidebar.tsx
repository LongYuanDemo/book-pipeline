import { Clock } from 'lucide-react';
import type { AudioLessonData } from '../types/audio';

interface Props {
  lessons: AudioLessonData[];
  activeLessonId: string;
  onSelect: (id: string) => void;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  return `${m} 分钟`;
}

export default function AudioLessonSidebar({ lessons, activeLessonId, onSelect }: Props) {
  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800">课程目录</h2>
        <p className="text-xs text-gray-500 mt-1">课程列表</p>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {lessons.map((lesson, idx) => {
          const isActive = lesson.id === activeLessonId;
          return (
            <button
              key={lesson.id}
              onClick={() => onSelect(lesson.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                isActive ? 'bg-primary-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-xs text-gray-400 mt-0.5">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? 'text-primary-700' : 'text-gray-700'}`}>
                    {lesson.title.replace(/^第\d+课：/, '')}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-400">{formatDuration(lesson.durationSeconds)}</span>
                  </div>
                </div>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
