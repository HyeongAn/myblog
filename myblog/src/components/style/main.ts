'use client'

import style from 'styled-components'

export const MainFeatureHead = style.div`
  width: 660px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`

export const MainFeatureBody = style.div`
  width: 900px;
  display: flex;
  gap: 60px;
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
  width: 660px;
  height: 660px;  
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 640px) {
    width: 390px;
  }
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
    border-radius: 20px;
    background-color: rgba(32, 33, 37, 30%);
  }

  &: hover {
    & [role='tooltip'] {
      visibility: visible;
      opacity: 1;
    }
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

export const CarouselCardInfoContainer = style.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`

export const CarouselRoundDiv = style.span`
  border-radius: 20px;
  border: 1.5px solid #202125;
  padding: 5px 10px;
  color: #202125;
  font-size: 14px;
  font-weight: 800;
`
export const IndexContainer = style.div`
  width: 175px;
  overflow: scroll;
`

export const IndexHeader = style.div`

`

export const IndexBody = style.div`
`
