'use client'
import { useEffect, useRef, useState } from 'react'
import { RowCenterContainer } from '../style/container'
import SliderCard from './slider-card'
import { SliderProps } from '../../../types/props'

const Slider = ({ postData }: SliderProps) => {
  const slideRef = useRef<HTMLDivElement>(null)

  const onPrevClick = () => {
    const slide = slideRef.current
    if (slide) {
      slide.scrollLeft -= slide.offsetWidth
      if (slide.scrollLeft <= 0) slide.scrollLeft = slide.scrollWidth
    }
  }

  const onNextClick = () => {
    const slide = slideRef.current
    if (slide) {
      slide.scrollLeft += slide.offsetWidth
      if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) slide.scrollLeft = 0
    }
  }

  useEffect(() => {
    setInterval(onNextClick, 2000)
  }, [])

  return (
    <RowCenterContainer style={{ width: '100%', height: '500px' }}>
      <button onClick={() => onPrevClick()}>prev</button>
      <div
        ref={slideRef}
        style={{
          maxWidth: '1080px',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {postData && postData.map((item, idx) => <SliderCard data={item} key={`slide-card-${idx}`} />)}
      </div>

      <button onClick={() => onNextClick()}>next</button>
    </RowCenterContainer>
  )
}

export default Slider
