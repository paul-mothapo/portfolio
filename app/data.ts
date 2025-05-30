type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
  image: string
}

type SocialLink = {
  label: string
  link: string
}

type CurrentWork = {
  company: string
  description: string
  link: string
}

export const CURRENT_WORK: CurrentWork[] = [
  {
    company: 'Aurum Wealth',
    description: 'a wealth science company focused on personalized legacy planning',
    link: 'https://aurumwealth.ai',
  },
  {
    company: 'Movemates',
    description: 'a company designed to facilitate seamless relocations, whether moving a single item or an entire office',
    link: 'https://movemates.co.za',
  },
  {
    company: 'MockLock',
    description: 'a free developer toolkit featuring API testing, a simplified editor, security utilities, test data generation, and color palette tools',
    link: 'https://mocklock.vercel.app',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring Best Practices of Software Design',
    description: 'Design patterns and principles are the cornerstone of maintainable, scalable software',
    link: '/blog/exploring-best-practices-of-software-design',
    uid: 'blog-1',
    image: 'https://lh3.googleusercontent.com/tG6-MqdlvhQ-z7ENzGxR-kpGPPdPHbJ8UZtbTP66Rxi0UftTFU1yAvaBCVuigYuKvESMeEFf4jqNBVENFcZXEUnj8SSqj8zsop8UHAl0eD9A-hUCvQ=w2144-h1206-n-nu-rw'
  },
  {
    title: 'What Makes a Good Product?',
    description: 'Creating a successful product goes beyond just functionality.',
    link: '/blog/what-makes-a-good-product',
    uid: 'blog-2',
    image: 'https://images.unsplash.com/photo-1729938660612-87daeb4d3b63?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/paul-mothapo',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/paulmothapo',
  },
]

export const EMAIL = 'paulmothapo.personal@gmail.com'
