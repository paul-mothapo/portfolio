import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vm from 'node:vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_DIR = path.join(__dirname, '../app');
const OUTPUT_FILE = path.join(__dirname, '../lib/context.json');
const DATA_TS_PATH = path.join(APP_DIR, 'data.ts');

function cleanContent(content) {
  // Remove imports
  content = content.replace(/import\s+.*?;/g, '');
  // Remove JSX tags but keep content
  content = content.replace(/<[^>]*>?/gm, '');
  // Remove export statements
  content = content.replace(/export\s+(default\s+)?/g, '');
  // Remove common React/Next.js boilerplate
  content = content.replace(/'use\s+client';?/g, '');
  // Remove multi-line comments
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove single line comments
  content = content.replace(/\/\/.*/g, '');
  // Clean up extra whitespace
  content = content.replace(/\n\s*\n/g, '\n').trim();

  return content;
}

function uidToNumber(uid) {
  const match = String(uid).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function extractArrayLiteral(source, exportConstName) {
  const escapedName = exportConstName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const markerRegex = new RegExp(`export\\s+const\\s+${escapedName}\\b`);
  const match = markerRegex.exec(source);
  if (!match) return null;
  const markerIndex = match.index;

  const equalsIndex = source.indexOf('=', markerIndex);
  if (equalsIndex === -1) return null;

  const arrayStart = source.indexOf('[', equalsIndex);
  if (arrayStart === -1) return null;

  let depth = 0;
  let inString = false;
  let stringQuote = '';
  let escaped = false;

  for (let i = arrayStart; i < source.length; i++) {
    const ch = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === '\\') {
        escaped = true;
        continue;
      }
      if (ch === stringQuote) {
        inString = false;
        stringQuote = '';
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringQuote = ch;
      continue;
    }

    if (ch === '[') depth++;
    if (ch === ']') {
      depth--;
      if (depth === 0) {
        return source.slice(arrayStart, i + 1);
      }
    }
  }

  return null;
}

function loadBlogPostsFromAppData() {
  if (!fs.existsSync(DATA_TS_PATH)) return [];
  const source = fs.readFileSync(DATA_TS_PATH, 'utf8');
  const arrayLiteral = extractArrayLiteral(source, 'BLOG_POSTS');
  if (!arrayLiteral) return [];

  const script = new vm.Script(`(${arrayLiteral})`);
  const value = script.runInNewContext({}, { timeout: 100 });
  if (!Array.isArray(value)) return [];

  return value
    .filter((post) => post && typeof post === 'object')
    .filter((post) => typeof post.link === 'string' && typeof post.uid === 'string')
    .slice()
    .sort((a, b) => {
      const diff = uidToNumber(b.uid) - uidToNumber(a.uid);
      if (diff !== 0) return diff;
      return String(a.title || '').localeCompare(String(b.title || ''));
    });
}

async function generateContext() {
  const context = {
    blogs: [],
    projects: [],
  };

  const blogPosts = loadBlogPostsFromAppData();
  for (const post of blogPosts) {
    const slug = post.link.split('/').filter(Boolean).at(-1);
    if (!slug) continue;

    const mdxPath = path.join(APP_DIR, 'blog/p', slug, 'page.mdx');
    if (!fs.existsSync(mdxPath)) continue;

    const content = fs.readFileSync(mdxPath, 'utf8');
    context.blogs.push({
      title: post.title || slug,
      slug,
      uid: post.uid,
      link: post.link,
      description: post.description || '',
      content: cleanContent(content),
    });
  }

  const moreDir = path.join(APP_DIR, 'more');
  if (fs.existsSync(moreDir)) {
    const slugs = fs
      .readdirSync(moreDir)
      .filter((f) => fs.statSync(path.join(moreDir, f)).isDirectory());
    for (const slug of slugs) {
      const tsxPath = path.join(moreDir, slug, 'page.tsx');
      if (!fs.existsSync(tsxPath)) continue;

      const content = fs.readFileSync(tsxPath, 'utf8');
      context.projects.push({
        title: slug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
        slug,
        content: cleanContent(content),
      });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(context, null, 2));
  console.log(`Context generated at ${OUTPUT_FILE}`);
}

generateContext().catch((err) => {
  console.error('Error generating context:', err);
  process.exit(1);
});
