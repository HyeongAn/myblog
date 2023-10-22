import Rss from 'rss'
import { getPosts } from './ssg.module'

const baseUrl = `https://yoonhu.vercel.app`

const generateRss = async () => {
  const posts = await getPosts()
  const date = new Date()
  const author = {
    name: 'yoonhu',
    email: 'ahsy92@naver.com',
    link: baseUrl,
  }

  const feed = new Rss({
    title: 'yoonhu blog',
    description: '공부한 것을 적어두고 기록해두는 yoonhu의 블로그입니다.',
    copyright: `All rights reserved ${date.getFullYear()}, yoonhu`,
    feed_url: `${baseUrl}/rss.xml`,
    site_url: baseUrl,
    language: 'ko',
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
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
  // fs.writeFileSync('./src/app/rss.xml', feed.rss2())
  // fs.writeFileSync('./src/app/rss.json', feed.json1())
}

export default generateRss
