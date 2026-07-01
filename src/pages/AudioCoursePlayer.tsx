import { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  MoreVertical,
  ChevronLeft,
  Headphones,
} from 'lucide-react';
import { audioCourseLessons } from '@book/data/audioCourse';
import { bookData } from '@book/data/bookInfo.ts';
import { MermaidImage } from '../components/MermaidImage';
import type { VisualFrame } from '../types/audio';

interface Props {
  lessonId: string;
  onBack: () => void;
  onChangeLesson: (id: string) => void;
}


function findCurrentDiagram(frames: VisualFrame[], currentTime: number): string {
  let result = '';
  for (const frame of frames) {
    if (currentTime >= frame.start) {
      if (frame.element.diagram) {
        result = frame.element.diagram.content;
      }
    }
  }
  return result;
}

export default function AudioCoursePlayer({ lessonId, onBack }: Props) {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isDraggingRef = useRef(false);
  const seekPendingRef = useRef(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDiagram, setCurrentDiagram] = useState('');
  const [actualDuration, setActualDuration] = useState(0);

  const lesson = useMemo(
    () => audioCourseLessons.find((l) => l.id === lessonId) || audioCourseLessons[0],
    [lessonId]
  );

  const frames = lesson.visualSequence.frames;
  const duration = actualDuration || lesson.durationSeconds;

  // Initialize with first diagram
  useEffect(() => {
    setCurrentDiagram(findCurrentDiagram(frames, 0));
  }, [frames]);

  const handleTimeUpdate = useCallback(() => {
    if (isDraggingRef.current || seekPendingRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;
    const t = audio.currentTime;
    // Guard: if we just seeked to a non-zero position but audio.currentTime is 0,
    // the seek likely failed. Skip this update to prevent slider jumping to start.
    if (seekTargetRef.current !== null && t < 0.5 && seekTargetRef.current > 1) {
      return;
    }
    seekTargetRef.current = null;
    setCurrentTime(t);
    setSliderValue(t);
    const diagram = findCurrentDiagram(frames, t);
    setCurrentDiagram((prev) => (diagram && diagram !== prev ? diagram : prev));
  }, [frames]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const seekTargetRef = useRef<number | null>(null);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    seekPendingRef.current = true;
    seekTargetRef.current = time;
    setSliderValue(time);
    setCurrentTime(time);
    const diagram = findCurrentDiagram(frames, time);
    setCurrentDiagram(diagram);
    try {
      audio.currentTime = time;
    } catch {
      seekPendingRef.current = false;
      seekTargetRef.current = null;
    }
  }, [frames]);

  const handleSeeked = useCallback(() => {
    seekPendingRef.current = false;
    isDraggingRef.current = false;
    // Don't reset slider/time here — let handleTimeUpdate handle it naturally.
    // If the seek failed (audio.currentTime still 0), this prevents the slider
    // from jumping back to the start.
  }, []);

  const handleFrameClick = useCallback(() => {
    togglePlay();
  }, [togglePlay]);

  return (
    <div className="min-h-screen bg-[#F9F5F0] p-2 md:p-6 lg:p-8 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <span className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">数智教材2.0</span>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-white/70 backdrop-blur rounded-full px-4 py-1.5 text-sm text-gray-700 shadow-sm">
          <span>{bookData.title}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{lesson.title}</span>
        </div>

        {/* Mobile: show lesson title inline */}
        <div className="md:hidden flex items-center gap-2 text-xs text-gray-500 truncate max-w-[140px]">
          <span className="truncate">{lesson.title}</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center text-gray-600">
            <Headphones className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Main Card */}
      <main className="max-w-6xl mx-auto bg-white rounded-[24px] md:rounded-[32px] shadow-[0_4px_40px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Content - VisualSequence Display */}
        <div className="relative h-[320px] md:h-[520px] flex flex-col overflow-hidden">
          {!started ? (
            <div className="flex-1 flex items-center justify-center">
              <button
                onClick={() => { setStarted(true); togglePlay(); }}
                className="px-8 py-3.5 bg-white border border-indigo-200 text-gray-800 rounded-xl text-sm font-medium shadow-sm hover:bg-indigo-50 hover:border-indigo-300 active:scale-[0.98] transition-all"
              >
                Click here to start
              </button>
            </div>
          ) : (
            <div className="vsd-root flex-1" onClick={handleFrameClick}>
              <div className="vsd-frame">
                <div className="vsd-diagram-outer">
                  <MermaidImage mermaidCode={currentDiagram} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Audio Player */}
        <div className="px-3 pb-3 md:px-8 md:pb-8">
          <div className="bg-[#F3F4F6] rounded-full px-2 md:px-4 py-2 md:py-3 flex items-center gap-1.5 md:gap-4">
            <button
              onClick={() => { setStarted(true); togglePlay(); }}
              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-gray-900 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
            </button>

            <span className="text-[10px] md:text-sm text-gray-600 tabular-nums w-16 md:w-24 shrink-0">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <input
              type="range"
              min={0}
              max={duration}
              value={sliderValue}
              onPointerDown={() => { isDraggingRef.current = true; }}
              onPointerUp={() => {
                // Don't clear isDraggingRef here; handleSeeked will clear it
                // after the audio seek completes, preventing timeupdate from
                // resetting the slider with stale audio.currentTime.
              }}
              onChange={(e) => {
                setStarted(true);
                const v = Number(e.target.value);
                setSliderValue(v);
                seek(v);
              }}
              className="flex-1 h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: '#10B981' }}
            />

            <button className="hidden md:flex w-9 h-9 items-center justify-center text-gray-500 hover:text-gray-700">
              <Volume2 className="w-4 h-4" />
            </button>
            <button className="hidden md:flex w-9 h-9 items-center justify-center text-gray-500 hover:text-gray-700">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Hidden audio element for real audio playback */}
      <audio
        ref={audioRef}
        src={lesson.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onSeeked={handleSeeked}
        onLoadedMetadata={(e) => setActualDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />
    </div>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
