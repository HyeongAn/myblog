'use client'
import { MainBodyContainer } from '@/components/style/container'
import MainFeatured from './main-featured'
import { MainPostDataProps } from '../../../../types/props'
import MainIndex from './main-index'

const MainBody = ({ postData }: MainPostDataProps) => {
  return (
    <MainBodyContainer>
      <MainFeatured postData={postData} />
      <MainIndex postData={postData} />
    </MainBodyContainer>
  )
}

export default MainBody
