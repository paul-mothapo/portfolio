import type { Metadata } from 'next'
import Link from 'next/link'
import { Database, Shield, Cpu, Github, Layers, Workflow, Zap } from 'lucide-react'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import { AnimatedPage, AnimatedSection, SocialPillLink } from '@/components/PageShell'
import { JsonLd, buildSoftwareSourceCodeSchema, createMetadata } from '@/lib/seo'

const DESCRIPTION =
  'Dysporium SDK is an open source TypeScript AI SDK for streaming responses, tool calling, embeddings, and provider-based AI integrations.'

export const metadata: Metadata = createMetadata({
  title: 'Dysporium SDK',
  description: DESCRIPTION,
  path: '/more/dysporium-sdk',
  keywords: ['TypeScript SDK', 'AI SDK', 'OpenAI', 'tool calling', 'embeddings'],
})

export default function DysporiumSDK() {
  return (
    <>
      <JsonLd
        data={buildSoftwareSourceCodeSchema({
          name: 'Dysporium SDK',
          description: DESCRIPTION,
          path: '/more/dysporium-sdk',
          codeRepository: 'https://github.com/Dysporium/dysporium-ai-sdk',
          keywords: ['TypeScript', 'AI SDK'],
        })}
      />
      <AnimatedPage>
        <AnimatedSection>
          <h1 className="mb-8 text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            Dysporium SDK
          </h1>
          <div className="space-y-6">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              An open source simple AI SDK that allows developers to plug and ship quickly.
              Built with TypeScript for type-safe AI development, featuring streaming support,
              provider architecture, and OpenAI integration out of the box.
            </p>
            <Link
              href="https://github.com/Dysporium/dysporium-ai-sdk"
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
                  <Zap className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  <h2 className="font-medium text-zinc-800 dark:text-zinc-200">
                    Streaming First
                  </h2>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Built-in support for streaming responses with chunk callbacks for real-time AI interactions
                </p>
              </div>

              <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
                <div className="mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  <h2 className="font-medium text-zinc-800 dark:text-zinc-200">
                    Type Safe
                  </h2>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  End-to-end TypeScript support with full type inference. Catch errors at compile time
                </p>
              </div>

              <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
                <div className="mb-2 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  <h2 className="font-medium text-zinc-800 dark:text-zinc-200">
                    Provider Architecture
                  </h2>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Modular provider system starting with OpenAI. Add new providers without changing your code
                </p>
              </div>

              <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
                <div className="mb-2 flex items-center gap-2">
                  <Database className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  <h2 className="font-medium text-zinc-800 dark:text-zinc-200">
                    Embeddings and Search
                  </h2>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Generate embeddings, compute similarity, and build semantic search with built-in utilities
                </p>
              </div>

              <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
                <div className="mb-2 flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  <h2 className="font-medium text-zinc-800 dark:text-zinc-200">
                    Tool Calling
                  </h2>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  First-class support for function calling with automatic tool execution loops
                </p>
              </div>

              <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900/80">
                <div className="mb-2 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  <h2 className="font-medium text-zinc-800 dark:text-zinc-200">
                    Structured Output
                  </h2>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  JSON mode and JSON Schema support for reliable, structured responses from LLMs
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Technical Highlights
          </h2>
          <div className="space-y-4">
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                <span>
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    Modern TypeScript Architecture:
                  </strong>{' '}
                  Built with ESM modules, type-safe interfaces, and comprehensive type inference
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                <span>
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    Provider-Agnostic Design:
                  </strong>{' '}
                  Extensible provider system with OpenAI support and easy integration for new providers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                <span>
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    Production-Ready Features:
                  </strong>{' '}
                  Streaming, error handling, retry logic, and comprehensive developer experience
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                <span>
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    Modular Package Structure:
                  </strong>{' '}
                  Separate packages for core, providers, and utilities for optimal tree-shaking and flexibility
                </span>
              </li>
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Connect
          </h2>
          <p className="mb-5 text-zinc-600 dark:text-zinc-300">
            Feel free to contact me at{' '}
            <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
          <nav className="flex items-center justify-start space-x-3" aria-label="Social media links">
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
