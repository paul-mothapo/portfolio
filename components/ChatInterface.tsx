'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, User, Brain, Loader2, ChevronDown, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  MorphingPopover, 
  MorphingPopoverTrigger, 
  MorphingPopoverContent 
} from '@/components/motion-primitives/morphing-popover';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MODELS = [
  { id: 'stepfun/step-3.5-flash:free', name: 'Step 3.5 Flash' },
  { id: 'arcee-ai/trinity-large-preview:free', name: 'Trinity Large' },
  { id: 'nvidia/nemotron-nano-12b-v2-vl:free', name: 'Nemotron Nano' },
  { id: 'z-ai/glm-4.5-air:free', name: 'GLM 4.5 Air' },
];

const NICKNAMES = [
  'Stranger',
  'Introvert',
  'Fellow Human',
  'Time Traveler',
  'Code Wizard',
  'Pyscho',
  'Legend',
  'Scholar',
  'Explorer',
  'Captain',
  'Genius',
  'Lunatic',
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNickname(NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)]);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  };

  const scrollToBraintom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBraintom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          model: selectedModel
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setMessages((prev) => [...prev, data.choices[0].message]);
      } else {
        throw new Error(data.details || 'Invalid response from API');
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${error.message || "I'm having trouble connecting right now. Please try again later."}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[700px] w-full mx-auto border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm relative z-10">
      <div className="relative z-[60] p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-between rounded-t-2xl">

        <MorphingPopover 
          className="justify-start" 
          open={isPopoverOpen} 
          onOpenChange={setIsPopoverOpen}
        >
          <MorphingPopoverTrigger className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>{MODELS.find(m => m.id === selectedModel)?.name}</span>
            <ChevronDown className="w-3 h-3 opacity-50" />
          </MorphingPopoverTrigger>
          <MorphingPopoverContent className="z-[1000] w-56 p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 px-2 py-1 uppercase tracking-wider">Select Model</p>
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id);
                    setIsPopoverOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-xs rounded-xl transition-all",
                    selectedModel === model.id 
                      ? "bg-neutral-100 dark:bg-neutral-800 font-medium text-neutral-900 dark:text-neutral-50" 
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  )}
                >
                  {model.name}
                  {selectedModel === model.id && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                </button>
              ))}
            </div>
          </MorphingPopoverContent>
        </MorphingPopover>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60"
            >
              <div>
                <p className="text-sm font-medium opacity-80">{getGreeting()}, {nickname}!</p>
                <p className="text-xs mt-1 opacity-60">I'm Paul's Buddy. Ask me about Paul, science, maths, engineering, or anything fun!</p>
              </div>
            </motion.div>
          ) : (
            messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === 'user' ? "bg-neutral-200 dark:bg-neutral-800" : "bg-slate-100 dark:bg-slate-500/30"
                )}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                </div>
                <div className={cn(
                  "rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "p-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900" 
                    : "px-3 py-1 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 dark:border-neutral-800"
                )}>
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none 
                      prose-p:leading-relaxed prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800 
                      prose-pre:p-2 prose-pre:rounded-lg prose-code:text-blue-600 dark:prose-code:text-blue-400
                      prose-headings:text-sm prose-headings:font-semibold prose-headings:mb-2 prose-headings:mt-4
                      prose-ul:my-2 prose-li:my-0">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mr-auto"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 italic text-sm">
              Thinking...
            </div>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="w-full pl-4 pr-12 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400/50 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-full bg-slate-800 dark:bg-slate-500 text-white disabled:opacity-50 hover:bg-slate-700 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
