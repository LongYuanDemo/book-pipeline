import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  tone?: 'green' | 'red' | 'stone' | 'amber';
  className?: string;
}

const toneMap = {
  green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  red: 'bg-red-50 text-red-700 border-red-100',
  stone: 'bg-stone-100 text-stone-500 border-stone-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
};

export default function Pill({ children, tone = 'green', className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${toneMap[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
