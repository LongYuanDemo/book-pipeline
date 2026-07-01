import { useState, useRef, useEffect } from 'react';
import { videoList } from '@book/data/video.ts';

interface Props {
  id: string;
  onBack: () => void;
}

export default function ChecklistDetail({ id, onBack }: Props) {
  const video = videoList.find((v) => v.id === id);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setActiveStep(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-80px 0px -50% 0px' }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [video]);

  if (!video) {
    return <div className="p-4">视频未找到</div>;
  }

  const seekTo = (timestamp: string) => {
    if (!videoRef.current) return;
    const [m, s] = timestamp.split(':').map(Number);
    videoRef.current.currentTime = m * 60 + s;
    videoRef.current.play();
  };

  const cnNumbers = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '拾壹', '拾贰', '拾叁', '拾肆'];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="sticky top-0 z-20 flex items-center gap-3 px-4 h-14 bg-white/95 backdrop-blur border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-gray-100">
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold text-gray-900 truncate">{video.title}</h1>
          <p className="text-xs text-gray-400 truncate">{video.module}</p>
        </div>
      </div>

      <div className="bg-black w-full">
        <video
          ref={videoRef}
          src={video.videoUrl}
          controls
          className="w-full max-h-[45vh] object-contain"
          poster={video.thumbnailUrl || undefined}
        />
      </div>

      <div className="flex flex-1">
        <div className="hidden md:block w-48 flex-shrink-0 border-r border-gray-100 bg-white sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="p-3">
            <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wide">步骤导航</p>
            <div className="space-y-1">
              {video.steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => {
                    stepRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    seekTo(step.timestamp);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeStep === idx ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs text-gray-400 mr-1">{cnNumbers[idx]}</span>
                  {step.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6 space-y-8 pb-24 md:pb-8">
            {video.steps.map((step, idx) => (
              <div
                key={step.id}
                data-idx={idx}
                ref={(el) => { stepRefs.current[idx] = el; }}
                className="scroll-mt-20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-stone-800 text-white flex items-center justify-center font-serif text-lg flex-shrink-0">
                    {cnNumbers[idx]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    <button
                      onClick={() => seekTo(step.timestamp)}
                      className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                    >
                      ▶ 跳转到 {step.timestamp}
                    </button>
                  </div>
                </div>

                {step.imageUrl && (
                  <div className="rounded-xl overflow-hidden mb-3 border border-gray-100">
                    <img src={step.imageUrl} alt={step.title} className="w-full" />
                  </div>
                )}

                <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>

                {step.tips && (
                  <div className="mt-3 px-4 py-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                    <p className="text-xs text-amber-800 leading-relaxed">
                      <span className="font-bold">要点 · </span>
                      {step.tips}
                    </p>
                  </div>
                )}

                {idx < video.steps.length - 1 && (
                  <div className="mt-6 border-b border-gray-100" />
                )}
              </div>
            ))}

            <div className="text-center py-8 text-gray-400 text-sm">
              — 步骤拆解完毕 —
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
