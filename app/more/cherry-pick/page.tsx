'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import { CodeBlock } from '@/components/ui/code-block'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import Link from 'next/link'
import { Database, Shield, BarChart3, Github, Search, Zap } from 'lucide-react'

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

export default function CherryPick() {
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
          Cherry-Pick
        </h1>
        <div className="space-y-6">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A comprehensive enterprise database intelligence system built in Go
            that provides database analysis, monitoring, security assessment,
            and optimization capabilities for MySQL, PostgreSQL, SQLite, and
            MongoDB.
          </p>
          <Link
            href="https://github.com/paul-mothapo/cherry-pick"
            target="_blank"
            className="flex items-center gap-1 underline dark:text-zinc-300"
          >
            <Github />
            GitHub
          </Link>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  Comprehensive Analysis
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Tables, columns, indexes, constraints, and relationships
                analysis
              </p>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  Security Assessment
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                PII detection, vulnerability scanning, and access control
                analysis
              </p>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  Performance Monitoring
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Real-time monitoring, alerting, and optimization suggestions
              </p>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  Data Lineage
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Dependency tracking and impact analysis across your database
              </p>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200">
                  Query Optimization
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                SQL analysis with performance recommendations and insights
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
                  Advanced Go Architecture:
                </strong>{' '}
                Built with dependency injection and interface-based design
                patterns
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
              <span>
                <strong className="text-zinc-800 dark:text-zinc-200">
                  Multi-Database Support:
                </strong>{' '}
                MySQL 5.7+, PostgreSQL 10+, SQLite 3.x, and MongoDB 4.0+
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
              <span>
                <strong className="text-zinc-800 dark:text-zinc-200">
                  Enterprise-Grade Features:
                </strong>{' '}
                Automated reporting, scheduled analysis, and customizable alerts
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
              <span>
                <strong className="text-zinc-800 dark:text-zinc-200">
                  Modular Design:
                </strong>{' '}
                Extensible architecture for custom analysis and reporting
                modules
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
