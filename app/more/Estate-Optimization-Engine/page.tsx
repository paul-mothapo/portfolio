import type { Metadata } from 'next'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import { AnimatedPage, AnimatedSection, SocialPillLink } from '@/components/PageShell'
import { JsonLd, buildSoftwareSourceCodeSchema, createMetadata } from '@/lib/seo'

const DESCRIPTION =
  'Estate Optimization Engine models estate planning scenarios, tax rules, and jurisdiction constraints to evaluate wealth transfer strategies.'

export const metadata: Metadata = createMetadata({
  title: 'Estate Optimization Engine',
  description: DESCRIPTION,
  path: '/more/Estate-Optimization-Engine',
  keywords: ['financial modeling', 'estate planning', 'optimization engine'],
})

export default function EstateOptimizationEngine() {
  return (
    <>
      <JsonLd
        data={buildSoftwareSourceCodeSchema({
          name: 'Estate Optimization Engine',
          description: DESCRIPTION,
          path: '/more/Estate-Optimization-Engine',
          codeRepository: 'https://github.com/Dysporium/Estate-Optimization-Engine',
        })}
      />
      <AnimatedPage>
        <AnimatedSection>
          <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            Estate Optimization Engine
          </h1>

          <p className="mb-4 text-lg text-zinc-600 dark:text-zinc-400">
            A financial modeling and optimization engine designed to simulate
            estate planning scenarios. It evaluates assets, tax rules, and
            jurisdiction constraints to compute optimal wealth transfer
            strategies.
          </p>

          <Link
            href="https://github.com/Dysporium/Estate-Optimization-Engine"
            target="_blank"
            className="flex items-center gap-1 underline dark:text-zinc-300"
          >
            <Github />
            GitHub
          </Link>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Key Highlights
          </h2>

          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Asset and estate modeling framework</li>
            <li>Tax rule and jurisdiction constraint simulation</li>
            <li>Scenario analysis for wealth transfer strategies</li>
            <li>Optimization logic for estate distribution outcomes</li>
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
