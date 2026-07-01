import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Search, GraduationCap, Layers, ChevronRight, Sparkles } from 'lucide-react';
import { bookData } from '@book/data/bookInfo.ts';
import { chatHistoryStore, type ChatHistoryItem } from '../utils/chatHistoryStore';
import MobileContainer from '../components/design-system/MobileContainer.tsx';
import TopBar from '../components/design-system/TopBar.tsx';

const SKILLS = [
  { name: '内容检索', icon: Search, desc: '查找教材中的知识点' },
  { name: '智能出题', icon: GraduationCap, desc: '生成测验题并批改' },
  { name: '知识讲解', icon: Layers, desc: '知识点深度讲解' },
];

const DEFAULT_HISTORY = [
  { question: `${bookData.chapters[0]?.title || '第一章'}的核心要点是什么？`, date: '今天' },
  { question: `如何理解${bookData.title}的基本概念？`, date: '今天' },
  { question: `${bookData.chapters[0]?.subSections[0]?.title || ''}有哪些关键内容？`, date: '昨天' },
];

function formatTimestamp(ts: number): string {
  const now = Date.now();
  const diff = now - ts;
  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return '今天';
  if (diff < 86400000) return '今天';
  return '昨天';
}

export default function Agent() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    {
      role: 'ai',
      text: `你好！我是《${bookData.title}》学习助手。我可以帮你检索教材内容、讲解知识点、生成测验题。有什么想了解的？`,
    },
  ]);
  const [input, setInput] = useState('');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [historyItems, setHistoryItems] = useState<ChatHistoryItem[]>(chatHistoryStore.get());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return chatHistoryStore.subscribe((items) => setHistoryItems(items));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { role: 'user', text: userText }]);
    setInput('');
    setTimeout(() => {
      const aiText = '让我查找相关内容并为你解答。你可以继续提问，我会调用合适的技能来帮助你。';
      setMessages((m) => [...m, { role: 'ai', text: aiText }]);
      chatHistoryStore.add({
        question: userText,
        answer: aiText,
        source: 'agent',
      });
    }, 600);
  };

  if (chatOpen) {
    return (
      <MobileContainer pcWide fixedHeight>
        <div className="flex flex-col h-full bg-stone-50">
          <div className="flex-shrink-0">
            <TopBar
              title="学习助手"
              onBack={() => setChatOpen(false)}
            />
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={15} className="text-stone-200" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                    m.role === 'user'
                      ? 'bg-stone-900 text-stone-50 rounded-br-md'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-bl-md'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Skill chips + input — fixed at bottom */}
          <div className="flex-shrink-0 px-4 pb-4 pt-2 bg-stone-50 border-t border-stone-200">
            <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar">
              {SKILLS.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setActiveSkill(activeSkill === s.name ? null : s.name)}
                  className={`shrink-0 flex items-center gap-1 text-xs rounded-full px-3 py-1.5 transition-colors ${
                    activeSkill === s.name
                      ? 'bg-stone-900 text-stone-50'
                      : 'bg-white border border-stone-200 text-stone-500 active:bg-stone-100'
                  }`}
                >
                  <s.icon size={12} /> {s.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={activeSkill ? `使用「${activeSkill}」技能提问…` : '输入问题，Agent 自动调用技能…'}
                className="flex-1 text-sm outline-none bg-transparent"
              />
              <button
                onClick={send}
                className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center active:scale-95"
              >
                <Send size={14} className="text-stone-50" />
              </button>
            </div>
          </div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer pcWide>
      <div className="pb-24 md:pb-6">
        <div className="px-4 pt-4">
          {/* 主 Agent 卡片 */}
          <div className="rounded-2xl bg-stone-900 text-stone-50 p-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-stone-800 flex items-center justify-center">
                <Bot size={20} className="text-stone-200" />
              </div>
              <div className="flex-1">
                <div className="text-base font-bold font-serif">学习助手 · {bookData.title}</div>
                <div className="text-xs text-stone-400 mt-0.5">点击下方按钮开始对话，助手会自动调用技能</div>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-stone-100 text-stone-900 rounded-xl py-2.5 text-sm font-semibold active:bg-stone-200"
            >
              <Sparkles size={15} /> 开始对话
            </button>
          </div>

          {/* 最近会话 */}
          <div className="mt-5">
            <div className="text-sm font-bold text-stone-800 mb-2 font-serif">最近会话</div>
            <div className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100">
              {historyItems.length > 0
                ? historyItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setChatOpen(true)}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 active:bg-stone-100"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-stone-800 truncate">{item.question}</div>
                        <div className="text-xs text-stone-400 mt-0.5">
                          {formatTimestamp(item.timestamp)}
                          {item.source === 'canvas' && item.chapterTitle && ` · ${item.chapterTitle}`}
                        </div>
                      </div>
                      <ChevronRight size={15} className="text-stone-300" />
                    </button>
                  ))
                : DEFAULT_HISTORY.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setChatOpen(true)}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 active:bg-stone-100"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-stone-800 truncate">{item.question}</div>
                        <div className="text-xs text-stone-400 mt-0.5">{item.date}</div>
                      </div>
                      <ChevronRight size={15} className="text-stone-300" />
                    </button>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
