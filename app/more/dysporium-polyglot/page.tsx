'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import Link from 'next/link'
import {
  Database,
  Shield,
  Github,
  Layers,
  Globe,
  Brain,
  Code,
} from 'lucide-react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

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
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function DysporiumPolyglot() {
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
        <h1 className="mb-8 text-2xl font-bold text-zinc-800 dark:text-zinc-200">
          Dysporium Polyglot
        </h1>
        <div className="space-y-6">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A TypeScript-based internationalization library distributed as an
            npm package. Built with a monorepo architecture using pnpm
            workspaces, featuring four specialized packages for React
            applications, vanilla JavaScript projects, AI-assisted translation
            workflows, and a core translation engine with full TypeScript type
            safety.
          </p>
          <Link
            href="https://github.com/Dysporium/dysporium-polyglot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 underline"
          >
            <Github />
            GitHub
          </Link>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <Layers className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  React Bindings
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                React-specific package with hooks and context API for seamless
                integration into React applications
              </p>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <Code className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  Vanilla JS DOM
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Vanilla JavaScript DOM integration for projects without React or
                other frameworks
              </p>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <Brain className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  AI-Powered Translation
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                AI-powered translation using OpenAI and Anthropic Claude APIs
                for automated translation workflows
              </p>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <Database className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  Core Translation Engine
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Core translation engine supporting string interpolation,
                pluralization, and automatic language detection
              </p>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  Type Safe
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Full TypeScript type safety with end-to-end type inference.
                Catch translation errors at compile time
              </p>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <Globe className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  Framework Agnostic
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Framework-agnostic internationalization capabilities supporting
                React, vanilla JavaScript, and AI workflows
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Technical Highlights
        </h3>
        <div className="space-y-4">
          <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
              <span>
                <strong className="text-zinc-800 dark:text-zinc-200">
                  Monorepo Architecture:
                </strong>{' '}
                Architected using pnpm workspaces with four specialized packages
                for optimal modularity and code sharing
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
              <span>
                <strong className="text-zinc-800 dark:text-zinc-200">
                  Full TypeScript Type Safety:
                </strong>{' '}
                End-to-end TypeScript support with comprehensive type inference
                for translation keys and values
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
              <span>
                <strong className="text-zinc-800 dark:text-zinc-200">
                  CI/CD Pipeline:
                </strong>{' '}
                Established CI/CD pipelines with GitHub Actions for automated
                testing and releases
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
              <span>
                <strong className="text-zinc-800 dark:text-zinc-200">
                  Semantic Versioning:
                </strong>{' '}
                Integrated Changesets for semantic versioning and automated
                changelog generation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
              <span>
                <strong className="text-zinc-800 dark:text-zinc-200">
                  Advanced Translation Features:
                </strong>{' '}
                String interpolation, pluralization rules, and automatic
                language detection for comprehensive i18n support
              </span>
            </li>
          </ul>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Connect
        </h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-300">
          Feel free to contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
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
