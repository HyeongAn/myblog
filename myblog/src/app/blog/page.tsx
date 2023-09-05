import { ColumnCenterContainer } from '@/components/style/container'
import { getPosts } from '../../../lib/ssg.module'
import PostList from '../../components/posts/post-list'

const Blog = async () => {
  const postData = await getPosts()

  return (
    <ColumnCenterContainer>
      <PostList postData={postData} />
    </ColumnCenterContainer>
  )
}

export default Blog
