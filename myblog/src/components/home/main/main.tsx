import { getCategory, getPosts } from '../../../../lib/ssg.module'
import { MainContainer } from '../../style/container'
import MainBody from './main-body'
import MainHeader from './main-header'

const Main = async () => {
  const categories = await getCategory()
  const postData = await getPosts()
  return (
    <MainContainer>
      <MainHeader categories={categories} />
      <MainBody postData={postData} />
    </MainContainer>
  )
}

export default Main
