import { motion } from 'motion/react'
import Link from "next/link"
import { Spotlight } from './ui/spotlight'
import { ArrowRight } from 'lucide-react'



export function ProjectCard({
  href,
  title,
  description,
  ariaLabel,
}: {
  href: string
  title: string
  description: string
  ariaLabel: string
}) {
  return (
    <Link href={href} className="group block" aria-label={ariaLabel}>
      <motion.article
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex h-full min-h-[8rem] w-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <Spotlight
          className="from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800"
          size={250}
        />
        <div className="relative z-10 flex items-start justify-between">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          <ArrowRight className="h-5 w-5 -rotate-45 text-zinc-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-125 group-hover:text-zinc-800 dark:text-zinc-500 dark:group-hover:text-zinc-200" />
        </div>
        <div className="relative z-10 mt-2">
          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </motion.article>
    </Link>
  )
}