import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import { chatHistoryStore } from '../utils/chatHistoryStore';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

interface Props {
  selectedText: string;
  chapterTitle: string;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  '这段内容的核心要点是什么？',
  '能更详细地解释一下吗？',
  '这和实际操作有什么关系？',
];

function generateAIResponse(question: string, context: string): string {
  const q = question.toLowerCase();

  if (q.includes('核心') || q.includes('要点') || q.includes('总结')) {
    return `结合你选中的内容"${context.slice(0, 20)}…"，核心要点如下：\n\n• 这是教材中的关键知识点，需要结合实操理解\n• 注意教材强调的具体要求和参数\n• 建议与同模块其他任务对比学习\n\n未涉及：教材未提及常见误区，建议在实际操作中多加留意。`;
  }

  if (q.includes('详细') || q.includes('解释') || q.includes('为什么')) {
    return `关于"${context.slice(0, 20)}…"的深入解释：\n\n• 从原理上看，这个知识点涉及教材核心概念的基本原理\n• 从实践上看，掌握这个要点直接影响实际应用效果\n• 从延伸上看，类似知识点在其他相关领域也有应用\n\n建议结合视频清单中的示范视频一起学习。`;
  }

  if (q.includes('关系') || q.includes('操作') || q.includes('实践')) {
    return `这段内容与实际操作的关联：\n\n• 理论知识是实操的基础，理解原理才能灵活应对\n• 教材中的参数（温度、时间、用量）是经验总结，需严格遵循\n• 建议先理解再动手，避免盲目操作\n\n你可以通过视频清单查看具体操作演示。`;
  }

  return `关于你选中的"${context.slice(0, 20)}…"：\n\n• 这是一个重要的知识点\n• 建议结合上下文和实操经验理解\n• 如有疑问，可以继续追问或查看知识地图中的关联节点`;
}

export default function CanvasChat({ selectedText, chapterTitle, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      text: `我注意到你选中了关于「${selectedText.slice(0, 30)}${selectedText.length > 30 ? '…' : ''}」的内容。有什么想深入了解的？`,
    },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text?: string) => {
    const q = (text || input).trim();
    if (!q) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTimeout(() => {
      const aiText = generateAIResponse(q, selectedText);
      setMessages((m) => [...m, { role: 'ai', text: aiText }]);
      chatHistoryStore.add({
        question: q,
        answer: aiText,
        source: 'canvas',
        chapterTitle,
      });
    }, 500);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-stone-900/20 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Panel — slides up from bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl flex flex-col"
        style={{ height: '65vh', animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-200" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-stone-100">
          <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center flex-shrink-0">
            <Bot size={15} className="text-stone-200" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-stone-900">AI 对话 · {chapterTitle}</p>
            <p className="text-xs text-stone-400">原文优先 · 问题驱动</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center active:bg-stone-100"
          >
            <X size={18} className="text-stone-500" />
          </button>
        </div>

        {/* Selected text context */}
        <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100">
          <div className="flex items-start gap-2">
            <Sparkles size={14} className="text-stone-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
              <span className="font-medium text-stone-600">选中原文：</span>
              {selectedText}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <Bot size={13} className="text-stone-200" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-stone-900 text-stone-50 rounded-br-md'
                    : 'bg-stone-50 border border-stone-100 text-stone-800 rounded-bl-md'
                }`}
              >
                {m.text}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-stone-200 flex items-center justify-center ml-2 flex-shrink-0 mt-0.5">
                  <User size={13} className="text-stone-600" />
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions (only when first AI message) */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="shrink-0 text-xs rounded-full px-3 py-1.5 bg-stone-100 text-stone-600 active:bg-stone-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-2xl px-3 py-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="输入你的问题…"
              className="flex-1 text-sm outline-none bg-transparent text-stone-800"
            />
            <button
              onClick={() => send()}
              className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center active:scale-95 transition-transform"
            >
              <Send size={14} className="text-stone-50" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
