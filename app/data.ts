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
    company: 'Mirathi',
    description: ',building scalable software and distributed systems.',
    link: 'https://mirathi.co',
  },
  {
    company: 'Movemates',
    description: ',developing the infrastructure for a logistics platform.',
    link: 'https://movemates.co.za',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'How Systems Develop Intentionality Through Pure Action Sequencing',
    description: 'A plain-language explanation of what emergent intentionality research is trying to prove, and why adaptation without explicit reasoning matters.',
    link: '/blog/p/how-systems-develop-intentionality-through-pure-action-sequencing',
    uid: 'blog-11',
    image: 'https://images.unsplash.com/photo-1771924310799-930349452c76?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Note Data Format: A Lightweight Structured Data Format',
    description: 'Note Data Format (NDF) is a lightweight structured data format designed for human-readable notes and efficient machine parsing.',
    link: '/blog/p/note-data-format-a-lightweight-structured-data-format',
    uid: 'blog-10',
    image: 'https://images.unsplash.com/photo-1759583545970-0106ff47353f?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Improving Application Performance: From Database Optimization to ORM Removal',
    description: 'How I took a sluggish recruitment system and made it fly by optimizing SQL, ditching the ORM, and pushing the limits with some serious stress testing.',
    link: '/blog/p/optimizing-application-performance-from-db-to-orm',
    uid: 'blog-9',
    image: 'https://images.unsplash.com/photo-1708559348128-3cde89847e2b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Migrating from Webpack to Vite: How We Slashed Build Times by 70%',
    description: 'When your application demands 8GB of memory just to build, something has gone wrong. This is the story of hitting the scalability wall with CRA and Webpack, and how Vite transformed our deployment pipeline.',
    link: '/blog/p/migrating-from-webpack-to-vite',
    uid: 'blog-8',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Breaking Free from Tight Coupling: The Power of Dependency Injection',
    description: 'As codebases grow, tight coupling makes testing difficult and refactoring risky. Dependency injection offers a path forward—a way to build flexible, testable systems that can adapt as requirements change.',
    link: '/blog/p/dependency-injection',
    uid: 'blog-7',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'AI Engineering: Integrating Intelligence into Applications',
    description: 'AI Engineering bridges machine learning and production software. Learn how to seamlessly integrate AI capabilities into applications to create genuinely better user experiences.',
    link: '/blog/p/ai-engineering-integrating-intelligence-into-applications',
    uid: 'blog-6',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
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

const blogUidToNumber = (uid: string) => {
  const match = uid.match(/\d+/)
  return match ? Number(match[0]) : 0
}

export const BLOG_POSTS_SORTED: BlogPost[] = [...BLOG_POSTS].sort((a, b) => {
  const diff = blogUidToNumber(b.uid) - blogUidToNumber(a.uid)
  if (diff !== 0) return diff
  return a.title.localeCompare(b.title)
})

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
