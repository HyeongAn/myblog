import Main from '@/components/home/main/main'
import { getCategoryId } from '../../../lib/ssg.module'
import SlideMenuProfile from '@/components/slidemenu/slide-menu-profile'
import SliderWrap from '@/components/home/slider/slider-wrap'

interface CategoryProps {
  params: { category: string }
}

const Category = ({ params }: CategoryProps) => {
  return (
    <div className="home">
      <Main />
      <SliderWrap />
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
