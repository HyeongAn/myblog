import Main from '@/components/home/main/main'
import { getCategory, getCategoryId, getPosts } from '../../../lib/ssg.module'
import SlideMenuProfile from '@/components/slidemenu/slide-menu-profile'
import SliderWrap from '@/components/home/slider/slider-wrap'
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
    <div className="home">
      <MainContainer>
        <MainHeader categories={categories} />
      </MainContainer>
      <PostsListContainer>
        <Posts postData={postData} />
      </PostsListContainer>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <SlideMenuProfile />
      </div>
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
