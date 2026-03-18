import type { Metadata } from 'next'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import { AnimatedPage, AnimatedSection, SocialPillLink } from '@/components/PageShell'
import { JsonLd, buildSoftwareSourceCodeSchema, createMetadata } from '@/lib/seo'

const DESCRIPTION =
  'Concilium is a Rust research prototype for generating artificial language systems with independent phonology, grammar, and surface forms.'

export const metadata: Metadata = createMetadata({
  title: 'Concilium',
  description: DESCRIPTION,
  path: '/more/Concilium',
  keywords: ['Rust', 'computational linguistics', 'language generation', 'research prototype'],
})

export default function Concilium() {
  return (
    <>
      <JsonLd
        data={buildSoftwareSourceCodeSchema({
          name: 'Concilium',
          description: DESCRIPTION,
          path: '/more/Concilium',
          codeRepository: 'https://github.com/paul-mothapo/Concilium',
          keywords: ['Rust'],
        })}
      />
      <AnimatedPage>
        <AnimatedSection>
          <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            Concilium
          </h1>

          <p className="mb-4 text-lg text-zinc-600 dark:text-zinc-400">
            Concilium is a research-oriented Rust prototype for the controlled
            generation of an artificial language designed to model an unfamiliar,
            non-human linguistic system. English glosses are used only as a
            semantic reference layer while phonology, grammar, and surface forms
            are generated independently.
          </p>

          <Link
            href="https://github.com/paul-mothapo/Concilium"
            target="_blank"
            className="flex items-center gap-1 underline dark:text-zinc-300"
          >
            <Github />
            GitHub
          </Link>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Research Objective
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400">
            The project explores whether a computational pipeline can derive
            internally coherent language structures that are not inherited from
            existing human languages. Concilium separates semantic intent from
            linguistic realization, allowing generated lexemes, sound patterns,
            and grammatical structure to evolve independently.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Architecture
          </h2>

          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Phonology engine defining phoneme inventory and constraints</li>
            <li>Lexeme generator mapping semantic glosses to word forms</li>
            <li>Mutation pipeline applying ordered sound-change rules</li>
            <li>Grammar engine realizing clauses using SOV structure</li>
            <li>Evolution module assembling and exposing the language model</li>
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Example Linguistic Profile
          </h2>

          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Language name: Concilium</li>
            <li>Word order: SOV</li>
            <li>Plural marking: suffix <code>-en</code></li>
            <li>Past tense: prefix <code>ka-</code></li>
            <li>Example sound shifts: k to kh, s to sh before vowels</li>
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
