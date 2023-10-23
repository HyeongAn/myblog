import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import Rss from 'rss'

const baseUrl = `https://yoonhu.vercel.app`

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

export const generateRss = async () => {
  try {
    const posts = await getPosts()
    const date = new Date()

    const feed = new Rss({
      title: 'yoonhu blog',
      description: '공부한 것을 적어두고 기록해두는 yoonhu의 블로그입니다.',
      copyright: `All rights reserved ${date.getFullYear()}, yoonhu`,
      feed_url: `${baseUrl}/rss.xml`,
      site_url: baseUrl,
      language: 'ko',
      pubDate: new Date(),
    })

    posts.forEach((post) => {
      const url = `${baseUrl}/${post.data.category}/${post.slug}`
      feed.item({
        title: post.data.title,
        url,
        description: post.data.description,
        author: 'yoonhu',
        guid: url,
        date: new Date(post.data.date.replace('/', '-')),
        custom_elements: [{ 'content:encoded': post.content }],
      })
    })

    return feed.xml()
  } catch (err) {
    console.error('Error generating Rss feed', err)
    return null
  }
}
