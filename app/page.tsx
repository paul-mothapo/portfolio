import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RecentQuestions from '@/components/RecentQuestions'
import { ProjectCard } from '@/components/ProjectCard'
import { AnimatedPage, AnimatedSection, SocialPillLink } from '@/components/PageShell'
import { BLOG_POSTS_SORTED, CURRENT_WORK, EMAIL, SOCIAL_LINKS } from './data'
import { JsonLd, buildWebPageSchema, createMetadata } from '@/lib/seo'

const HOME_DESCRIPTION =
  'Portfolio of Paul Mothapo, an engineer building software systems, AI tools, research experiments, and product ideas.'

export const metadata: Metadata = createMetadata({
  description: HOME_DESCRIPTION,
  keywords: ['home', 'software portfolio', 'AI tools', 'engineering blog'],
})

export default function Personal() {
  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          title: 'Paul Mothapo',
          description: HOME_DESCRIPTION,
          path: '/',
        })}
      />
      <AnimatedPage>
        <AnimatedSection aria-labelledby="intro-heading">
          <div className="flex-1 text-zinc-800 dark:text-zinc-200">
            <ul className="mt-6 list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
              <li>
                I enjoy <strong>technical foundations that companies run on, </strong> architecture, infrastructure, and the decisions that shape both.
              </li>
              <li>
                Most of my work lives somewhere between <strong>distributed systems, design, AI, and product thinking.</strong>
              </li>
              <li>
               I am drawn to hard problems where the engineering and the idea are equally difficult
              </li>
              <li>
                One of my quieter interests is understanding <strong>how technology shapes human behavior.</strong>
              </li>
              <li>
                Outside of coding, I spend time writing, reading, and following whatever science rabbit hole catches my attention.
              </li>
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection aria-labelledby="work-heading">
          <h2
            id="work-heading"
            className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200"
          >
            Current Work
          </h2>
          <div>
            <p className="text-zinc-600 dark:text-zinc-400">
              {CURRENT_WORK.map((work, index) => {
                if (index === 1) {
                  return (
                    <span key={work.company} className="mb-2 block">
                      Also part of{' '}
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline dark:text-zinc-300"
                        aria-label={`${work.company} (opens in new tab)`}
                      >
                        {work.company}
                      </a>{' '}
                      {work.description}
                    </span>
                  )
                }

                return (
                  <span key={work.company} className="mb-2 block">
                    At{' '}
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline dark:text-zinc-300"
                      aria-label={`${work.company} (opens in new tab)`}
                    >
                      {work.company}
                    </a>{' '}
                    {work.description}
                  </span>
                )
              })}
              I also share ideas through writing, experiments, and podcasting.
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
              More from me
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/thoughts"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                aria-label="Read my thoughts"
              >
                Thoughts
              </Link>
              <a
                rel="noopener noreferrer"
                href="https://creators.spotify.com/pod/profile/theidealisticworld"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
                aria-label="The Idealistic World podcast on Spotify (opens in new tab)"
              >
                Podcast
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                aria-label="Read my blog posts"
              >
                Blog
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection aria-labelledby="featured-blog-heading">
          <h2
            id="featured-blog-heading"
            className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200"
          >
            Featured Blog Post
          </h2>
          <Link
            href={BLOG_POSTS_SORTED[0].link}
            className="group block"
            aria-label={`Read blog post: ${BLOG_POSTS_SORTED[0].title}`}
          >
            <article className="relative h-56 w-full overflow-hidden rounded-lg">
              <Image
                src={BLOG_POSTS_SORTED[0].image}
                alt={`Cover image for ${BLOG_POSTS_SORTED[0].title}`}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 768px, 100vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"
                aria-hidden="true"
              />
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <span className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-300">
                  Latest Post
                </span>
                <h3 className="text-xl font-medium text-white">
                  {BLOG_POSTS_SORTED[0].title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
                  {BLOG_POSTS_SORTED[0].description}
                </p>
              </div>
            </article>
          </Link>
        </AnimatedSection>

        <AnimatedSection aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200"
          >
            Projects and Research
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ProjectCard
              href="/more/dysporium-sdk"
              title="Dysporium SDK"
              description="Simple SDK that allows developers to ship with AI quickly"
              ariaLabel="Dysporium SDK: Simple SDK that allows developers to ship with AI quickly"
            />
            <ProjectCard
              href="/more/simulation-hypo"
              title="Simulation Hypothesis"
              description="A Rust-based simulation modeling network latency and physical limits"
              ariaLabel="A Rust-based simulation modeling network latency and physical limits."
            />
            <ProjectCard
              href="/more/Estate-Optimization-Engine"
              title="Estate Optimization Engine"
              description="A jurisdiction-aware planning platform for evaluating wealth-transfer strategies."
              ariaLabel="A jurisdiction-aware planning platform for evaluating wealth-transfer strategies."
            />
            <ProjectCard
              href="/more/Concilium"
              title="Concilium"
              description="A research-oriented Rust prototype for the controlled generation of an artificial language."
              ariaLabel="A research-oriented Rust prototype for the controlled generation of an artificial language designed to model an unfamiliar, non-human linguistic system."
            />
            <ProjectCard
              href="/more/note-data-format"
              title="Note Data Format"
              description="A lightweight structured data language designed to be both human-readable and machine-parsable."
              ariaLabel="A lightweight structured data language designed to be both human-readable and machine-parsable."
            />
          </div>
        </AnimatedSection>

        <AnimatedSection aria-label="Recent Chat Questions">
          <RecentQuestions />
        </AnimatedSection>

        <AnimatedSection aria-labelledby="connect-heading">
          <h2
            id="connect-heading"
            className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200"
          >
            Connect
          </h2>
          <p className="mb-5 text-zinc-600 dark:text-zinc-300">
            Feel free to contact me at{' '}
            <a
              className="underline dark:text-zinc-300"
              href={`mailto:${EMAIL}`}
              aria-label={`Send email to ${EMAIL}`}
            >
              {EMAIL}
            </a>
          </p>
          <nav
            className="flex items-center justify-start space-x-3"
            aria-label="Social media links"
          >
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
