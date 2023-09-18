import React from 'react'
import {
  ColumnLeftContainer,
  MainContainer,
  MainHeaderContainer,
  PostGridContainer,
  PostsListContainer,
  RowCenterContainer,
} from '../style/container'
import {
  CategorySkeletonCard,
  CategorySkeletonContainer,
  CategorySkeletonInfo,
  CategorySkeletonCardImage,
} from '../style/ui'
import { CarouselCardInfoContainer } from '../style/main'

const CategorySkeleton = () => {
  return (
    <>
      <MainContainer>
        <MainHeaderContainer>
          <RowCenterContainer>
            <h2 style={{ fontKerning: 'normal' }}>ALL POSTS.</h2>
          </RowCenterContainer>
          <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
            <CategorySkeletonContainer />
            <CategorySkeletonContainer />
          </div>
        </MainHeaderContainer>
        <PostsListContainer>
          <PostGridContainer>
            <CategorySkeletonCard>
              <CategorySkeletonCardImage />
              <CarouselCardInfoContainer>
                <ColumnLeftContainer style={{ gap: '10px' }}>
                  <CategorySkeletonInfo />
                  <CategorySkeletonInfo />
                </ColumnLeftContainer>
              </CarouselCardInfoContainer>
            </CategorySkeletonCard>
            <CategorySkeletonCard>
              <CategorySkeletonCardImage />
              <CarouselCardInfoContainer>
                <ColumnLeftContainer style={{ gap: '10px' }}>
                  <CategorySkeletonInfo />
                  <CategorySkeletonInfo />
                </ColumnLeftContainer>
              </CarouselCardInfoContainer>
            </CategorySkeletonCard>
            <CategorySkeletonCard>
              <CategorySkeletonCardImage />
              <CarouselCardInfoContainer>
                <ColumnLeftContainer style={{ gap: '10px' }}>
                  <CategorySkeletonInfo />
                  <CategorySkeletonInfo />
                </ColumnLeftContainer>
              </CarouselCardInfoContainer>
            </CategorySkeletonCard>
            <CategorySkeletonCard>
              <CategorySkeletonCardImage />
              <CarouselCardInfoContainer>
                <ColumnLeftContainer style={{ gap: '10px' }}>
                  <CategorySkeletonInfo />
                  <CategorySkeletonInfo />
                </ColumnLeftContainer>
              </CarouselCardInfoContainer>
            </CategorySkeletonCard>
          </PostGridContainer>
        </PostsListContainer>
      </MainContainer>
    </>
  )
}

export default CategorySkeleton
