'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import Link from 'next/link'
import { Github } from 'lucide-react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = { duration: 0.3 }

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
      </a>
    </Magnetic>
  )
}

export default function NoteDataFormat() {
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
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
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Design Goals
        </h3>

        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>• Human-readable note-style syntax</li>
          <li>• Compact representation compared to JSON</li>
          <li>• Deterministic single-pass parsing</li>
          <li>• Minimal structural overhead</li>
          <li>• Efficient token usage for AI workflows</li>
        </ul>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Example Structure
        </h3>

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
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Architecture
        </h3>

        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>• Tokenization and indentation-based structure</li>
          <li>• Lightweight grammar and deterministic parsing</li>
          <li>• Structured object representation</li>
          <li>• Format designed for extensibility and tooling</li>
        </ul>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Connect
        </h3>

        <p className="mb-4 text-zinc-600 dark:text-zinc-300">
          Reach me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>

        <div className="flex items-center space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}