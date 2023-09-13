'use client'
import { ColumnContainer } from '@/components/style/container'
import { MainFeatureBody, MainFeatureHead } from '@/components/style/main'
import MainFeaturedController from './main-featured-controller'
import Carousel from '../carousel/carousel'
import { MainPostDataProps } from '../../../../types/props'
import { useEffect, useState } from 'react'

const MainFeatured = ({ postData }: MainPostDataProps) => {
  const [currentIndex, setCurrentIndex] = useState(1)

  const onPrevClick = () => {
    if (currentIndex <= 0) setCurrentIndex(4)
    else setCurrentIndex((prev) => prev - 1)
  }

  const onNextClick = () => {
    if (currentIndex > 5) setCurrentIndex(1)
    setCurrentIndex((prev) => prev + 1)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      onNextClick()
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [currentIndex])

  return (
    <ColumnContainer>
      <MainFeatureHead style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '36px', margin: '0' }}>Featured.</h2>
        <MainFeaturedController onPrevClick={onPrevClick} onNextClick={onNextClick} currentIndex={currentIndex} />
      </MainFeatureHead>
      <MainFeatureBody>
        <Carousel postData={postData} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </MainFeatureBody>
    </ColumnContainer>
  )
}

export default MainFeatured
