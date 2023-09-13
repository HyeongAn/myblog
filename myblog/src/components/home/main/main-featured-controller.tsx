'use client'
import { MainFeatureController } from '@/components/style/main'
import Image from 'next/image'
import leftArrow from '../../../../assets/svg/left-arrow.svg'
import rightArrow from '../../../../assets/svg/right-arrow.svg'
import pausedIcon from '../../../../assets/svg/stop-icon.svg'
import playIcon from '../../../../assets/svg/play-icon.svg'
import { ControllerButton } from '@/components/style/buttons/button'
import { ControllerProps } from '../../../../types/props'

const MainFeaturedController = ({ onNextClick, onPrevClick, currentIndex, setIsPaused, isPaused }: ControllerProps) => {
  return (
    <MainFeatureController>
      <div>
        <Image src={leftArrow} alt="left arrow" style={{ cursor: 'pointer' }} onClick={() => onPrevClick()} />
        {isPaused ? (
          <Image src={playIcon} alt="stop icon" style={{ cursor: 'pointer' }} onClick={() => setIsPaused(!isPaused)} />
        ) : (
          <Image
            src={pausedIcon}
            alt="stop icon"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsPaused(!isPaused)}
          />
        )}
        <Image src={rightArrow} alt="right arrow" style={{ cursor: 'pointer' }} onClick={() => onNextClick()} />
      </div>
      <div style={{ gap: '6px' }}>
        <ControllerButton />
        <ControllerButton />
        <ControllerButton />
        <ControllerButton />
        <ControllerButton />
      </div>
    </MainFeatureController>
  )
}

export default MainFeaturedController
