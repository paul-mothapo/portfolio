'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { BLOG_POSTS, EMAIL, SOCIAL_LINKS, CURRENT_WORK } from './data'

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
      >
        <div className="flex-1 text-zinc-800 dark:text-zinc-200">
          <h3 className="mb-5 text-lg font-medium">About Me</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Specializing in user experience, software design, and development.
            Focused on creating intuitive and performant web experiences that
            bridge the gap between design and development.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Current Work
        </h3>
        <div className="">
          <p className="text-zinc-600 dark:text-zinc-400">
            {CURRENT_WORK.map((work, index) => (
              <span key={work.company}>
                {index === 0
                  ? 'Currently at '
                  : index === 1
                    ? "Outside of my primary role, I'm also part of the team developing "
                    : 'In my spare time, I maintain '}
                <a
                  href={work.link}
                  target="_blank"
                  className="underline dark:text-zinc-300"
                >
                  {work.company}
                </a>
                , {work.description}.
                {index < CURRENT_WORK.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </span>
            ))}
            <br />
            <br />I also share my thoughts through{' '}
            <a
              href="https://creators.spotify.com/pod/profile/theidealisticworld"
              target="_blank"
              className="underline dark:text-zinc-300"
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
      >
        <h3 className="mb-3 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Blog
        </h3>
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
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 w-full rounded-xl px-3 py-3 dark:border dark:border-zinc-800"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex w-full flex-col space-y-3">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <h4 className="font-normal dark:text-zinc-100">
                      {post.title}
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
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
