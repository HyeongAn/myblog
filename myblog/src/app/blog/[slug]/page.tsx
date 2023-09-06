import { PostContainer, TitleContainer } from '@/components/style/post'
import { getPostData, getPostSlug } from '../../../../lib/ssg.module'
import DetailPage from './detail-page'
import { Metadata } from 'next'

interface PostProps {
  params: { slug: string }
}

const Post = async ({ params }: PostProps) => {
  const { data, content } = await getPostData(params.slug)
  return (
    <PostContainer style={{ margin: '0' }}>
      <TitleContainer>
        <h1>{data.title}</h1>
        <span>{data.date}</span>
      </TitleContainer>
      <DetailPage content={content} />
    </PostContainer>
  )
}

export const generateStaticParams = async () => {
  const paths = await getPostSlug()
  return paths.map((path) => {
    slug: path.params.slug.toString()
  })
}

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const { data } = await getPostData(params.slug)
  return {
    title: data.title,
    description: data.description,
    authors: { name: 'yoonhu' },
    generator: 'Next.js',
    creator: 'yoonhu',
    publisher: 'Vercel',
    keywords: data.keywords,
    verification: { google: 'kRu5kbZA9fbwfFBkXI_jDIKKgfLjTRu04O_eGfG42Ok' },
    openGraph: {
      url: `https://yoonhu.vercel.app/blog/${params.slug}`,
      siteName: 'yoonhu blog',
      title: data.title,
      description: data.description,
      images: data.coverImage,
      locale: 'ko_KR',
      type: 'article',
      authors: 'yoonhu',
      publishedTime: data.date,
    },
  }
}

export default Post
