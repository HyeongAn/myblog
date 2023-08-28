import { ColumnCenterContainer, ColumnLeftContainer } from '@/components/style/container'
import Main from '../components/home/main'
import Slider from '@/components/home/slider'
import { getPosts } from '../../lib/ssg.module'

const Home = async () => {
  const postData = (await getPosts()).map((post) => post.data)
  return (
    <ColumnCenterContainer style={{ height: '100%' }}>
      <Main />
      <Slider postData={postData} />
    </ColumnCenterContainer>
  )
}

export default Home
