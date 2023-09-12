import { getCategory } from '../../../../lib/ssg.module'
import { MainContainer } from '../../style/container'
import MainHeader from './main-header'

const Main = async () => {
  const categories = await getCategory()
  return (
    <MainContainer>
      <MainHeader categories={categories} />
    </MainContainer>
  )
}

export default Main
