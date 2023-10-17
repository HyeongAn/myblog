import { getCategory, getCategoryId, getPosts } from '../../../lib/ssg.module'
import SlideMenuProfile from '@/components/slidemenu/slide-menu-profile'
import { MainContainer, PostsListContainer } from '@/components/style/container'
import MainHeader from '@/components/home/main/main-header'
import Posts from '@/components/home/posts/posts'
import { Metadata } from 'next'

interface CategoryProps {
  params: { category: string }
}

const Category = async ({ params }: CategoryProps) => {
  const categories = await getCategory()
  const postData = (await getPosts()).filter((post) => post.data.category === params.category)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MainContainer>
        <MainHeader categories={categories} />
      </MainContainer>
      <PostsListContainer>
        <Posts postData={postData} />
      </PostsListContainer>
      <SlideMenuProfile />
    </div>
  )
}

export const generateStaticParams = async () => {
  const categories = await getCategoryId()

  return categories.map((category) => {
    category: category.params.category.toString()
  })
}

export const generateMetadata = async ({ params }: CategoryProps): Promise<Metadata> => {
  return {
    title: `yoonhu blog`,
    description: `yoonhu blog ${params.category}에 관한 글을 적어둡니다`,
    authors: { name: 'yoonhu' },
    generator: 'Next.js',
    creator: 'yoonhu',
    publisher: 'Vercel',
    verification: { google: 'kRu5kbZA9fbwfFBkXI_jDIKKgfLjTRu04O_eGfG42Ok' },
    openGraph: {
      url: `https://yoonhu.vercel.app/blog/${params.category}`,
      siteName: 'yoonhu blog',
      title: `yoonhu blog`,
      description: `yoonhu blog ${params.category}에 관한 글을 적어둡니다`,
      images: 'https://yoonhu.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.bf63779c.jpg&w=3840&q=75',
      locale: 'ko_KR',
      type: 'article',
      authors: 'yoonhu',
    },
  }
}

export default Category
