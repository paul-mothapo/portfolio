import fs from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import type { Metadata } from 'next'
import ThoughtsLibrary from '@/components/ThoughtsLibrary'
import { JsonLd, buildCollectionPageSchema, createMetadata } from '@/lib/seo'

type PdfEntry = {
  title: string
  filename: string
  href: string
  sizeLabel: string
  publishedLabel: string
  tags: string[]
}

const THOUGHTS_DIR = path.join(process.cwd(), 'public', 'thoughts')
const THOUGHTS_DESCRIPTION =
  'A library of PDFs by Paul Mothapo, including short booklets, essays, reflections, and longer-form notes.'
const PINNED_THOUGHT_FILENAMES = [
  'Imagination_is_Everything_[notes,essay].pdf',
].slice(0, 3)

export const metadata: Metadata = createMetadata({
  title: 'Thoughts',
  description: THOUGHTS_DESCRIPTION,
  path: '/thoughts',
  keywords: ['thoughts', 'PDF library', 'essays', 'notes'],
})

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  )
  const value = bytes / Math.pow(1024, index)
  const precision = value >= 100 || index === 0 ? 0 : value >= 10 ? 1 : 2

  return `${value.toFixed(precision)} ${units[index]}`
}

const extractTags = (filename: string) => {
  const base = filename.replace(/\.pdf$/i, '')
  const matches = [...base.matchAll(/_\[([^\]]+)\]/g)]
  if (matches.length === 0) return []

  return matches
    .flatMap((match) => match[1].split(','))
    .map((tag) => tag.trim())
    .filter(Boolean)
}

const titleFromFilename = (filename: string) => {
  const base = filename.replace(/\.pdf$/i, '')
  const withoutTags = base.replace(/_\[[^\]]+\]/g, '')
  return withoutTags.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date)

const getPublishedDate = (fullPath: string, fallback: Date) => {
  try {
    const output = execFileSync(
      'git',
      ['log', '--follow', '--reverse', '--format=%cI', '--', fullPath],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      },
    )

    const firstCommitDate = output
      .split('\n')
      .map((line) => line.trim())
      .find(Boolean)

    if (firstCommitDate) {
      const parsedDate = new Date(firstCommitDate)
      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate
      }
    }
  } catch {
    // Fall back to the file timestamp when Git history is unavailable.
  }

  return fallback
}

async function getPdfEntries(): Promise<PdfEntry[]> {
  try {
    const entries = await fs.readdir(THOUGHTS_DIR, { withFileTypes: true })
    const pdfFiles = entries
      .filter(
        (entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.pdf'),
      )
      .map((entry) => entry.name)

    const stats = await Promise.all(
      pdfFiles.map(async (filename) => {
        const fullPath = path.join(THOUGHTS_DIR, filename)
        const stat = await fs.stat(fullPath)
        const published = getPublishedDate(fullPath, stat.mtime)
        return {
          filename,
          published,
          size: stat.size,
        }
      }),
    )

    return stats
      .sort((a, b) => b.published.getTime() - a.published.getTime())
      .map((entry) => ({
        title: titleFromFilename(entry.filename),
        filename: entry.filename,
        href: `/thoughts/${entry.filename}`,
        sizeLabel: formatBytes(entry.size),
        publishedLabel: formatDate(entry.published),
        tags: extractTags(entry.filename),
      }))
  } catch (error) {
    return []
  }
}

export default async function PdfsPage() {
  const pdfs = await getPdfEntries()

  return (
    <>
      <JsonLd
        data={buildCollectionPageSchema({
          title: 'Thoughts by Paul Mothapo',
          description: THOUGHTS_DESCRIPTION,
          path: '/thoughts',
          items: pdfs.map((pdf) => ({
            name: pdf.title || pdf.filename,
            url: pdf.href,
            description: `PDF document published ${pdf.publishedLabel}`,
          })),
        })}
      />
      <main className="space-y-16">
        <section className="space-y-3">
          <h1 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Thoughts
          </h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            Short booklets, daily reflections, and longer-form notes collected
            as PDFs from an ongoing practice of writing, thinking, and
            revisiting ideas.
          </p>
        </section>

        <section className="space-y-4">
          {pdfs.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
              No PDFs yet. Add files to{' '}
              <span className="font-mono">public/thoughts</span> and they will
              show up here.
            </div>
          ) : (
            <ThoughtsLibrary
              pdfs={pdfs}
              defaultPinnedFiles={PINNED_THOUGHT_FILENAMES}
            />
          )}
        </section>
      </main>
    </>
  )
}
