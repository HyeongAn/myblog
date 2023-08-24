import { getPostData, getPostSlug } from '../../../../lib/ssg.module'
import { PostProps } from '../../../../types/props'

const Post = async ({ params }: PostProps) => {
  const { data, content } = await getPostData(params.slug)
  return (
    <>
      <div>
        <h1>{data.title}</h1>
        <span>{data.date}</span>
      </div>
      <div>
        <h4>{data.description}</h4>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </>
  )
}

export const getStaticPaths = () => {
  const path = getPostSlug()
  return {
    paths: path,
    fallback: false,
  }
}

export default Post
