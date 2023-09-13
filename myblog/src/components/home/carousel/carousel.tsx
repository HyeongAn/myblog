'use client'

import { useEffect, useState } from 'react'
import { CarouselProps, PostData } from '../../../../types/props'
import { CarouselContainer } from '@/components/style/main'
import CarouselCard from './carousel-card'
import { AnimatePresence, motion } from 'framer-motion'

const Carousel = ({ postData, currentIndex, setCurrentIndex }: CarouselProps) => {
  const [currentPostData, setCurrentPostData] = useState<PostData[]>()

  useEffect(() => {
    if (postData.length >= 5) {
      const copyPostData = [...postData].slice(0, 5)
      // const firstPostData = copyPostData.slice(0, 1)
      // const lastPostData = copyPostData.slice(copyPostData.length - 1, copyPostData.length)
      // const postList = [...lastPostData, ...copyPostData, ...firstPostData]
      setCurrentPostData(copyPostData)
    } else {
      const copyPostData = [...postData]
      while (copyPostData.length < 5) {
        for (const data of postData) {
          if (copyPostData.length <= 5) copyPostData.push(data)
          else break
        }
      }
      // const firstPostData = copyPostData.slice(0, 1)
      // const lastPostData = copyPostData.slice(copyPostData.length - 1, copyPostData.length)
      // const postList = [...lastPostData, ...copyPostData, ...firstPostData]
      setCurrentPostData(copyPostData)
    }
  }, [postData])

  return (
    <CarouselContainer style={{ marginTop: '20px', position: 'relative' }}>
      <AnimatePresence>
        {currentPostData &&
          currentPostData.map((data, index) => {
            return index === currentIndex ? (
              <motion.div
                style={{ position: 'absolute', top: 0, left: 0 }}
                key={`postdata-card-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
              >
                <CarouselCard currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} postData={data} />
              </motion.div>
            ) : null
          })}
      </AnimatePresence>
    </CarouselContainer>
  )
}

export default Carousel
