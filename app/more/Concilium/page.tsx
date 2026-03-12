'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import Link from 'next/link'
import { Github } from 'lucide-react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = { duration: 0.3 }

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
        className="group inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
      </a>
    </Magnetic>
  )
}

export default function Concilium() {
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
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Research Objective
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400">
          The project explores whether a computational pipeline can derive
          internally coherent language structures that are not inherited from
          existing human languages. Concilium separates semantic intent from
          linguistic realization, allowing generated lexemes, sound patterns,
          and grammatical structure to evolve independently.
        </p>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Architecture
        </h3>

        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>• Phonology engine defining phoneme inventory and constraints</li>
          <li>• Lexeme generator mapping semantic glosses to word forms</li>
          <li>• Mutation pipeline applying ordered sound-change rules</li>
          <li>• Grammar engine realizing clauses using SOV structure</li>
          <li>• Evolution module assembling and exposing the language model</li>
        </ul>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Example Linguistic Profile
        </h3>

        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>Language name: Concilium</li>
          <li>Word order: SOV</li>
          <li>Plural marking: suffix <code>-en</code></li>
          <li>Past tense: prefix <code>ka-</code></li>
          <li>Example sound shifts: k → kh, s → sh before vowels</li>
        </ul>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Connect
        </h3>

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