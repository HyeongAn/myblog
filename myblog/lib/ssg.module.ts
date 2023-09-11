import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import { cache } from 'react'

export const getPosts = async () => {
  const filePath = path.join(process.cwd(), '__posts')
  const files = fs.readdirSync(filePath)
  const posts = files
    .map((file) => {
      const post = fs.readFileSync(path.join(filePath, file), 'utf8')
      const { data, content } = matter(post)
      const slug = file.replace('.md', '')
      const parseContent = unified().use(markdown).use(remark2rehype).use(html).processSync(content)
      return {
        slug,
        data,
        content: parseContent.value,
      }
    })
    .sort((a, b) => (a.data.date > b.data.date ? -1 : 1))
  return posts
}

export const getPostData = cache(async (slug: string) => {
  const filePath = path.join(process.cwd(), '__posts', `${slug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const parseContent = unified().use(markdown).use(remark2rehype).use(html).processSync(content)

  return {
    slug,
    data,
    content: parseContent.value,
  }
})

export const getPostSlug = async () => {
  const filePath = path.join(process.cwd(), '__posts')
  const files = await fs.readdirSync(filePath).map((file) => {
    return {
      params: {
        slug: file.replace('.md', ''),
      },
    }
  })
  return files
}

export const getCategory = async () => {
  const filePath = path.join(process.cwd(), '__posts')
  const files = fs.readdirSync(filePath)
  let category: { [key: string]: number } = {}
  const categories: string[] = files.map((file) => {
    const post = fs.readFileSync(path.join(filePath, file), 'utf8')
    const { data } = matter(post)
    return data.category
  })

  categories.forEach((index) => {
    category[index] = (category[index] || 0) + 1
  })

  category = { 'ALL POSTS': categories.length, ...category }
  return category
}
