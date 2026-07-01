import { Play, Clock, Video } from 'lucide-react';
import { videoList } from '@book/data/video.ts';
import { bookData } from '@book/data/bookInfo.ts';

interface Props {
  onBack: () => void;
  onOpen: (id: string) => void;
}

const getDifficultyColor = (d: string) => {
  switch (d) {
    case '简单': return 'bg-emerald-100 text-emerald-700';
    case '中等': return 'bg-orange-100 text-orange-700';
    case '困难': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export default function Checklist({ onBack, onOpen }: Props) {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto pb-24 md:pb-6">
      <div className="min-h-full bg-surface">
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-14 bg-white/95 backdrop-blur border-b border-gray-100">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-gray-100">
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-gray-800">视频清单</h1>
          <div className="w-8" />
        </div>

        <div className="px-4 pt-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">{bookData.title} · 微课视频</h2>
            <p className="text-sm text-gray-500 mt-1">共 {videoList.length} 个教学视频 · 点击查看步骤拆解</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videoList.map((video) => (
              <button
                key={video.id}
                onClick={() => onOpen(video.id)}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden text-left active:scale-95 transition-transform hover:shadow-lg"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15), transparent 50%)'
                  }} />
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(video.difficulty)}`}>
                      {video.difficulty}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-1">{video.module}</p>
                  <h3 className="text-base font-bold text-gray-900">{video.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{video.subtitle}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <Video className="w-3.5 h-3.5" />
                    <span>{video.steps.length} 个步骤拆解</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
