'use client'
import Image from 'next/image'
import { SlideCardProps, SliderProps } from '../../../types/props'
import { CardContainer, ColumnCenterContainer, ColumnLeftContainer } from '../style/container'

const SliderCard = ({ data }: SlideCardProps) => {
  return (
    <CardContainer>
      <ColumnCenterContainer>
        <Image
          style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
          width={320}
          height={220}
          alt="cover Image"
          src={data.coverImage}
        />
        <ColumnLeftContainer style={{ padding: '10px', maxHeight: '180px' }}>
          <h1 style={{ margin: '0', fontSize: '20px' }}>{data.title}</h1>
          <span style={{ height: '130px' }}>{data.description}</span>
        </ColumnLeftContainer>
      </ColumnCenterContainer>
    </CardContainer>
  )
}

export default SliderCard
