'use client'
import { MainHeaderContainer, RowCenterContainer } from '@/components/style/container'
import { CategoryContainer, CategoryKey, CategoryValue, CategoryWrapper } from '@/components/style/category'
import Link from 'next/link'

interface CategoryProps {
  categories: {
    [key: string]: number
  }
}

const MainHeader = ({ categories }: CategoryProps) => {
  function* outputCategory() {
    for (const [key, value] of Object.entries(categories)) {
      yield (
        <CategoryWrapper key={`category-${key}-${value}`}>
          <CategoryKey>{key}</CategoryKey>
          <CategoryValue>{`(${value})`}</CategoryValue>
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
