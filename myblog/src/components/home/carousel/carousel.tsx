'use client'

import { useEffect, useRef, useState } from 'react'
import { CarouselProps, PostData } from '../../../../types/props'
import { CarouselContainer, CarouselWrapper } from '@/components/style/main'
import CarouselCard from './carousel-card'

const Carousel = ({ postData, currentIndex, setCurrentIndex }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentPostData, setCurrentPostData] = useState<PostData[]>()

  useEffect(() => {
    if (postData.length >= 5) {
      const copyPostData = [...postData].slice(0, 5)
      setCurrentPostData(copyPostData)
    } else {
      const copyPostData = [...postData]
      while (copyPostData.length < 5) {
        for (const data of postData) {
          if (copyPostData.length <= 5) copyPostData.push(data)
          else break
        }
      }
      setCurrentPostData(copyPostData)
    }
  }, [postData])

  return (
    <CarouselContainer style={{ marginTop: '20px' }}>
      <CarouselWrapper>
        {currentPostData &&
          currentPostData.map((postData, index) => (
            <CarouselCard
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              postData={postData}
              index={index}
              key={`carousel-${postData.data.category}-${postData.data.slug}-${index}`}
            />
          ))}
      </CarouselWrapper>
    </CarouselContainer>
  )
}

export default Carousel
