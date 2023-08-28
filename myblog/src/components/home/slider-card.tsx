'use client'
import Image from 'next/image'
import { SlideCardProps } from '../../../types/props'
import { ColumnCenterContainer, ColumnLeftContainer } from '../style/container'
import { CardContainer } from '../style/slider'

const SliderCard = ({ data }: SlideCardProps) => {
  return (
    <CardContainer>
      <div style={{ borderRadius: '20px', margin: '0 20px', boxShadow: '0 0 8px rgb(0 0 0 / 20%)' }}>
        <Image
          style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
          width={320}
          height={220}
          alt="cover Image"
          src={data.coverImage}
        />
        <ColumnLeftContainer style={{ width: '300px', padding: '10px', maxHeight: '180px' }}>
          <h1 style={{ margin: '0', fontSize: '20px' }}>{data.title}</h1>
          <span style={{ height: '140px' }}>{data.description}</span>
        </ColumnLeftContainer>
      </div>
    </CardContainer>
  )
}

export default SliderCard
