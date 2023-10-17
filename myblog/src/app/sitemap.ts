import { MetadataRoute } from 'next'
import { getCategory, getPosts } from '../../lib/ssg.module'

interface SitemapProps {
  url: string
  lastModified?: string | Date | undefined
}

const Sitemap = async (): Promise<{ url: string; lastModified?: string | Date | undefined }[]> => {
  const baseUrl = `https://yoonhu.vercel.app`

  const postData = await getPosts()
  const allCategories = await getCategory()
  const categories = Object.keys(allCategories)
  const results: SitemapProps[] = []

  for (let i = 0; i < categories.length; i++) {
    const categoryPost = postData.filter((post) => post.data.category === categories[i])

    for (let j = 0; j < categoryPost.length; j++) {
      results.push({
        url: `${baseUrl}/${categories[i]}/${categoryPost[j].slug}`,
        lastModified: new Date(categoryPost[j].data.date.replace('/', ',')),
      })
    }
  }

  return results
}

export default Sitemap
