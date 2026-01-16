'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import ArrowBack from '@/components/ui/ArrowBack'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  return (
    <header className="mb-8 flex items-center justify-between" role="banner">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Paul Mothapo - Go to homepage">
          <Image src="/Roboto.png" alt="" width={60} height={60} aria-hidden="true" />
        </Link>
        <div className="flex flex-col">
          <Link href="/" className="font-medium text-black dark:text-white">
            Paul Mothapo
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-zinc-600 dark:text-zinc-500"
            delay={0.5}
            aria-label="Software Engineer"
          >
            Software Engineer
          </TextEffect>
        </div>
      </div>
      {!isHomePage && (
        <nav className="flex items-center gap-4" aria-label="Page navigation">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            aria-label="Go back to previous page"
          >
            <ArrowBack aria-hidden="true" />
            <span>Back</span>
          </button>
          <Link 
            href="/"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Home
          </Link>
        </nav>
      )}
    </header>
  )
}
