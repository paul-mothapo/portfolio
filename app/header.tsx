'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import ArrowBack from '@/components/ui/ArrowBack'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="mb-8 flex items-center justify-between" role="banner">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Paul Mothapo - Go to homepage">
          <Image
            src="/me.png"
            alt=""
            width={60}
            height={60}
            aria-hidden="true"
            className="rounded-full"
          />
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
      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
        aria-label="Open navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
      >
        Menu
      </button>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
        >
          <div className="absolute inset-0 bg-zinc-950/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,63,70,0.4),_transparent_55%)]" />
          <div
            id="mobile-nav"
            className="relative flex h-full flex-col px-6 pb-10 pt-6 text-zinc-100"
          >
            <div className="mx-auto flex h-full w-full max-w-md flex-col p-4 md:max-w-xl lg:max-w-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                    Navigation
                  </p>
                  <h2
                    id="mobile-nav-title"
                    className="mt-2 text-2xl font-semibold text-white"
                  >
                    Where to next?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:bg-white/10"
                  aria-label="Close navigation menu"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src="/gifs/what.gif"
                  alt="Animated thought bubble"
                  className="h-32 w-52 border border-white/10 object-cover"
                />
                <p className="text-sm text-zinc-300">
                  A quiet doorway into the rest of the site.
                </p>
              </div>

              <nav className="mt-12 flex flex-1 flex-col gap-5 text-2xl font-semibold">
                {!isHomePage && (
                  <>
                    <button
                      onClick={() => router.back()}
                      className="flex items-center gap-3 text-left text-zinc-100 transition hover:text-white"
                      aria-label="Go back to previous page"
                    >
                      <ArrowBack aria-hidden="true" />
                      <span>Back</span>
                    </button>
                    <Link
                      href="/"
                      className="group flex items-center justify-between text-zinc-100 transition hover:text-white hover:underline hover:underline-offset-4"
                    >
                      <span>Home</span>
                      <ArrowRight className="h-5 w-5 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </>
                )}
                <Link
                  href="/chat"
                  className={cn(
                    "group flex items-center justify-between text-zinc-100 transition hover:text-white hover:underline hover:underline-offset-4",
                    pathname === '/chat' && "text-blue-300",
                  )}
                >
                  <span>Chat</span>
                  <ArrowRight className="h-5 w-5 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
                <Link
                  href="/blog"
                  className="group flex items-center justify-between text-zinc-100 transition hover:text-white hover:underline hover:underline-offset-4"
                >
                  <span>Blog</span>
                  <ArrowRight className="h-5 w-5 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
                <Link
                  href="/thoughts"
                  className="group flex items-center justify-between text-zinc-100 transition hover:text-white hover:underline hover:underline-offset-4"
                >
                  <span>Thoughts</span>
                  <ArrowRight className="h-5 w-5 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              </nav>

              <div className="mt-8 text-sm text-zinc-400">
                Press the close button to return to where you were.
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
