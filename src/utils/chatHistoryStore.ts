export interface ChatHistoryItem {
  id: string;
  question: string;
  answer: string;
  source: 'canvas' | 'agent';
  chapterTitle?: string;
  timestamp: number;
}

type Listener = (items: ChatHistoryItem[]) => void;

let history: ChatHistoryItem[] = [];
const listeners: Set<Listener> = new Set();

export const chatHistoryStore = {
  get(): ChatHistoryItem[] {
    return [...history];
  },

  add(item: Omit<ChatHistoryItem, 'id' | 'timestamp'>): void {
    const newItem: ChatHistoryItem = {
      ...item,
      id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    };
    history = [newItem, ...history].slice(0, 20);
    listeners.forEach((l) => l(history));
  },

  clear(): void {
    history = [];
    listeners.forEach((l) => l(history));
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
