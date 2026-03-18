import type { Metadata } from 'next'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import { AnimatedPage, AnimatedSection, SocialPillLink } from '@/components/PageShell'
import { JsonLd, buildSoftwareSourceCodeSchema, createMetadata } from '@/lib/seo'

const DESCRIPTION =
  'Note Data Format is a lightweight structured data format for human-readable notes, deterministic parsing, and efficient AI workflows.'

export const metadata: Metadata = createMetadata({
  title: 'Note Data Format',
  description: DESCRIPTION,
  path: '/more/note-data-format',
  keywords: ['data format', 'parser design', 'AI workflow', 'structured notes'],
})

export default function NoteDataFormat() {
  return (
    <>
      <JsonLd
        data={buildSoftwareSourceCodeSchema({
          name: 'Note Data Format',
          description: DESCRIPTION,
          path: '/more/note-data-format',
          codeRepository: 'https://github.com/Dysporium/note-data-format',
          keywords: ['Data format'],
        })}
      />
      <AnimatedPage>
        <AnimatedSection>
          <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            Note Data Format
          </h1>

          <p className="mb-4 text-lg text-zinc-600 dark:text-zinc-400">
            Note Data Format (NotedDF) is a lightweight structured data format
            designed for human-readable notes and efficient machine parsing.
            It prioritizes minimal syntax, compact representation, and
            single-pass parsing while remaining intuitive to write by hand.
          </p>

          <Link
            href="https://github.com/Dysporium/note-data-format"
            target="_blank"
            className="flex items-center gap-1 underline dark:text-zinc-300"
          >
            <Github />
            GitHub
          </Link>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Design Goals
          </h2>

          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Human-readable note-style syntax</li>
            <li>Compact representation compared to JSON</li>
            <li>Deterministic single-pass parsing</li>
            <li>Minimal structural overhead</li>
            <li>Efficient token usage for AI workflows</li>
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Example Structure
          </h2>

          <pre className="rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-900/70">
{`user:
  name: Alice
  age: 30
  tags: python ai ml`}
          </pre>

          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            The format allows structured data to be written naturally,
            making it suitable for configuration files, note-taking
            systems, and AI prompt data interchange.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Architecture
          </h2>

          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Tokenization and indentation-based structure</li>
            <li>Lightweight grammar and deterministic parsing</li>
            <li>Structured object representation</li>
            <li>Format designed for extensibility and tooling</li>
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Connect
          </h2>

          <p className="mb-4 text-zinc-600 dark:text-zinc-300">
            Reach me at{' '}
            <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>

          <nav className="flex items-center space-x-3" aria-label="Social media links">
            {SOCIAL_LINKS.map((link) => (
              <SocialPillLink
                key={link.label}
                link={link.link}
                ariaLabel={`${link.label} (opens in new tab)`}
              >
                {link.label}
              </SocialPillLink>
            ))}
          </nav>
        </AnimatedSection>
      </AnimatedPage>
    </>
  )
}
