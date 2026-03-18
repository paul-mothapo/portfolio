import type { Metadata } from 'next'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import { AnimatedPage, AnimatedSection, SocialPillLink } from '@/components/PageShell'
import { JsonLd, buildSoftwareSourceCodeSchema, createMetadata } from '@/lib/seo'

const DESCRIPTION =
  'Simulation Hypothesis is a Rust-based network latency simulator exploring distance, routing, and physical limits on system performance.'

export const metadata: Metadata = createMetadata({
  title: 'Simulation Hypothesis',
  description: DESCRIPTION,
  path: '/more/simulation-hypo',
  keywords: ['Rust', 'network simulation', 'latency', 'performance engineering'],
})

export default function SimulationHypothesis() {
  return (
    <>
      <JsonLd
        data={buildSoftwareSourceCodeSchema({
          name: 'Simulation Hypothesis',
          description: DESCRIPTION,
          path: '/more/simulation-hypo',
          codeRepository: 'https://github.com/paul-mothapo/simulation-hypothesis',
          keywords: ['Rust'],
        })}
      />
      <AnimatedPage>
        <AnimatedSection>
          <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            Simulation Hypothesis
          </h1>
          <p className="mb-4 text-lg text-zinc-600 dark:text-zinc-400">
            A Rust-based simulation modeling network latency and physical limits, exploring how real-world constraints like distance, speed of light, and routing affect system performance.
          </p>
          <Link
            href="https://github.com/paul-mothapo/simulation-hypothesis"
            target="_blank"
            className="flex items-center gap-1 underline dark:text-zinc-300"
          >
            <Github />
            GitHub
          </Link>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">Key Highlights</h2>
          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Rust-based high-performance simulation</li>
            <li>Models network latency and propagation limits</li>
            <li>Realistic scenarios: local, remote, and interplanetary links</li>
            <li>Scientific, experimental approach to system performance</li>
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">Connect</h2>
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
