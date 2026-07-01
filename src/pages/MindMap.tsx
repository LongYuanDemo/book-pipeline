import { knowledgeMapData } from '@book/data/knowledgeMap.ts';
import KnowledgeMapOverview from '../components/knowledge-map/KnowledgeMapOverview.tsx';

interface Props {
  onBack: () => void;
}

export default function MindMap({ onBack }: Props) {
  return (
    <div className="flex flex-col bg-stone-50">
      <KnowledgeMapOverview data={knowledgeMapData} onBack={onBack} />
    </div>
  );
}
