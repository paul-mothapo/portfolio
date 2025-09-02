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
    company: 'Prefer not to say',
    description: 'developing scalable software solutions and distributed systems architecture',
    link: '/',
  },
  {
    company: 'Movemates',
    description: 'building the technical infrastructure for a logistics platform that facilitates seamless relocations, from single items to entire office moves',
    link: 'https://movemates.co.za',
  },
  {
    company: 'MockLock',
    description: 'an open source organization where I architect and maintain developer tools and frameworks including VizCore (data visualization), CronSync (distributed job scheduling), LogLog-Core (logging system), and Pauljs (web framework)',
    link: 'https://github.com/orgs/mocklock-org/repositories',
  },
  {
    company: 'Cherry-Pick',
    description: 'a comprehensive enterprise database intelligence system in Go that provides analysis, monitoring, security assessment, and optimization for MySQL, PostgreSQL, SQLite, and MongoDB',
    link: 'https://github.com/paul-mothapo/cherry-pick',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Mastering Modular Architecture with Monorepos',
    description: 'Modern software development demands scalable, maintainable architectures. Discover how modular design combined with monorepo patterns creates powerful foundations for enterprise applications.',
    link: '/blog/p/mastering-modular-architecture-with-monorepos',
    uid: 'blog-5',
    image: 'https://images.unsplash.com/photo-1753454116483-417bbc0a975c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'The Importance of Product-Market Fit',
    description: 'Product-market fit is the foundation of a successful product. It is the ability of a product to meet the needs of its target market.',
    link: '/blog/p/the-importance-of-product-market-fit',
    uid: 'blog-4',
    image: 'https://images.unsplash.com/photo-1697446862453-6b318ec6e497?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'What Limits the Growth of a Product?',
    description: 'Product growth is often limited not by the quality of the product itself, but by various internal and external factors.',
    link: '/blog/p/what-limits-the-growth-of-a-product',
    uid: 'blog-3',
    image: 'https://images.unsplash.com/photo-1659302615162-4bc8bb0e3e84?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'What Makes a Good Product?',
    description: 'Creating a successful product goes beyond just functionality.',
    link: '/blog/p/what-makes-a-good-product',
    uid: 'blog-2',
    image: 'https://images.unsplash.com/photo-1729938660612-87daeb4d3b63?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Exploring Best Practices of Software Design',
    description: 'Design patterns and principles are the cornerstone of maintainable, scalable software',
    link: '/blog/p/exploring-best-practices-of-software-design',
    uid: 'blog-1',
    image: 'https://lh3.googleusercontent.com/tG6-MqdlvhQ-z7ENzGxR-kpGPPdPHbJ8UZtbTP66Rxi0UftTFU1yAvaBCVuigYuKvESMeEFf4jqNBVENFcZXEUnj8SSqj8zsop8UHAl0eD9A-hUCvQ=w2144-h1206-n-nu-rw'
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
