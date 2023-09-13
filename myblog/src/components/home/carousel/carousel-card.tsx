'use client'
import Link from 'next/link'
import { CarouselCardProps, PostData } from '../../../../types/props'
import Image from 'next/image'
import { CarouselCardContainer, CarouselCategory, CarouselDescription } from '@/components/style/main'
import CarouselCardInfo from './carousel-card-info'
import { useEffect, useRef } from 'react'

const CarouselCard = ({ postData, index, currentIndex, setCurrentIndex }: CarouselCardProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const carouselCurrent = carouselRef.current
    if (carouselCurrent) {
      carouselCurrent.style.opacity = '1'
      carouselCurrent.style.transition = `opacity 2s 1s`
      carouselCurrent.style.transform = `translateX(5%)`
    }
  }, [currentIndex])

  return (
    <CarouselCardContainer
      ref={carouselRef}
      style={index === currentIndex ? { display: 'block' } : { display: 'none' }}
      aria-describedby="carousel-article-info"
    >
      <Link href={`/${postData.data.category}/${postData.slug}`}>
        <article
          style={{
            width: '100%',
            height: '660px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', width: '100%', height: '460px', position: 'relative' }}>
            <Image
              src={postData.data.coverImage}
              alt={`carousel-image-${index}`}
              layout="fill"
              objectFit="cover"
              style={{ borderRadius: '20px' }}
            />
          </div>
          <CarouselCardInfo postData={postData} />
          <div role="tooltip">
            <CarouselCategory>{postData.data.category}</CarouselCategory>
            <CarouselDescription>{postData.data.description}</CarouselDescription>
          </div>
        </article>
      </Link>
    </CarouselCardContainer>
  )
}

export default CarouselCard
