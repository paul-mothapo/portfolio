'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import Link from 'next/link'
import { Github } from 'lucide-react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = { duration: 0.3 }

function MagneticSocialLink({ children, link }: { children: React.ReactNode; link: string }) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
      </a>
    </Magnetic>
  )
}

export default function SimulationHypothesis() {
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-200">
          Simulation Hypothesis
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
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
      </motion.section>

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">Key Highlights</h3>
        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>Rust-based high-performance simulation</li>
          <li>Models network latency and propagation limits</li>
          <li>Realistic scenarios: local, remote, and interplanetary links</li>
          <li>Scientific, experimental approach to system performance</li>
        </ul>
      </motion.section>

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">Connect</h3>
        <p className="mb-4 text-zinc-600 dark:text-zinc-300">
          Reach me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center space-x-3">
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