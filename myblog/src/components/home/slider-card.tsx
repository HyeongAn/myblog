'use client'
import Image from 'next/image'
import { SlideCardProps } from '../../../types/props'
import { ColumnCenterContainer, ColumnLeftContainer } from '../style/container'
import { CardContainer } from '../style/slider'
import { useRouter } from 'next/navigation'

const SliderCard = ({ data, slug }: SlideCardProps) => {
  const router = useRouter()

  return (
    <CardContainer
      onClick={() => {
        router.push(`/blog/${slug}`)
      }}
    >
      <div
        style={{
          borderRadius: '20px',
          margin: '0 20px',
          boxShadow: '0 0 8px rgb(0 0 0 / 20%)',
        }}
      >
        <div
          style={{
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            width: '320px',
            height: '180px',
            position: 'relative',
          }}
        >
          <Image
            style={{
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
            layout="fill"
            objectFit="cover"
            alt="cover Image"
            src={data.coverImage}
          />
        </div>
        <ColumnLeftContainer
          style={{
            width: '300px',
            padding: '10px',
            minHeight: '200px',
            maxHeight: '200px',
            overflow: 'hidden',
          }}
        >
          <h1 style={{ margin: '0', fontSize: '20px' }}>{data.title}</h1>
          <span style={{ minHeight: '140px', overflow: 'hidden' }}>
            {data.description}
          </span>
        </ColumnLeftContainer>
      </div>
    </CardContainer>
  )
}

export default SliderCard
