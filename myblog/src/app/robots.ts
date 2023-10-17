import { MetadataRoute } from 'next'

const Robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/lib',
    },
    sitemap: ['https://yoonhu.vercel.app/sitemap.xml'],
  }
}

export default Robots
