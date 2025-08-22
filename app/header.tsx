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
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.png" alt="Paul Mothapo" width={60} height={60} />
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
          >
            Software Engineer
          </TextEffect>
        </div>
      </div>
      {!isHomePage && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowBack />
            Back
          </button>
          <Link 
            href="/"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Home
          </Link>
        </div>
      )}
    </header>
  )
}
