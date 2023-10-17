'use client'
import React, { useEffect, useState } from 'react'
import { PostData, PostListProps } from '../../../../types/props'
import { PostGridContainer } from '@/components/style/container'
import PostCard from '@/components/home/posts/post-card'

const SuggestPage = ({ postData }: PostListProps) => {
  const [suggestPost, setSuggestPost] = useState<PostData[]>()
  useEffect(() => {
    setSuggestPost(postData.slice(0, 4))
  }, [])
  return (
    <>
      {suggestPost && suggestPost.length > 0 ? (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', maxWidth: '768px', marginTop: '200px' }}>
          <span
            style={{ fontSize: '24px', fontWeight: '700' }}
          >{`비슷한 포스트가 ${suggestPost.length}개 있어요.`}</span>
        </div>
      ) : null}
      <PostGridContainer style={{ maxWidth: '768px', marginTop: '20px' }}>
        {suggestPost && suggestPost.map((data, index) => <PostCard postData={data} key={`post-card-${index}`} />)}
      </PostGridContainer>
    </>
  )
}

export default SuggestPage
