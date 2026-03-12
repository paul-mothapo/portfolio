import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ConversationPayload {
  messages: Message[];
  model: string;
}

export async function POST(req: Request) {
  try {
    const { messages, model }: ConversationPayload = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages to save' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const filename = `conversations/${timestamp.replace(/[:.]/g, '-')}.json`;

    const conversation = {
      timestamp,
      model,
      messageCount: messages.length,
      preview: messages[0]?.content?.slice(0, 100) || '',
      messages,
    };

    const blob = await put(filename, JSON.stringify(conversation, null, 2), {
      access: 'private',
      contentType: 'application/json',
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error: any) {
    console.error('Error saving conversation:', error);
    return NextResponse.json(
      { error: 'Failed to save conversation', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'conversations/' });

    const latestBlobs = blobs
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
      .slice(0, 5);

    const recentQuestions = await Promise.all(
      latestBlobs.map(async (blob) => {
        try {
          const res = await fetch(blob.url, {
            headers: {
              Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            },
          });
          if (!res.ok) {
            console.error('Fetch failed for blob:', blob.url, res.status, res.statusText);
            return null;
          }
          const text = await res.text();
          const data = JSON.parse(text);
          // Find the LAST user message in the conversation (most recent question)
          const lastUserMsg = [...(data.messages || [])]
            .reverse()
            .find((m: any) => m.role === 'user');
            
          if (!lastUserMsg) return null;
          
          return {
            id: blob.pathname,
            question: lastUserMsg.content,
            timestamp: blob.uploadedAt,
          };
        } catch (e: any) {
          console.error('Error parsing blob:', blob.url, e.message);
          return null;
        }
      })
    );

    // Filter out nulls and take the top 2 distinct questions
    const validQuestions = recentQuestions
      .filter((q): q is NonNullable<typeof q> => q !== null)
      .reduce((unique: any[], item) => {
        if (!unique.find(i => i.question === item.question)) unique.push(item);
        return unique;
      }, [])
      .slice(0, 2);

    return NextResponse.json({ questions: validQuestions });
  } catch (error: any) {
    console.error('Error listing conversations:', error);
    return NextResponse.json(
      { error: 'Failed to list conversations', details: error.message },
      { status: 500 }
    );
  }
}
