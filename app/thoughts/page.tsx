import fs from 'node:fs/promises'
import path from 'node:path'
import type { Metadata } from 'next'
import { JsonLd, buildCollectionPageSchema, createMetadata } from '@/lib/seo'

type PdfEntry = {
  title: string
  filename: string
  href: string
  sizeLabel: string
  updatedLabel: string
  tags: string[]
}

const THOUGHTS_DIR = path.join(process.cwd(), 'public', 'thoughts')
const THOUGHTS_DESCRIPTION =
  'A library of PDFs by Paul Mothapo, including short booklets, essays, reflections, and longer-form notes.'

export const metadata: Metadata = createMetadata({
  title: 'Thoughts',
  description: THOUGHTS_DESCRIPTION,
  path: '/thoughts',
  keywords: ['thoughts', 'PDF library', 'essays', 'notes'],
})

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
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

async function getPdfEntries(): Promise<PdfEntry[]> {
  try {
    const entries = await fs.readdir(THOUGHTS_DIR, { withFileTypes: true })
    const pdfFiles = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.pdf'))
      .map((entry) => entry.name)

    const stats = await Promise.all(
      pdfFiles.map(async (filename) => {
        const fullPath = path.join(THOUGHTS_DIR, filename)
        const stat = await fs.stat(fullPath)
        return {
          filename,
          updated: stat.mtime,
          size: stat.size,
        }
      }),
    )

    return stats
      .sort((a, b) => b.updated.getTime() - a.updated.getTime())
      .map((entry) => ({
        title: titleFromFilename(entry.filename),
        filename: entry.filename,
        href: `/thoughts/${entry.filename}`,
        sizeLabel: formatBytes(entry.size),
        updatedLabel: formatDate(entry.updated),
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
            description: `PDF document updated ${pdf.updatedLabel}`,
          })),
        })}
      />
      <main className="space-y-16">
        <section className="space-y-3">
          <h1 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Thoughts
          </h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            Short booklets, daily reflections, and longer-form notes collected as PDFs from an ongoing practice of writing, thinking, and revisiting ideas.
          </p>
        </section>

        <section className="space-y-4">
          {pdfs.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
              No PDFs yet. Add files to{' '}
              <span className="font-mono">public/thoughts</span> and they will show up here.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pdfs.map((pdf) => (
                <article
                  key={pdf.filename}
                  className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                        {pdf.title || pdf.filename}
                      </h2>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        <span>{pdf.sizeLabel}</span>
                        <span className="mx-2">•</span>
                        <span>Updated {pdf.updatedLabel}</span>
                      </div>
                      {pdf.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-xs">
                          {pdf.tags.map((tag) => (
                            <span
                              key={`${pdf.filename}-${tag}`}
                              className="rounded-full border border-zinc-200 px-2.5 py-1 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <a
                        href={pdf.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                      >
                        Open
                      </a>
                      <a
                        href={pdf.href}
                        download
                        className="rounded-full border border-zinc-300 px-4 py-2 text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
