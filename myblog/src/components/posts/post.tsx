'use client'
import Image from 'next/image'
import { PostProps } from '../../../types/props'
import { FlexibleImageContainer, RowLeftContainer } from '../style/container'
import {
  PostContentContainer,
  PostContents,
  PostFlexContainer,
} from '../style/post'
import { useEffect, useState } from 'react'

const Post = ({ postData }: PostProps) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  return (
    <PostContentContainer>
      <PostFlexContainer>
        <FlexibleImageContainer>
          <Image
            src={postData.data.coverImage}
            alt="post coverImage"
            layout="fill"
            objectFit="contain"
          />
        </FlexibleImageContainer>
        <PostContents>
          <h1>{postData.data.title}</h1>
          <span>{postData.data.description}</span>
        </PostContents>
      </PostFlexContainer>
    </PostContentContainer>
  )
}

export default Post
