import type { Metadata, Viewport } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: {
    default: 'Paul Mothapo',
    template: '%s | Paul Mothapo'
  },
  description:
    'Paul Mothapo is a software engineer with a passion for building products that help people live better lives.',
  metadataBase: new URL('https://paulmothapo.co.za'),
  openGraph: {
    title: 'Paul Mothapo',
    description: 'Paul Mothapo is a software engineer with a passion for building products that help people live better lives.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paul Mothapo',
    description: 'Paul Mothapo is a software engineer with a passion for building products that help people live better lives.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NBP5FVKP');
          `}
        </Script>
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NBP5FVKP"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="white"
        >
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-outfit)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              <Header />
              <div id="main-content" tabIndex={-1}>
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
