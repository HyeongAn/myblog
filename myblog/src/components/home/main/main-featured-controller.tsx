'use client'
import { MainFeatureController } from '@/components/style/main'
import Image from 'next/image'
import leftArrow from '../../../../assets/svg/left-arrow.svg'
import rightArrow from '../../../../assets/svg/right-arrow.svg'
import stopIcon from '../../../../assets/svg/stop-icon.svg'
import playIcon from '../../../../assets/svg/play-icon.svg'
import { ControllerButton } from '@/components/style/buttons/button'
import { ControllerProps } from '../../../../types/props'

const MainFeaturedController = ({ onNextClick, onPrevClick, currentIndex }: ControllerProps) => {
  return (
    <MainFeatureController>
      <div>
        <Image src={leftArrow} alt="left arrow" />
        <Image src={stopIcon} alt="stop icon" />
        <Image src={rightArrow} alt="right arrow" />
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
