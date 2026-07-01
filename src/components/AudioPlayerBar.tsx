import { Play, Pause, RotateCcw, RotateCw, Volume2 } from 'lucide-react';

interface Props {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onSeekDelta: (delta: number) => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayerBar({
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeek,
  onSeekDelta,
}: Props) {
  return (
    <div className="bg-stone-900 text-stone-50 px-4 pt-3 pb-5 rounded-t-3xl">
      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={() => onSeekDelta(-10)}
          className="w-9 h-9 flex items-center justify-center text-stone-400 active:text-white"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onTogglePlay}
          className="w-11 h-11 bg-stone-50 text-stone-900 rounded-full flex items-center justify-center active:scale-95 transition-transform"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <button
          onClick={() => onSeekDelta(10)}
          className="w-9 h-9 flex items-center justify-center text-stone-400 active:text-white"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-stone-400 w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="flex-1 h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: '#b91c1c' }}
          />
          <span className="text-xs text-stone-400 w-10">{formatTime(duration)}</span>
        </div>

        <button className="w-9 h-9 flex items-center justify-center text-stone-400 active:text-white">
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
