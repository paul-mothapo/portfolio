import fs from 'fs';
import path from 'path';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterResponse {
  choices: Array<{
    message: ChatMessage;
    finish_reason: string;
  }>;
  error?: {
    message: string;
    code: number;
    metadata?: any;
  };
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'stepfun/step-3.5-flash:free';

export async function sendChatMessage(messages: ChatMessage[], model: string = DEFAULT_MODEL): Promise<OpenRouterResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://paul-mothapo.vercel.app',
      'X-Title': 'Paul Mothapo Portfolio',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: `You are Paul's Buddy, a helpful and friendly assistant on his portfolio website. 
You have access to Paul's blogs and projects. Use this information to answer questions about his work, expertise, and thoughts.
Be professional yet approachable, friendly, and concise.

${fs.existsSync(path.join(process.cwd(), 'lib/context.json')) ? `CONTEXT:
${fs.readFileSync(path.join(process.cwd(), 'lib/context.json'), 'utf8')}` : ''}
`,
        },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenRouter API error: ${response.statusText}`);
  }

  return response.json();
}
