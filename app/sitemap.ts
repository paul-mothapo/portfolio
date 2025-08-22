import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'app/blog/p')
  const entries = fs.readdirSync(blogDir, { withFileTypes: true })
  
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => ({
      url: `https://paulmothapo.co.za/blog/p/${entry.name}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
}

function getMoreRoutes() {
  const moreDir = path.join(process.cwd(), 'app/more')
  const entries = fs.readdirSync(moreDir, { withFileTypes: true })
  
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => ({
      url: `https://paulmothapo.co.za/more/${entry.name}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts()
  const moreRoutes = getMoreRoutes()
  
  const routes = [
    {
      url: 'https://paulmothapo.co.za',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://paulmothapo.co.za/blog/p',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...blogPosts,
    ...moreRoutes,
  ]

  return routes
} 