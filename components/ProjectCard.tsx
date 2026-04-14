'use client'

import { MouseEvent } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'motion/react'
import Link from "next/link"
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
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <Link 
      href={href} 
      className="group relative block" 
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative h-full w-full"
      >
        <motion.div
          className="pointer-events-none absolute -inset-[2px] z-0 overflow-hidden rounded-[18px] opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            maskImage: useMotionTemplate`
              radial-gradient(
                150px circle at ${mouseX}px ${mouseY}px,
                black,
                transparent 80%
              )
            `,
            WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                150px circle at ${mouseX}px ${mouseY}px,
                black,
                transparent 80%
              )
            `,
          }}
        >
          <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#3b82f6,#a855f7,#ec4899,#f97316,#eab308,#14b8a6,#3b82f6)]" />
        </motion.div>
        <article className="relative z-10 flex h-full min-h-[8rem] w-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
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
        </article>
      </motion.div>
    </Link>
  )
}
