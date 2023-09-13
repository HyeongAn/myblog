'use client'

import { useEffect, useState } from 'react'
import { CarouselProps, PostData } from '../../../../types/props'
import { CarouselContainer, CarouselWrapper } from '@/components/style/main'
import CarouselCard from './carousel-card'

const Carousel = ({ postData, currentIndex, setCurrentIndex }: CarouselProps) => {
  const [currentPostData, setCurrentPostData] = useState<PostData[]>()

  useEffect(() => {
    if (postData.length >= 5) {
      const copyPostData = [...postData].slice(0, 5)
      const firstPostData = copyPostData.slice(0, 1)
      const lastPostData = copyPostData.slice(copyPostData.length - 1, copyPostData.length)
      const postList = [...lastPostData, ...copyPostData, ...firstPostData]
      setCurrentPostData(postList)
    } else {
      const copyPostData = [...postData]
      while (copyPostData.length < 5) {
        for (const data of postData) {
          if (copyPostData.length <= 5) copyPostData.push(data)
          else break
        }
      }
      const firstPostData = copyPostData.slice(0, 1)
      const lastPostData = copyPostData.slice(copyPostData.length - 1, copyPostData.length)
      const postList = [...lastPostData, ...copyPostData, ...firstPostData]
      setCurrentPostData(postList)
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
