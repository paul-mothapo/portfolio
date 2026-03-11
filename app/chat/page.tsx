import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12">
      <div className="w-full flex flex-col items-center">
        <ChatInterface />
        
        <div className="text-center text-xs text-neutral-500 dark:text-neutral-500 mt-6 w-full">
          Note: This is an AI assistant. While it knows about Paul's work, it may occasionally provide inaccurate information.
        </div>
      </div>
    </div>
  );
}
