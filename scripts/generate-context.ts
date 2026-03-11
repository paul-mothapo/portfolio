import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_DIR = path.join(__dirname, '../app');
const OUTPUT_FILE = path.join(__dirname, '../lib/context.json');

interface ContextData {
  blogs: Array<{ title: string; slug: string; content: string }>;
  projects: Array<{ title: string; slug: string; content: string }>;
}

function cleanContent(content: string): string {
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

async function generateContext() {
  const context: ContextData = {
    blogs: [],
    projects: [],
  };

  // Extract Blogs
  const blogPDir = path.join(APP_DIR, 'blog/p');
  if (fs.existsSync(blogPDir)) {
    const slugs = fs.readdirSync(blogPDir).filter(f => fs.statSync(path.join(blogPDir, f)).isDirectory());
    for (const slug of slugs) {
      const mdxPath = path.join(blogPDir, slug, 'page.mdx');
      if (fs.existsSync(mdxPath)) {
        const content = fs.readFileSync(mdxPath, 'utf8');
        context.blogs.push({
          title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          slug,
          content: cleanContent(content),
        });
      }
    }
  }

  // Extract Projects (More section)
  const moreDir = path.join(APP_DIR, 'more');
  if (fs.existsSync(moreDir)) {
    const slugs = fs.readdirSync(moreDir).filter(f => fs.statSync(path.join(moreDir, f)).isDirectory());
    for (const slug of slugs) {
      const tsxPath = path.join(moreDir, slug, 'page.tsx');
      if (fs.existsSync(tsxPath)) {
        const content = fs.readFileSync(tsxPath, 'utf8');
        context.projects.push({
          title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          slug,
          content: cleanContent(content),
        });
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(context, null, 2));
  console.log(`Context generated at ${OUTPUT_FILE}`);
}

generateContext().catch(err => {
  console.error('Error generating context:', err);
  process.exit(1);
});
