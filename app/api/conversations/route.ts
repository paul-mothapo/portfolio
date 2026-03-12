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

    const conversations = blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      uploadedAt: blob.uploadedAt,
      size: blob.size,
    }));

    return NextResponse.json({ conversations });
  } catch (error: any) {
    console.error('Error listing conversations:', error);
    return NextResponse.json(
      { error: 'Failed to list conversations', details: error.message },
      { status: 500 }
    );
  }
}
