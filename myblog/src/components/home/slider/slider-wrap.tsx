import { getPosts } from '../../../../lib/ssg.module'
import Slider from './slider'

const SliderWrap = async () => {
  const postData = await getPosts()
  return (
    <>
      <Slider postData={postData} />
    </>
  )
}

export default SliderWrap
