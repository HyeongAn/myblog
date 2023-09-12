import Main from '@/components/home/main/main'
import { getCategoryId } from '../../../lib/ssg.module'

interface CategoryProps {
  params: { category: string }
}

const Category = ({ params }: CategoryProps) => {
  const { category } = params
  return (
    <>
      <Main />
    </>
  )
}

export const generateStaticParams = async () => {
  const categories = await getCategoryId()

  return categories.map((category) => {
    category: category.params.category.toString()
  })
}

export default Category
