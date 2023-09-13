'use client'
import Link from 'next/link'
import { CarouselCardProps } from '../../../../types/props'
import Image from 'next/image'
import { CarouselCardContainer, CarouselCategory, CarouselDescription } from '@/components/style/main'
import CarouselCardInfo from './carousel-card-info'

const CarouselCard = ({ postData, currentIndex, setCurrentIndex }: CarouselCardProps) => {
  return (
    <CarouselCardContainer style={{ display: 'block' }} aria-describedby="carousel-article-info">
      <Link href={`/${postData.data.category}/${postData.slug}`}>
        <article
          style={{
            width: '660px',
            height: '660px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', width: '100%', height: '460px', position: 'relative' }}>
            <Image
              src={postData.data.coverImage}
              alt={`carousel-image-${currentIndex}`}
              fill
              style={{ borderRadius: '20px', objectFit: 'cover' }}
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
