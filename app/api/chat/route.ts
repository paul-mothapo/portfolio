import { NextResponse } from 'next/server';
import { sendChatMessage } from '@/lib/huggingface';

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();

    const data = await sendChatMessage(messages, model);
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in chat route:', error);
    
    const errorMessage = error.message || 'Internal Server Error';
    const status = error.message?.includes('not configured') ? 500 : 400;

    return NextResponse.json(
      { error: 'Chat Service Error', details: errorMessage },
      { status }
    );
  }
}
