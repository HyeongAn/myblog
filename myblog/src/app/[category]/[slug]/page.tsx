import { getCategoryId, getCategoryPost, getPostData, getPostSlug } from '../../../../lib/ssg.module'
import DetailPage from './detail-page'
import { Metadata } from 'next'
import { PostContainer, RowLeftContainer, TitleContainer } from '@/components/style/container'
import { CarouselRoundDiv } from '@/components/style/main'

interface PostProps {
  params: { category: string; slug: string }
}

const Post = async ({ params }: PostProps) => {
  const { data, content } = await getPostData(params.slug)
  return (
    <PostContainer style={{ margin: '0' }}>
      <TitleContainer>
        <h1 style={{ marginBottom: '15px' }}>{data.title}</h1>
        <RowLeftContainer style={{ gap: '10px' }}>
          <CarouselRoundDiv>{data.category}</CarouselRoundDiv>
          <span style={{ color: '#202125', marginTop: 'auto' }}>{data.date}</span>
        </RowLeftContainer>
      </TitleContainer>
      <DetailPage content={content} />
    </PostContainer>
  )
}

export const generateStaticParams = async () => {
  const categories = await getCategoryId()
  const params: { category: string; slug: string }[] = []

  for (const category of categories) {
    const posts = await getCategoryPost(category.params.category)
    for (const post of posts) {
      params.push({ category: category.params.category.toString(), slug: post.replace('.md', '').toString() })
    }
  }
  return params
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
      url: `https://yoonhu.vercel.app/blog/${params.category}/${params.slug}`,
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
