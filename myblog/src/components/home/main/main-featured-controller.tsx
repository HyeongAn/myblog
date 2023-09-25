'use client'
import { MainFeatureController } from '@/components/style/main'
import Image from 'next/image'
import leftArrow from '../../../../assets/svg/left-arrow.svg'
import rightArrow from '../../../../assets/svg/right-arrow.svg'
import pausedIcon from '../../../../assets/svg/stop-icon.svg'
import playIcon from '../../../../assets/svg/play-icon.svg'
import { ControllerButton } from '@/components/style/buttons/button'
import { ControllerProps } from '../../../../types/props'
import SvgStyle from '@/components/style/svg-style'

const MainFeaturedController = ({
  onNextClick,
  onPrevClick,
  currentIndex,
  setCurrentIndex,
  setIsPaused,
  isPaused,
}: ControllerProps) => {
  return (
    <MainFeatureController>
      <div>
        {/* <Image src={leftArrow} alt="left arrow" style={{ cursor: 'pointer' }} onClick={() => onPrevClick()} /> */}
        <div onClick={() => onPrevClick()}>
          <SvgStyle image="left" />
        </div>
        {isPaused ? (
          // <Image src={playIcon} alt="stop icon" style={{ cursor: 'pointer' }} onClick={() => setIsPaused(!isPaused)} />
          <div onClick={() => setIsPaused(!isPaused)}>
            <SvgStyle image="play" />
          </div>
        ) : (
          // <Image
          //   src={pausedIcon}
          //   alt="stop icon"
          //   style={{ cursor: 'pointer' }}
          //   onClick={() => setIsPaused(!isPaused)}
          // />
          <div onClick={() => setIsPaused(!isPaused)}>
            <SvgStyle image="stop" />
          </div>
        )}
        {/* <Image src={rightArrow} alt="right arrow" style={{ cursor: 'pointer' }} onClick={() => onNextClick()} /> */}
        <div onClick={() => onNextClick()}>
          <SvgStyle image="right" />
        </div>
      </div>
      <div style={{ gap: '6px' }}>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <ControllerButton
              $isClick={index === currentIndex}
              key={`controller-button-${index}`}
              onClick={() => setCurrentIndex(index)}
            />
          )
        })}
      </div>
    </MainFeatureController>
  )
}

export default MainFeaturedController
