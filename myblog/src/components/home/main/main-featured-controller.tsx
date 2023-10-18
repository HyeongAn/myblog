'use client'
import { MainFeatureController } from '@/components/style/main'
import { IndexControlButton, ControllerButton } from '@/components/style/buttons/button'
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
        <ControllerButton onClick={() => onPrevClick()}>
          <SvgStyle image="left" />
        </ControllerButton>
        {isPaused ? (
          <ControllerButton onClick={() => setIsPaused(!isPaused)}>
            <SvgStyle image="play" />
          </ControllerButton>
        ) : (
          <ControllerButton onClick={() => setIsPaused(!isPaused)}>
            <SvgStyle image="stop" />
          </ControllerButton>
        )}
        <ControllerButton onClick={() => onNextClick()}>
          <SvgStyle image="right" />
        </ControllerButton>
      </div>
      <div style={{ gap: '6px' }}>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <IndexControlButton
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
