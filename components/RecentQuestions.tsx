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

const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;
const CACHE_KEY = 'recent-questions-cache';

type CachedQuestions = {
  questions: Question[];
  fetchedAt: number;
};

export default function RecentQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const readCache = (): CachedQuestions | null => {
      try {
        const raw = window.localStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as CachedQuestions;
        if (!Array.isArray(parsed.questions) || typeof parsed.fetchedAt !== 'number') {
          return null;
        }

        return parsed;
      } catch {
        return null;
      }
    };

    const writeCache = (cachedQuestions: Question[]) => {
      try {
        window.localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            questions: cachedQuestions,
            fetchedAt: Date.now(),
          } satisfies CachedQuestions),
        );
      } catch {
        // Ignore storage failures and fall back to a normal fetch cycle.
      }
    };

    async function fetchQuestions() {
      try {
        const res = await fetch('/api/conversations');
        const data = await res.json();
        if (!cancelled && data.questions) {
          setQuestions(data.questions);
          writeCache(data.questions);
        }
      } catch (err) {
        console.error('Failed to fetch recent questions:', err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    const scheduleNextFetch = (delayMs: number) => {
      timeoutId = setTimeout(() => {
        void fetchQuestions().finally(() => {
          if (!cancelled) {
            scheduleNextFetch(EIGHT_HOURS_MS);
          }
        });
      }, delayMs);
    };

    const cached = readCache();
    const now = Date.now();

    if (cached) {
      setQuestions(cached.questions);
      setLoading(false);
    }

    const hasFreshCache = cached && now - cached.fetchedAt < EIGHT_HOURS_MS;
    if (hasFreshCache) {
      scheduleNextFetch(cached.fetchedAt + EIGHT_HOURS_MS - now);
    } else {
      void fetchQuestions().finally(() => {
        if (!cancelled) {
          scheduleNextFetch(EIGHT_HOURS_MS);
        }
      });
    }

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
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
