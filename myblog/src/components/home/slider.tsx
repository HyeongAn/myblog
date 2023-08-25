'use client'
import { useEffect, useRef, useState } from 'react'
import { CardSlider, RowCenterContainer } from '../style/container'
import SliderCard from './slider-card'
import { SliderProps } from '../../../types/props'

const Slider = ({ postData }: SliderProps) => {
  const slideRef = useRef<HTMLDivElement>(null)
  const [currentIndx, setCurrentIndx] = useState(0)
  const [count, setCount] = useState(0)
  const total_slides = postData.length - 1

  useEffect(() => {
    const slideCurrent = slideRef.current
    if (slideCurrent) {
      slideCurrent.style.transition = 'all 0.5s ease-in-out'
      slideCurrent.style.transform = `translateX(-${currentIndx * 33.3}%)`
    }
  }, [currentIndx])

  const onPrevClick = () => {
    if (currentIndx === 0) setCurrentIndx(total_slides)
    else setCurrentIndx((prev) => prev - 1)
  }

  const onNextClick = () => {
    if (currentIndx >= total_slides) setCurrentIndx(0)
    else setCurrentIndx((prev) => prev + 1)
  }

  return (
    <RowCenterContainer style={{ maxWidth: '1163px', width: '100%', height: '500px', overflow: 'hidden' }}>
      <button onClick={() => onPrevClick()}>prev</button>
      <CardSlider ref={slideRef}>
        {postData && postData.map((item, idx) => <SliderCard data={item} key={`slide-card-${idx}`} />)}
      </CardSlider>
      <button onClick={() => onNextClick()}>next</button>
    </RowCenterContainer>
  )
}

export default Slider
