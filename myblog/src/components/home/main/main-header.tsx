import { MainHeaderContainer, RowCenterContainer } from '@/components/style/container'
import { getCategory } from '../../../../lib/ssg.module'
import { CategoryContainer, CategoryKey, CategoryValue, CategoryWrapper } from '@/components/style/category'
import Link from 'next/link'

const MainHeader = async () => {
  const categories = await getCategory()

  function* outputCategory() {
    for (const [key, value] of Object.entries(categories)) {
      yield (
        <CategoryWrapper>
          <CategoryKey isAll={key === 'ALL POSTS'}>{key}</CategoryKey>
          <CategoryValue isAll={key === 'ALL POSTS'}>{`(${value})`}</CategoryValue>
        </CategoryWrapper>
      )
    }
  }

  return (
    <MainHeaderContainer>
      <RowCenterContainer>
        <h2>ALL POSTS.</h2>
      </RowCenterContainer>
      <CategoryContainer>{[...outputCategory()]}</CategoryContainer>
    </MainHeaderContainer>
  )
}

export default MainHeader
