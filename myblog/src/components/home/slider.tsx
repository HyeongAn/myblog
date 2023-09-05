'use client'
import { useEffect, useRef, useState } from 'react'
import SliderCard from './slider-card'
import { PostDataType, SliderProps } from '../../../types/props'
import { SliderButton } from '../style/buttons/button'
import leftArrow from '../../../assets/svg/left-arrow.svg'
import rightArrow from '../../../assets/svg/right-arrow.svg'
import Image from 'next/image'
import { CardSlider, CarouselSlider, SlideContainer } from '../style/slider'

const Slider = ({ postData }: SliderProps) => {
  const slideRef = useRef<HTMLDivElement>(null)
  const [carousel, setCarousel] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(3)
  const [currentPostData, setCurrentPostData] = useState<PostDataType[]>()

  // 무한 carousel slider를 구성하기 위한 useEffect
  useEffect(() => {
    if (postData.length >= 7) {
      const copyPostData = [...postData]
      const startPoint = copyPostData.slice(0, 3)
      const endPoint = copyPostData.slice(
        copyPostData.length - 3,
        copyPostData.length
      )
      const carouselList = [
        ...endPoint,
        ...copyPostData.slice(0, 7),
        ...startPoint,
      ]
      setCurrentPostData(carouselList)
    } else {
      const copyPostData = [...postData]
      while (copyPostData.length < 7) {
        for (const data of postData) {
          if (copyPostData.length <= 7) copyPostData.push(data)
          else break
        }
      }
      const startPoint = copyPostData.slice(0, 3)
      const endPoint = copyPostData.slice(
        copyPostData.length - 3,
        copyPostData.length
      )
      const carouselList = [...endPoint, ...copyPostData, ...startPoint]
      setCurrentPostData(carouselList)
    }
  }, [postData])

  // carousel slider의 애니메이션 효과를 만들어주는 useEffect
  useEffect(() => {
    const slideCurrent = slideRef.current
    // slideCurrent.style.transition = 'transform 0ms ease-in-out 0s'
    if (slideCurrent) {
      if (currentIndex === -1) {
        setCarousel(true)
        setCurrentIndex(7)
      } else if (currentIndex === 11) {
        setCarousel(true)
        setCurrentIndex(3)
      } else if (currentIndex === 3) {
        slideCurrent.style.transform = `translateX(-${currentIndex * 360}px)`
        slideCurrent.style.transition = carousel
          ? 'transform 0s ease-in-out 0s'
          : 'all 0.5s ease-in-out'
        setCarousel(false)
      } else if (currentIndex === 7) {
        slideCurrent.style.transform = `translateX(-${currentIndex * 360}px)`
        slideCurrent.style.transition = carousel
          ? 'transform 0s ease-in-out 0s'
          : 'all 0.5s ease-in-out'
        setCarousel(false)
      } else {
        slideCurrent.style.transform = `translateX(-${currentIndex * 360}px)`
        slideCurrent.style.transition = 'all 0.5s ease-in-out'
      }
    }
  }, [currentIndex])

  // carousel slider가 자동으로 넘어가게 해주는 useEffect
  useEffect(() => {
    if (currentIndex === 0 || currentIndex === 10) {
      const timer = setInterval(() => {
        onNextClick()
      }, 500)
      return () => {
        clearInterval(timer)
      }
    } else {
      const timer = setInterval(() => {
        onNextClick()
      }, 2500)
      return () => {
        clearInterval(timer)
      }
    }
  }, [currentIndex])

  const onPrevClick = () => {
    setCurrentIndex((prev) => prev - 1)
  }

  const onNextClick = () => {
    setCurrentIndex((prev) => prev + 1)
  }

  return (
    <SlideContainer>
      <SliderButton onClick={() => onPrevClick()}>
        <Image src={leftArrow} alt="left arrow image" width="25" height="25" />
      </SliderButton>
      <CarouselSlider>
        <CardSlider ref={slideRef}>
          {currentPostData &&
            currentPostData.map((item, idx) => (
              <SliderCard
                slug={item.slug}
                data={item.data}
                key={`slide-card-${idx}`}
              />
            ))}
        </CardSlider>
      </CarouselSlider>
      <SliderButton onClick={() => onNextClick()}>
        <Image
          src={rightArrow}
          alt="right arrow image"
          width="25"
          height="25"
        />
      </SliderButton>
    </SlideContainer>
  )
}

export default Slider
