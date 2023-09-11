import { MainContainer } from '@/components/style/container'
import { getPosts } from '../../../lib/ssg.module'
import PostList from '../../components/posts/post-list'

const Blog = async () => {
  const postData = await getPosts()

  return (
    <MainContainer>
      <PostList postData={postData} />
    </MainContainer>
  )
}

export default Blog
