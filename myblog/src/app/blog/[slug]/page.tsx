import {
  ContentsContainer,
  PostContainer,
  TitleContainer,
} from '@/components/style/post'
import { getPostData, getPostSlug } from '../../../../lib/ssg.module'
import DetailPage from './detail-page'

interface PostProps {
  params: { slug: string }
}

const Post = async ({ params }: PostProps) => {
  const { data, content } = await getPostData(params.slug)
  return (
    <PostContainer style={{ margin: '0' }}>
      <TitleContainer>
        <h1>{data.title}</h1>
        <span>{data.date}</span>
      </TitleContainer>
      <DetailPage content={content} />
    </PostContainer>
  )
}

// export const getStaticPaths = async () => {
//   const path = await getPostSlug()
//   return {
//     paths: path,
//     fallback: false,
//   }
// }

export const generateStaticParams = async () => {
  const paths = await getPostSlug()
  return paths.map((path) => {
    slug: path.params.slug.toString()
  })
}
export default Post
