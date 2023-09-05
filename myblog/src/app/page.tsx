import {
  ColumnCenterContainer,
  ColumnContainer,
} from '@/components/style/container'
import Main from '../components/home/main'
import Slider from '@/components/home/slider'
import { getPosts } from '../../lib/ssg.module'

const Home = async () => {
  const postData = await getPosts()

  return (
    <ColumnContainer style={{ height: '100%' }}>
      <Main />
      <ColumnCenterContainer>
        <Slider postData={postData} />
      </ColumnCenterContainer>
    </ColumnContainer>
  )
}

export default Home
