import React from 'react'
import { ContentsContainer, PostContainer, RowLeftContainer, TitleContainer } from '../style/container'
import { CategorySkeletonContents, CategorySkeletonInfo, CategorySkeletonTitle } from '../style/ui'

const PostSkeleton = () => {
  return (
    <PostContainer style={{ margin: '0' }}>
      <TitleContainer>
        <CategorySkeletonTitle />
        <RowLeftContainer style={{ width: '200px' }}>
          <CategorySkeletonInfo />
        </RowLeftContainer>
      </TitleContainer>
      <ContentsContainer style={{ maxWidth: '768px' }}>
        <CategorySkeletonContents />
      </ContentsContainer>
    </PostContainer>
  )
}

export default PostSkeleton
