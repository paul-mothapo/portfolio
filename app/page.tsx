'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import Link from 'next/link'
import { EMAIL, SOCIAL_LINKS, CURRENT_WORK, BLOG_POSTS } from './data'
import RecentQuestions from '@/components/RecentQuestions'
import { ProjectCard } from '@/components/ProjectCard'

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
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        aria-label={`${children} (opens in new tab)`}
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          aria-hidden="true"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">(opens in new tab)</span>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
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
        aria-labelledby="about-heading"
      >
        <div className="flex-1 text-zinc-800 dark:text-zinc-200">
          <h1 id="about-heading" className="mb-5 text-lg font-medium">
            About Me
          </h1>
          <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
            <li>
              i&apos;m a software engineer who enjoys <strong>building systems and tools</strong>.
            </li>
            <li>
              most of my work lives somewhere between <strong>data, design, and product ideas.</strong>
            </li>
            <li>
              i like turning messy real-world problems into <strong>structured software solutions.</strong>
            </li>
            <li>
              when i&apos;m not coding, i&apos;m usually watching cartoons (family guy, rick and morty, and others).
            </li>
            <li>
              as a <strong>polymath</strong>, i tend to indulge in science stuff and a whole lot of things i&apos;m curious about.
            </li>
            <li>
              one of my quiet interests? understanding <strong>how technology shapes human behavior.</strong>
            </li>
          </ul>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        aria-label="Recent Chat Questions"
      >
        <RecentQuestions />
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        aria-labelledby="work-heading"
      >
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
                  <span key={work.company} className="block mb-2">
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
                <span key={work.company} className="block mb-2">
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
            I also share my thoughts through{' '}
            <a
              rel="noopener noreferrer"
              href="https://creators.spotify.com/pod/profile/theidealisticworld"
              target="_blank"
              className="underline dark:text-zinc-300"
              aria-label="The Idealistic World podcast on Spotify (opens in new tab)"
            >
              podcasting
            </a>{' '}
            and writing.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        aria-labelledby="featured-blog-heading"
      >
        <h2
          id="featured-blog-heading"
          className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200"
        >
          Featured Blog
        </h2>
        <Link
          href={BLOG_POSTS[0].link}
          className="group block"
          aria-label={`Read blog post: ${BLOG_POSTS[0].title}`}
        >
          <motion.article
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative h-48 w-full overflow-hidden rounded-lg"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url(${BLOG_POSTS[0].image})`,
              }}
              role="img"
              aria-label={`Cover image for ${BLOG_POSTS[0].title}`}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"
              aria-hidden="true"
            />
            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              <span className="mb-2 text-xs font-medium tracking-wider text-zinc-300 uppercase">
                Latest Post
              </span>
              <h3 className="text-xl font-medium text-white">
                {BLOG_POSTS[0].title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
                {BLOG_POSTS[0].description}
              </p>
            </div>
          </motion.article>
        </Link>
      </motion.section>

      <Link href="/blog" className="block" aria-label="View all blog posts">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative h-32 w-full overflow-hidden rounded-lg bg-zinc-100 p-6 text-left transition-colors hover:bg-zinc-200 dark:border dark:border-zinc-600 dark:bg-zinc-900/80 dark:hover:bg-zinc-800/80"
          style={{
            backgroundImage: 'url(/world.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          role="img"
          aria-label="World map background"
        >
          <div className="relative z-10 -m-6 flex h-full flex-col p-6">
            <span className="text-2xl font-medium text-white">Blog</span>
            <span className="text-md mt-2 text-zinc-200">
              Read my thoughts on human progress
            </span>
          </div>
        </motion.div>
      </Link>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        aria-labelledby="projects-heading"
      >
        <h2
          id="projects-heading"
          className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200"
        >
          Projects/Research
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
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        aria-labelledby="connect-heading"
      >
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
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </nav>
      </motion.section>
    </motion.main>
  )
}
