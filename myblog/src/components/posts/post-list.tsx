'use client'
import { RowLeftContainer } from '@/components/style/container'
import { useRouter } from 'next/navigation'
import { PostListProps } from '../../../types/props'
import Post from './post'
import { PostListContainer } from '../style/post'

const PostList = ({ postData }: PostListProps) => {
  const router = useRouter()

  return (
    <>
      <RowLeftContainer
        style={{
          width: '90%',
          margin: '40px 0 20px 0',
          paddingBottom: '10px',
          borderBottom: '1px solid rgb(102 102 102 / 20%)',
        }}
      >
        <p style={{ fontSize: '40px', fontWeight: '700' }}>Posts</p>
      </RowLeftContainer>
      <PostListContainer>
        {postData.map((data, index) => {
          // 마지막 밑줄 지우기
          if (postData.length - 1 === index) {
            return (
              <li
                style={{ border: 'none' }}
                key={`post-slug-${index}`}
                onClick={() => {
                  router.push(`/blog/${data.slug}`)
                }}
              >
                <Post
                  postData={data}
                  params={{
                    slug: `${data.slug}`,
                  }}
                />
              </li>
            )
          }

          // 마지막이 아닐경우
          return (
            <li
              key={`post-slug-${index}`}
              onClick={() => {
                router.push(`/blog/${data.slug}`)
              }}
            >
              <Post
                postData={data}
                params={{
                  slug: `${data.slug}`,
                }}
              />
            </li>
          )
        })}
      </PostListContainer>
    </>
  )
}

export default PostList
