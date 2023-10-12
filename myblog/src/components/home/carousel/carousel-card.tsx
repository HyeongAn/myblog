'use client'
import Link from 'next/link'
import { CarouselCardProps } from '../../../../types/props'
import Image from 'next/image'
import {
  CarouselCardContainer,
  CarouselCardInfoContainer,
  CarouselCategory,
  CarouselImageDiv,
  CarouselOutline,
  CarouselRoundDiv,
} from '@/components/style/main'
import CarouselCardInfo from './carousel-card-info'
import { RowLeftContainer } from '@/components/style/container'

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
              priority
              sizes="100%"
              style={{ borderRadius: '20px', objectFit: 'cover' }}
            />
          </CarouselImageDiv>
          <CarouselCardInfoContainer>
            <RowLeftContainer style={{ gap: '10px' }}>
              <CarouselRoundDiv>{postData.data.category}</CarouselRoundDiv>
              <span style={{ marginTop: 'auto' }}>{postData.data.date}</span>
            </RowLeftContainer>
            <span style={{ fontSize: '24px', marginTop: '10px', fontWeight: 'bold' }}>{postData.data.title}</span>
          </CarouselCardInfoContainer>
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
