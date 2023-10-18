import { MetadataRoute } from 'next'
import { getCategory, getPosts } from '../../lib/ssg.module'
import { PostData } from '../../types/props'

const baseUrl = `https://yoonhu.vercel.app`

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const postData = await getPosts()
  const allCategories = await getCategory()
  const categories = Object.keys(allCategories)

  const generateSitemap = async (
    baseUrl: string,
    postData: PostData[],
    categories: string[],
    index = 0,
    results: MetadataRoute.Sitemap = []
  ): Promise<MetadataRoute.Sitemap> => {
    if (index >= categories.length) {
      return results
    }

    const category = categories[index]
    const categoryPosts = postData.filter((post) => post.data.category === category)

    if (category === 'All Posts') {
      results.push({
        url: `${baseUrl}`,
        lastModified: new Date(),
      })
    } else {
      results.push({
        url: `${baseUrl}/${category}}`,
        lastModified: new Date(),
      })
    }

    for (let j = 0; j < categoryPosts.length; j++) {
      results.push({
        url: `${baseUrl}/${category}/${categoryPosts[j].slug}`,
        lastModified: new Date(categoryPosts[j].data.date.replace('/', ',')),
      })
    }
    return generateSitemap(baseUrl, postData, categories, index + 1, results)
  }

  return await generateSitemap(baseUrl, postData, categories)
}

export default Sitemap
