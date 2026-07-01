import { ChevronLeft, Settings } from 'lucide-react';

interface Props {
  title: string;
  onBack: () => void;
  showSettings?: boolean;
}

export default function BackButton({ title, onBack, showSettings = false }: Props) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-14 bg-white/95 backdrop-blur border-b border-gray-100">
      <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-gray-100">
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <h1 className="text-base font-semibold text-gray-800">{title}</h1>
      {showSettings ? (
        <button className="p-2 -mr-2 rounded-full active:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-700" />
        </button>
      ) : (
        <div className="w-9" />
      )}
    </div>
  );
}
