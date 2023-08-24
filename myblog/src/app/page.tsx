import { ColumnCenterContainer, ColumnLeftContainer } from '@/components/style/container'
import Main from '../components/home/main'
import Slider from '@/components/home/slider'
import { getPosts } from '../../lib/ssg.module'

const Home = async () => {
  const postData = (await getPosts()).map((post) => post.data)
  return (
    <ColumnLeftContainer>
      <h1>{`👨🏻‍💻 YoonHu's Blog`}</h1>
      <ColumnCenterContainer style={{ padding: '10px' }}>
        <Main />
        <Slider postData={postData} />
      </ColumnCenterContainer>
    </ColumnLeftContainer>
  )
}

export default Home
