import React from 'react'
import {
  ColumnContainer,
  ColumnLeftContainer,
  MainBodyContainer,
  MainContainer,
  MainHeaderContainer,
  PostGridContainer,
  PostsListContainer,
  RowCenterContainer,
  RowLeftContainer,
} from '../style/container'
import {
  CategorySkeletonCard,
  CategorySkeletonCardImage,
  CategorySkeletonCarousel,
  CategorySkeletonContainer,
  CategorySkeletonIndexBody,
  CategorySkeletonInfo,
  CategorySkeletonMainCarousel,
  CategorySkeletonTitle,
} from '../style/ui'
import {
  CarouselCardContainer,
  CarouselCardInfoContainer,
  CarouselContainer,
  IndexContainer,
  IndexHeader,
  MainFeatureBody,
  MainFeatureHead,
} from '../style/main'
import SlideMenuProfile from '../slidemenu/slide-menu-profile'

const MainSkeleton = () => {
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
        <MainHeaderContainer>
          <RowCenterContainer>
            <h2>ALL POSTS.</h2>
          </RowCenterContainer>
          <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
            <CategorySkeletonContainer />
            <CategorySkeletonContainer />
          </div>
        </MainHeaderContainer>

        <MainBodyContainer>
          <ColumnContainer style={{ maxWidth: '660px' }}>
            <MainFeatureHead>
              <h2 style={{ fontSize: '36px', margin: '0', fontStyle: 'italic' }}>Featured.</h2>
            </MainFeatureHead>
            <MainFeatureBody>
              <CarouselContainer style={{ marginTop: '20px', position: 'relative' }}>
                <CategorySkeletonMainCarousel>
                  <CategorySkeletonCarousel />
                  <CarouselCardInfoContainer>
                    <ColumnLeftContainer style={{ gap: '10px' }}>
                      <CategorySkeletonInfo />
                      <CategorySkeletonTitle style={{ margin: '10px 0 35px 0' }} />
                    </ColumnLeftContainer>
                  </CarouselCardInfoContainer>
                </CategorySkeletonMainCarousel>
              </CarouselContainer>
            </MainFeatureBody>
          </ColumnContainer>
          <IndexContainer>
            <IndexHeader>Lately.</IndexHeader>
            <CategorySkeletonIndexBody>
              <ul>
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
            </CategorySkeletonIndexBody>
          </IndexContainer>
        </MainBodyContainer>
      </MainContainer>

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
      <SlideMenuProfile />
    </div>
  )
}

export default MainSkeleton
