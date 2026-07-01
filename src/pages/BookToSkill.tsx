import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  BookOpen,
  ChevronRight,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import { bookData } from '@book/data/bookInfo.ts';
import MobileContainer from '../components/design-system/MobileContainer.tsx';
import TopBar from '../components/design-system/TopBar.tsx';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface SkillRef {
  chapter?: string;
  topic?: string;
  snippet?: string;
}

interface SkillResponse {
  answer: string;
  refs?: SkillRef[];
}

const SUGGESTED_QUESTIONS = [
  '这本书的核心框架是什么？',
  '第一章有哪些关键知识点？',
  '帮我总结耳鼻咽喉科患者的护理要点',
  '眼科患者护理有哪些重要概念？',
];

export default function BookToSkill() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `你好！我是《${bookData.title}》的技能助手。我已经学习了这本书的全部内容，可以帮你检索知识点、讲解概念、总结章节要点。试试问我一个问题吧。`,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = useCallback(
    async (text?: string) => {
      const userText = (text || input).trim();
      if (!userText || loading) return;

      setShowSuggestions(false);
      setInput('');

      setMessages((m) => [
        ...m,
        { role: 'user', content: userText, timestamp: Date.now() },
      ]);

      setLoading(true);

      try {
        const res = await fetch('/api/book-skill/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: userText,
            bookId: 'eye-ent-nursing',
            history: messages.map((m) => ({
              role: m.role === 'assistant' ? 'assistant' : 'user',
              content: m.content,
            })),
          }),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data: SkillResponse = await res.json();
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content: data.answer,
            timestamp: Date.now(),
          },
        ]);
      } catch (err) {
        // Fallback: try direct LLM call with book context
        try {
          const fallbackRes = await fetch('/api/llm/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [
                {
                  role: 'system',
                  content: `你是一位教材学习助手。用户正在学习《${bookData.title}》。请基于你的知识回答问题，并尽量引用书中的章节结构。书中共有 ${bookData.chapters.length} 章：${bookData.chapters.map((c) => c.title).join('、')}。`,
                },
                ...messages.map((m) => ({
                  role: m.role === 'assistant' ? 'assistant' : 'user',
                  content: m.content,
                })),
                { role: 'user', content: userText },
              ],
            }),
          });

          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            const answer =
              fallbackData.content ||
              fallbackData.choices?.[0]?.message?.content ||
              '抱歉，我暂时无法回答这个问题。';
            setMessages((m) => [
              ...m,
              { role: 'assistant', content: answer, timestamp: Date.now() },
            ]);
          } else {
            throw new Error('fallback failed');
          }
        } catch {
          setMessages((m) => [
            ...m,
            {
              role: 'assistant',
              content:
                '抱歉，技能服务暂时不可用。请稍后再试，或者直接浏览教材内容。',
              timestamp: Date.now(),
            },
          ]);
        }
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [input, loading, messages],
  );

  return (
    <MobileContainer pcWide fixedHeight>
      <div className="flex flex-col h-full bg-stone-50">
        <div className="flex-shrink-0">
          <TopBar title="Book to Skill" onBack={() => window.history.back()} />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <BookOpen size={15} className="text-stone-200" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                  m.role === 'user'
                    ? 'bg-stone-900 text-stone-50 rounded-br-md'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-bl-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center mr-2 flex-shrink-0">
                <BookOpen size={15} className="text-stone-200" />
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-md px-4 py-3">
                <Loader2 size={16} className="text-stone-400 animate-spin" />
              </div>
            </div>
          )}

          {/* Suggested questions */}
          {showSuggestions && messages.length <= 1 && (
            <div className="pt-2 space-y-2">
              <p className="text-xs text-stone-400 px-1">试试这些问题：</p>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="w-full text-left bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 hover:border-stone-300 hover:bg-stone-50 transition-colors flex items-center justify-between group"
                >
                  <span>{q}</span>
                  <ChevronRight
                    size={15}
                    className="text-stone-300 group-hover:text-stone-500 flex-shrink-0"
                  />
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input — fixed at bottom */}
        <div className="flex-shrink-0 px-4 pb-4 pt-2 bg-stone-50 border-t border-stone-200">
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5">
            <MessageSquare size={16} className="text-stone-400 flex-shrink-0" />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="输入问题，技能助手从书中查找答案…"
              className="flex-1 text-sm outline-none bg-transparent"
              disabled={loading}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center active:scale-95 disabled:opacity-30 transition-opacity"
            >
              <Send size={14} className="text-stone-50" />
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
