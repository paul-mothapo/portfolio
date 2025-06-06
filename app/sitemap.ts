import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'app/blog')
  const entries = fs.readdirSync(blogDir, { withFileTypes: true })
  
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => ({
      url: `https://paulmothapo.co.za/blog/${entry.name}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts()
  
  const routes = [
    {
      url: 'https://paulmothapo.co.za',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...blogPosts,
  ]

  return routes
} 