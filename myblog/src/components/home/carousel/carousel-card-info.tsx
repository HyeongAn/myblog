import { CarouselCardInfoContainer, CarouselRoundDiv } from '@/components/style/main'
import { CarouselCardInfoProps } from '../../../../types/props'
import { RowLeftContainer } from '@/components/style/container'

const CarouselCardInfo = ({ postData }: CarouselCardInfoProps) => {
  return (
    <CarouselCardInfoContainer>
      <RowLeftContainer style={{ gap: '10px' }}>
        <CarouselRoundDiv>{postData.data.category}</CarouselRoundDiv>
        <span style={{ marginTop: 'auto' }}>{postData.data.date}</span>
      </RowLeftContainer>
      <span style={{ fontSize: '24px', marginTop: '10px', fontWeight: 'bold' }}>{postData.data.title}</span>
    </CarouselCardInfoContainer>
  )
}

export default CarouselCardInfo
