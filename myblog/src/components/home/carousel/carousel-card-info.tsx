import { CarouselCardInfoContainer, CarouselRoundDiv } from '@/components/style/main'
import { CarouselCardInfoProps } from '../../../../types/props'
import { RowLeftContainer } from '@/components/style/container'

const CarouselCardInfo = ({ postData }: CarouselCardInfoProps) => {
  return (
    <CarouselCardInfoContainer>
      <RowLeftContainer style={{ gap: '10px' }}>
        <CarouselRoundDiv>{postData.data.category}</CarouselRoundDiv>
        <span style={{ color: '#202125', marginTop: 'auto' }}>{postData.data.date}</span>
      </RowLeftContainer>
      <h2 style={{ color: '#202125', fontSize: '24px', marginTop: '10px' }}>{postData.data.title}</h2>
    </CarouselCardInfoContainer>
  )
}

export default CarouselCardInfo