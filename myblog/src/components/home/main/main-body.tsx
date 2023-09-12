'use client'
import { MainBodyContainer } from '@/components/style/container'
import MainFeatured from './main-featured'
import MainShorts from './main-shorts'
import { MainPostDataProps } from '../../../../types/props'

const MainBody = ({ postData }: MainPostDataProps) => {
  return (
    <MainBodyContainer>
      <MainFeatured postData={postData} />
      <MainShorts />
    </MainBodyContainer>
  )
}

export default MainBody
