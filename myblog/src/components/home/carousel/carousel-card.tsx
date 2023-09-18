'use client'
import Link from 'next/link'
import { CarouselCardProps } from '../../../../types/props'
import Image from 'next/image'
import { CarouselCardContainer, CarouselCategory, CarouselImageDiv, CarouselOutline } from '@/components/style/main'
import CarouselCardInfo from './carousel-card-info'

const CarouselCard = ({ postData, currentIndex, setCurrentIndex }: CarouselCardProps) => {
  return (
    <CarouselCardContainer style={{ display: 'block' }} aria-describedby="carousel-article-info">
      <Link href={`/${postData.data.category}/${postData.slug}`}>
        <article
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CarouselImageDiv>
            <Image
              src={postData.data.coverImage}
              alt={`carousel-image-${currentIndex}`}
              fill
              style={{ borderRadius: '20px', objectFit: 'cover' }}
            />
          </CarouselImageDiv>
          <CarouselCardInfo postData={postData} />
          <div role="tooltip">
            <CarouselCategory>{postData.data.category}</CarouselCategory>
            <CarouselOutline>{postData.data.outline}</CarouselOutline>
          </div>
        </article>
      </Link>
    </CarouselCardContainer>
  )
}

export default CarouselCard
