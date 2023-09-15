import { getPosts } from '../../../../lib/ssg.module'
import { PostsListContainer } from '@/components/style/container'
import Posts from './posts'

const PostList = async () => {
  const postData = await getPosts()

  return (
    <PostsListContainer>
      <Posts postData={postData} />
    </PostsListContainer>
  )
}

export default PostList
