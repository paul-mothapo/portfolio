import type { Metadata } from 'next'
import ChatInterface from '@/components/ChatInterface';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: "Paul's Buddy",
  description:
    "Interactive AI assistant trained on Paul Mothapo's portfolio context and writing.",
  path: '/chat',
  noIndex: true,
  keywords: ['AI assistant', 'chat'],
});

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12">
      <div className="w-full flex flex-col items-center">
        <h1 className="sr-only">Chat with Paul&apos;s Buddy</h1>
        <ChatInterface />
        
        <div className="text-center text-xs text-neutral-500 dark:text-neutral-500 mt-6 w-full">
          Note: This is an AI assistant. While it knows about Paul's work, it may occasionally provide inaccurate information.
        </div>
      </div>
    </div>
  );
}
