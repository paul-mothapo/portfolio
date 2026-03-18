import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { AnimatedPage, AnimatedSection, SocialPillLink } from '@/components/PageShell'
import { BLOG_POSTS_SORTED, EMAIL, SOCIAL_LINKS } from '../data'
import { JsonLd, buildCollectionPageSchema, createMetadata } from '@/lib/seo'

const BLOG_DESCRIPTION =
  'Technical writing and essays by Paul Mothapo on software engineering, AI, systems design, product thinking, and performance.'

export const metadata: Metadata = createMetadata({
  title: 'Blog',
  description: BLOG_DESCRIPTION,
  path: '/blog',
  keywords: ['blog', 'software engineering articles', 'AI engineering', 'systems design'],
})

export default function Blog() {
  return (
    <>
      <JsonLd
        data={buildCollectionPageSchema({
          title: 'Paul Mothapo Blog',
          description: BLOG_DESCRIPTION,
          path: '/blog',
          items: BLOG_POSTS_SORTED.map((post) => ({
            name: post.title,
            url: post.link,
            description: post.description,
          })),
        })}
      />
      <AnimatedPage>
        <AnimatedSection aria-labelledby="blog-heading">
          <div className="mb-6 space-y-3">
            <h1 id="blog-heading" className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
              Blog
            </h1>
            <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
              Essays and technical notes on software engineering, AI integration, performance,
              product design, and the systems that shape how we build.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AnimatedBackground
              enableHover
              className="h-full w-full rounded-lg bg-zinc-100 dark:border dark:border-zinc-600 dark:bg-zinc-900/80"
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.2,
              }}
            >
              {BLOG_POSTS_SORTED.map((post) => (
                <Link
                  key={post.uid}
                  className="-mx-3 w-full rounded-xl px-3 py-3 dark:border dark:border-zinc-800"
                  href={post.link}
                  data-id={post.uid}
                >
                  <article className="flex w-full flex-col space-y-3">
                    <div className="group relative h-40 w-full overflow-hidden rounded-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <h2 className="font-normal dark:text-zinc-100">
                        {post.title}
                      </h2>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </AnimatedBackground>
          </div>
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
