'use client'
import { ColumnContainer } from '@/components/style/container'
import { MainFeatureBody, MainFeatureHead } from '@/components/style/main'
import MainFeaturedController from './main-featured-controller'
import Carousel from '../carousel/carousel'
import { MainPostDataProps } from '../../../../types/props'
import { useEffect, useRef, useState } from 'react'

const MainFeatured = ({ postData }: MainPostDataProps) => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  const onPrevClick = () => {
    setCurrentIndex((prev) => (prev - 1 + 5) % 5)
  }

  const onNextClick = () => {
    setCurrentIndex((prev) => (prev + 1) % 5)
  }

  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current)
    } else {
      intervalRef.current = setInterval(onNextClick, 10000)
    }

    return () => clearInterval(intervalRef.current)
  }, [onNextClick, isPaused])

  return (
    <ColumnContainer>
      <MainFeatureHead style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '36px', margin: '0' }}>Featured.</h2>
        <MainFeaturedController
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          currentIndex={currentIndex}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
      </MainFeatureHead>
      <MainFeatureBody>
        <Carousel postData={postData} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </MainFeatureBody>
    </ColumnContainer>
  )
}

export default MainFeatured
