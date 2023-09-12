'use client'

import style from 'styled-components'

export const MainFeatureHead = style.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const MainFeatureBody = style.div`

`

export const MainFeatureController = style.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  & div {
    display: flex;
    flex-direction: row;
  }
`

export const CarouselContainer = style.div`
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 640px) {
    width: 390px;
  }
`

export const CarouselWrapper = style.div`
  width: 660px;
  height: 660px;
  position: relative;
`

export const CarouselCardContainer = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  
  & [role='tooltip'] {
    visibility: hidden;
    width: 660px;
    height: 460px;
    position: absolute;
    top: 0;
    opacity: 0;
    transition: 0.3s;
  }

  &: hover {
    & [role='tooltip'] {
      visibility: visible;
      opacity: 1;
    }
  }

`

export const CarouselArticle = style.article`
  width: 660px;
  height: 460px;
  position: absolute;
  top: 0;
  visibility: hidden;
  z-index: 1000;

  &: hover {
    visibility: visible;
  }
`

export const CarouselDescription = style.span`
  color: white;
  position: absolute;
  bottom: 10px;
  left: 10px;
`

export const CarouselCategory = style.span`
  color: white;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 20px;
  border: 1px solid white;
  padding: 5px 10px;
`
