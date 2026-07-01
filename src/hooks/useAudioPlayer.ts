import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioPlayerOptions {
  duration: number;
  hasRealAudio?: boolean;
}

export function useAudioPlayer({ duration, hasRealAudio = false }: UseAudioPlayerOptions) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAudioInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || hasRealAudio) {
      clearAudioInterval();
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentTime((t) => {
        const next = Math.min(t + 0.1, duration);
        if (next >= duration) {
          setIsPlaying(false);
        }
        return next;
      });
    }, 100);

    return clearAudioInterval;
  }, [isPlaying, hasRealAudio, duration, clearAudioInterval]);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);
  const seek = useCallback((time: number) => {
    setCurrentTime(Math.max(0, Math.min(time, duration)));
  }, [duration]);
  const seekDelta = useCallback((delta: number) => {
    setCurrentTime((t) => Math.max(0, Math.min(t + delta, duration)));
  }, [duration]);

  return {
    currentTime,
    isPlaying,
    togglePlay,
    seek,
    seekDelta,
  };
}
