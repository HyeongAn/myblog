import { getCategory, getCategoryId, getPosts } from '../../../lib/ssg.module'
import SlideMenuProfile from '@/components/slidemenu/slide-menu-profile'
import { MainContainer, PostsListContainer } from '@/components/style/container'
import MainHeader from '@/components/home/main/main-header'
import Posts from '@/components/home/posts/posts'

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

export default Category
