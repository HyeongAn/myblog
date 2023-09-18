'use client'
import { PostCardContainer, PostCardHeader, PostCardTitle } from '@/components/style/container'
import { PostDataProps } from '../../../../types/props'
import Link from 'next/link'
import Image from 'next/image'
import CarouselCardInfo from '../carousel/carousel-card-info'
import { CarouselCategory, CarouselOutline } from '@/components/style/main'

const PostCard = ({ postData }: PostDataProps) => {
  return (
    <PostCardContainer aria-describedby="carousel-article-info" style={{ position: 'relative' }}>
      <Link href={`/${postData.data.category}/${postData.slug}`} style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '340px', position: 'relative' }}>
          <Image
            src={postData.data.coverImage}
            alt={`post-${postData.data.category}-${postData.slug}`}
            style={{ borderRadius: '20px', objectFit: 'cover' }}
            fill
          />
        </div>
        <CarouselCardInfo postData={postData} />
        <div role="tooltip">
          <CarouselCategory>{postData.data.category}</CarouselCategory>
          <CarouselOutline>{postData.data.outline}</CarouselOutline>
        </div>
      </Link>
    </PostCardContainer>
  )
}

export default PostCard
