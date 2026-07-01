import type { ReactNode } from 'react';

interface Props {
  tag: string;
  title: string;
  publisher: string;
  progress: number;
  progressLabel?: string;
  cta: ReactNode;
}

export default function BookCard({ tag, title, publisher, progress, progressLabel, cta }: Props) {
  return (
    <div className="m-4 rounded-2xl bg-stone-900 text-stone-50 p-5 relative overflow-hidden">
      <div className="relative">
        {/* Title block */}
        <div className="text-2xl font-bold tracking-wide font-serif leading-tight">{title}</div>

        {/* Publisher + author row */}
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="text-stone-300">{tag}</span>
          <span className="text-stone-600">·</span>
          <span className="text-stone-400">{publisher}</span>
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-1 bg-stone-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-300 rounded-full transition-all"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <span className="text-xs text-stone-400">{progressLabel || `已读 ${Math.round(progress * 100)}%`}</span>
        </div>

        {/* CTA */}
        <div className="mt-4">{cta}</div>
      </div>
    </div>
  );
}
