import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { WEBSITE_URL } from '@/lib/constants'

function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'app/blog/p')
  const entries = fs.readdirSync(blogDir, { withFileTypes: true })
  
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => {
      const pagePath = path.join(blogDir, entry.name, 'page.mdx')

      return {
      url: `${WEBSITE_URL}/blog/p/${entry.name}`,
      lastModified: fs.statSync(pagePath).mtime,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      }
    })
}

function getMoreRoutes() {
  const moreDir = path.join(process.cwd(), 'app/more')
  const entries = fs.readdirSync(moreDir, { withFileTypes: true })
  
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => {
      const pagePath = path.join(moreDir, entry.name, 'page.tsx')

      return {
      url: `${WEBSITE_URL}/more/${entry.name}`,
      lastModified: fs.statSync(pagePath).mtime,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      }
    })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts()
  const moreRoutes = getMoreRoutes()
  const appDir = path.join(process.cwd(), 'app')
  
  const routes = [
    {
      url: WEBSITE_URL,
      lastModified: fs.statSync(path.join(appDir, 'page.tsx')).mtime,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${WEBSITE_URL}/thoughts`,
      lastModified: fs.statSync(path.join(appDir, 'thoughts', 'page.tsx')).mtime,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${WEBSITE_URL}/blog`,
      lastModified: fs.statSync(path.join(appDir, 'blog', 'page.tsx')).mtime,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...blogPosts,
    ...moreRoutes,
  ]

  return routes
} 
