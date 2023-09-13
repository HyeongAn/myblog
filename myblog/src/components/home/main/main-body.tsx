'use client'
import { MainBodyContainer } from '@/components/style/container'
import MainFeatured from './main-featured'
import { MainPostDataProps } from '../../../../types/props'
import MainShorts from './main-shorts'

const MainBody = ({ postData }: MainPostDataProps) => {
  return (
    <MainBodyContainer>
      <MainFeatured postData={postData} />
      <MainShorts />
    </MainBodyContainer>
  )
}

export default MainBody
