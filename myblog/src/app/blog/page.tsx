import { getPosts } from '../../../lib/ssg.module'
import Link from 'next/link'

const PostList = async () => {
  const postData = await getPosts()
  return (
    <>
      <h2>Posts</h2>
      <ul>
        {postData.map((post, index) => {
          return (
            <li key={`post-slug-${index}`}>
              <Link href={`/blog/${post.slug}`}>{post.data.title}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default PostList
