'use client'
import { MainHeaderContainer, RowCenterContainer } from '@/components/style/container'
import { CategoryContainer, CategoryKey, CategoryValue, CategoryWrapper } from '@/components/style/category'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CategoryProps {
  categories: {
    [key: string]: number
  }
}

const MainHeader = ({ categories }: CategoryProps) => {
  const pathName = usePathname()

  function* outputCategory() {
    for (const [key, value] of Object.entries(categories)) {
      if (key === 'All Posts') {
        yield (
          <Link href={'/'} key={`category-${key}-${value}`}>
            <CategoryWrapper>
              <CategoryKey $isClicked={pathName === `/`}>{key}</CategoryKey>
              <CategoryValue $isClicked={pathName === `/`}>{`(${value})`}</CategoryValue>
            </CategoryWrapper>
          </Link>
        )
      } else {
        yield (
          <Link href={`/${key}`} key={`category-${key}-${value}`}>
            <CategoryWrapper>
              <CategoryKey $isClicked={pathName === `/${key}`}>{key}</CategoryKey>
              <CategoryValue $isClicked={pathName === `/${key}`}>{`(${value})`}</CategoryValue>
            </CategoryWrapper>
          </Link>
        )
      }
    }
  }

  return (
    <MainHeaderContainer>
      <RowCenterContainer>
        <h2 style={{ fontKerning: 'normal' }}>ALL POSTS.</h2>
      </RowCenterContainer>
      <CategoryContainer>{[...outputCategory()]}</CategoryContainer>
    </MainHeaderContainer>
  )
}

export default MainHeader
