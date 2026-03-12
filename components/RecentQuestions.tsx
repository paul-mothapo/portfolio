'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  timestamp: string;
}

export default function RecentQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('/api/conversations');
        const data = await res.json();
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error('Failed to fetch recent questions:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchQuestions, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || questions.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200">
        Recently Asked to Paul's Buddy
      </h2>
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {questions.map((q, i) => (
            <Link href="/chat" key={q.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group relative flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/80 cursor-pointer"
              >
                <div className="mt-0.5 shrink-0 rounded-full bg-slate-100 p-1.5 dark:bg-slate-900/30">
                  <Sparkles className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm tracking-wide text-zinc-800 dark:text-zinc-200 line-clamp-2">
                    "{q.question}"
                  </p>
                  <div className="mt-2 flex items-center text-[11px] text-zinc-500">
                    <span>
                      {new Date(q.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
