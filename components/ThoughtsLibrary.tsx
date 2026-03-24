'use client'

import { useSyncExternalStore } from 'react'
import { Pin, PinOff } from 'lucide-react'
import { cn } from '@/lib/utils'

type PdfEntry = {
  title: string
  filename: string
  href: string
  sizeLabel: string
  publishedLabel: string
  tags: string[]
}

type ThoughtsLibraryProps = {
  pdfs: PdfEntry[]
  defaultPinnedFiles: string[]
}

type StoredPinnedFiles = {
  pinnedFiles: string[]
}

const STORAGE_KEY = 'thoughts-pinned-files'
const MAX_PINNED_FILES = 3
const STORAGE_EVENT = 'thoughts-pinned-files-updated'

function sanitizePinnedFiles(
  pinnedFiles: string[] | null,
  availableFiles: Set<string>,
  fallbackPinnedFiles: string[],
) {
  const sourcePinnedFiles = pinnedFiles ?? fallbackPinnedFiles

  return sourcePinnedFiles
    .filter((filename) => availableFiles.has(filename))
    .filter((filename, index, files) => files.indexOf(filename) === index)
    .slice(0, MAX_PINNED_FILES)
}

function readStoredPinnedFilesSnapshot() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function parseStoredPinnedFilesSnapshot(snapshot: string | null) {
  if (!snapshot) {
    return null
  }

  try {
    const parsedPinnedFiles = JSON.parse(snapshot) as StoredPinnedFiles
    if (!Array.isArray(parsedPinnedFiles.pinnedFiles)) {
      return null
    }

    return parsedPinnedFiles.pinnedFiles.filter(
      (filename): filename is string => typeof filename === 'string',
    )
  } catch {
    return null
  }
}

function writeStoredPinnedFiles(pinnedFiles: string[]) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ pinnedFiles } satisfies StoredPinnedFiles),
    )
    window.dispatchEvent(new Event(STORAGE_EVENT))
  } catch {
    // Ignore storage failures and leave the UI unchanged.
  }
}

function subscribeToPinnedFiles(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onStoreChange()
    }
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(STORAGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(STORAGE_EVENT, onStoreChange)
  }
}

export default function ThoughtsLibrary({
  pdfs,
  defaultPinnedFiles,
}: ThoughtsLibraryProps) {
  const availableFiles = new Set(pdfs.map((pdf) => pdf.filename))

  const storedPinnedFilesSnapshot = useSyncExternalStore(
    subscribeToPinnedFiles,
    readStoredPinnedFilesSnapshot,
    () => null,
  )

  const pinnedFiles = sanitizePinnedFiles(
    parseStoredPinnedFilesSnapshot(storedPinnedFilesSnapshot),
    availableFiles,
    defaultPinnedFiles,
  )

  const togglePin = (filename: string) => {
    if (pinnedFiles.includes(filename)) {
      writeStoredPinnedFiles(
        pinnedFiles.filter((currentFilename) => currentFilename !== filename),
      )
      return
    }

    if (pinnedFiles.length >= MAX_PINNED_FILES) {
      return
    }

    writeStoredPinnedFiles([...pinnedFiles, filename])
  }

  const orderedPdfs = [
    ...pdfs
      .filter((pdf) => pinnedFiles.includes(pdf.filename))
      .sort((a, b) => {
        return pinnedFiles.indexOf(a.filename) - pinnedFiles.indexOf(b.filename)
      }),
    ...pdfs.filter((pdf) => !pinnedFiles.includes(pdf.filename)),
  ]

  const hasReachedPinLimit = pinnedFiles.length >= MAX_PINNED_FILES

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Pinned files
          </span>
          <span className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
            {pinnedFiles.length}/{MAX_PINNED_FILES}
          </span>
        </div>
        <p>
          Your pinned files stay at the top. This page starts with the Paul’s
          pinned picks, and you can pin or unpin up to three from your device.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orderedPdfs.map((pdf) => {
          const isPinned = pinnedFiles.includes(pdf.filename)
          const isPinDisabled = !isPinned && hasReachedPinLimit

          return (
            <article
              key={pdf.filename}
              className={cn(
                'rounded-xl border bg-white p-5 shadow-sm transition dark:bg-zinc-900',
                isPinned
                  ? 'border-zinc-900/30 ring-1 ring-zinc-900/10 dark:border-zinc-200/30 dark:ring-zinc-100/10'
                  : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800',
              )}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                      {pdf.title || pdf.filename}
                    </h2>
                    {isPinned && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                        <Pin className="h-3 w-3" />
                        Pinned
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    <span>{pdf.sizeLabel}</span>
                    <span className="mx-2">•</span>
                    <span>Published {pdf.publishedLabel}</span>
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
                  <button
                    type="button"
                    onClick={() => togglePin(pdf.filename)}
                    disabled={isPinDisabled}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 transition',
                      isPinned
                        ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
                        : 'border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500',
                      isPinDisabled &&
                        'cursor-not-allowed border-zinc-200 text-zinc-400 hover:border-zinc-200 hover:text-zinc-400 dark:border-zinc-800 dark:text-zinc-600',
                    )}
                    aria-pressed={isPinned}
                    title={
                      isPinDisabled
                        ? `You can pin up to ${MAX_PINNED_FILES} files`
                        : isPinned
                          ? 'Unpin this file'
                          : 'Pin this file'
                    }
                  >
                    {isPinned ? (
                      <PinOff className="h-4 w-4" />
                    ) : (
                      <Pin className="h-4 w-4" />
                    )}
                    {isPinned ? 'Unpin' : 'Pin'}
                  </button>
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
          )
        })}
      </div>
    </div>
  )
}
