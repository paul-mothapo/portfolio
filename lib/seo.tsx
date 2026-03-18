import type { Metadata } from 'next'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  WEBSITE_URL,
} from './constants'

type JsonLd =
  | Record<string, unknown>
  | Array<Record<string, unknown>>

type MetadataInput = {
  title?: string
  description?: string
  path?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

type CollectionItem = {
  name: string
  url: string
  description?: string
}

type ArticleInput = {
  title: string
  description: string
  path: string
  image?: string
}

type SoftwareSourceCodeInput = {
  name: string
  description: string
  path: string
  codeRepository: string
  keywords?: string[]
}

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, WEBSITE_URL).toString()
}

export function createMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
}: MetadataInput = {}): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return {
    title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title ?? SITE_NAME,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_ZA',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title ?? SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? SITE_NAME,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
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
}

export function JsonLd({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function buildPersonSchema(sameAs: string[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: WEBSITE_URL,
    description: DEFAULT_DESCRIPTION,
    jobTitle: 'Software Engineer',
    sameAs,
  }
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: WEBSITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en',
  }
}

export function buildWebPageSchema({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: absoluteUrl('/'),
  }
}

export function buildCollectionPageSchema({
  title,
  description,
  path,
  items,
}: {
  title: string
  description: string
  path: string
  items: CollectionItem[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(item.url),
        name: item.name,
        description: item.description,
      })),
    },
  }
}

export function buildArticleSchema({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: ArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: absoluteUrl(image),
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: WEBSITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      url: WEBSITE_URL,
    },
  }
}

export function createArticleMetadata({
  title,
  description,
  path,
  image,
}: ArticleInput) {
  return createMetadata({
    title,
    description,
    path,
    image,
    type: 'article',
    keywords: ['blog', 'article', 'software engineering'],
  })
}

export function buildSoftwareSourceCodeSchema({
  name,
  description,
  path,
  codeRepository,
  keywords = [],
}: SoftwareSourceCodeInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    url: absoluteUrl(path),
    codeRepository,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: WEBSITE_URL,
    },
    programmingLanguage: keywords,
  }
}
