import fs from 'fs';
import path from 'path';
import { BLOG_POSTS_SORTED } from '@/app/data';
import { WEBSITE_URL } from '@/lib/constants';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface HuggingFaceChatResponse {
  choices: Array<{
    message: ChatMessage;
    finish_reason: string;
  }>;
  error?: {
    message: string;
    code?: number | string;
    metadata?: any;
  };
}

const HUGGING_FACE_CHAT_URL = 'https://router.huggingface.co/v1/chat/completions';
const DEFAULT_MODEL = 'deepseek-ai/DeepSeek-V4-Flash';
const SEARCH_RESULT_LIMIT = 5;

interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
}

function getLatestUserMessage(messages: ChatMessage[]): string {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === 'user') {
      return messages[index].content.trim();
    }
  }

  return '';
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x2F;/g, '/');
}

function stripHtml(value: string): string {
  return decodeHtml(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

function normalizeDuckDuckGoUrl(value: string): string {
  const decoded = decodeHtml(value);

  try {
    const url = new URL(decoded);
    const redirectedUrl = url.searchParams.get('uddg');
    return redirectedUrl ? decodeURIComponent(redirectedUrl) : decoded;
  } catch {
    return decoded;
  }
}

async function searchWithBrave(query: string): Promise<WebSearchResult[]> {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;
  if (!apiKey) return [];

  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', String(SEARCH_RESULT_LIMIT));

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-Subscription-Token': apiKey,
    },
  });

  if (!response.ok) return [];

  const data = await response.json();
  const results = Array.isArray(data.web?.results) ? data.web.results : [];

  return results.slice(0, SEARCH_RESULT_LIMIT).map((result: any) => ({
    title: stripHtml(String(result.title || 'Untitled')),
    url: String(result.url || ''),
    snippet: stripHtml(String(result.description || '')),
  })).filter((result: WebSearchResult) => result.url);
}

async function searchWithDuckDuckGo(query: string): Promise<WebSearchResult[]> {
  const url = new URL('https://duckduckgo.com/html/');
  url.searchParams.set('q', query);

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 PaulMothapoPortfolioBot/1.0',
    },
  });

  if (!response.ok) return [];

  const html = await response.text();
  const resultBlocks = html.match(/<div class="result[\s\S]*?<\/div>\s*<\/div>/g) || [];

  return resultBlocks.map((block) => {
    const linkMatch = block.match(/<a rel="nofollow" class="result__a" href="([^"]+)">([\s\S]*?)<\/a>/);
    const snippetMatch = block.match(/<a class="result__snippet"[\s\S]*?>([\s\S]*?)<\/a>/);

    if (!linkMatch) return null;

    return {
      title: stripHtml(linkMatch[2]),
      url: normalizeDuckDuckGoUrl(linkMatch[1]),
      snippet: snippetMatch ? stripHtml(snippetMatch[1]) : '',
    };
  }).filter((result): result is WebSearchResult => Boolean(result?.url)).slice(0, SEARCH_RESULT_LIMIT);
}

async function getWebSearchContext(query: string): Promise<string> {
  if (!query) return '';

  try {
    const results = await searchWithBrave(query).then((braveResults) =>
      braveResults.length ? braveResults : searchWithDuckDuckGo(query)
    );

    if (!results.length) {
      return 'WEB SEARCH: No live web results were found for the latest user message.';
    }

    return `WEB SEARCH RESULTS for the latest user message "${query}":
${results.map((result, index) => `${index + 1}. ${result.title}
   url: ${result.url}
   snippet: ${result.snippet || 'No snippet available.'}`).join('\n')}`;
  } catch (error) {
    console.error('Web search failed:', error);
    return 'WEB SEARCH: Live web lookup failed for this request. Be transparent if current information is needed.';
  }
}

export async function sendChatMessage(
  messages: ChatMessage[],
  model: string = DEFAULT_MODEL
): Promise<HuggingFaceChatResponse> {
  const apiKey = process.env.HF_TOKEN || process.env.HUGGINGFACE_HUB_TOKEN;

  if (!apiKey) {
    throw new Error('HF_TOKEN or HUGGINGFACE_HUB_TOKEN is not configured');
  }

  const blogIndex = BLOG_POSTS_SORTED.map((post) => {
    const absoluteUrl = `${WEBSITE_URL}${post.link}`;
    return `- ${post.title}\n  url: ${post.link} (absolute: ${absoluteUrl})\n  description: ${post.description}`;
  }).join('\n');

  const contextPath = path.join(process.cwd(), 'lib/context.json');
  const latestUserMessage = getLatestUserMessage(messages);
  const webSearchContext = await getWebSearchContext(latestUserMessage);

  const response = await fetch(HUGGING_FACE_CHAT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
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
You also receive live web search results for the user's latest message. Use those results for current facts and general internet questions, cite source URLs when useful, and do not claim that you cannot access the internet when web results are provided.

BLOG INDEX (authoritative):
${blogIndex}

When someone asks about Paul's writing, list relevant posts from the blog index and include their URLs. When referencing a specific post, prefer using the exact URL from the index.

CRITICAL INSTRUCTION: IF AND ONLY IF someone asks you specifically about Paul's residence/where he stays, his family, or his relationship status, you MUST reply ONLY with a randomly chosen one of these two exact markdown strings and nothing else:
- ![look](/gifs/look.gif)
- ![know](/gifs/know.gif)

For all other questions (like "who is this", "what are his political views", etc.), answer normally based on the context or politely decline if you don't know the answer.

${webSearchContext}

${fs.existsSync(contextPath) ? `CONTEXT:\n${fs.readFileSync(contextPath, 'utf8')}` : ''}`,
        },
        ...messages,
      ],
      temperature: 1,
      top_p: 1,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        errorData.message ||
        `Hugging Face API error: ${response.statusText}`
    );
  }

  return response.json();
}
