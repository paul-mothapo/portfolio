'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export type CodeBlockProps = {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const formatCode = (code: string) => {
    return code.split('\n').map((line, i) => {
      const parts = line.split(' ')
      return parts.map((part, j) => {
        if (part.startsWith('#')) {
          return <span key={`${i}-${j}`} className="text-emerald-600 dark:text-emerald-400">{part} </span>
        }
        if (part === 'npm' || part === 'yarn' || part === 'pnpm' || part === 'npx') {
          return <span key={`${i}-${j}`} className="text-blue-600 dark:text-blue-400">{part} </span>
        }
        if (part === 'install' || part === 'add') {
          return <span key={`${i}-${j}`} className="text-purple-600 dark:text-purple-400">{part} </span>
        }
        if (part.includes('loglog-core') || part.includes('pauljs') || part.includes('create-pauljs-app')) {
          return <span key={`${i}-${j}`} className="text-orange-600 dark:text-orange-400">{part} </span>
        }
        return <span key={`${i}-${j}`}>{part} </span>
      })
    })
  }

  return (
    <div
      className={cn(
        'relative rounded-lg bg-zinc-100 dark:bg-zinc-900/80 dark:border dark:border-zinc-600',
        className,
      )}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={copyToClipboard}
          className="rounded-md bg-zinc-200 px-2 py-1 text-sm text-zinc-600 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-zinc-800 dark:text-zinc-200">
        <code className={language ? `language-${language}` : ''}>
          {formatCode(code)}
        </code>
      </pre>
    </div>
  )
}
