'use client'

import style from 'styled-components'

export const MainFeatureContainer = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 660px;

  @media (max-width: 960px) {
    max-width: 600px;
  }
`

export const MainFeatureHead = style.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`

export const MainFeatureBody = style.div`
  width: 100%;
  display: flex;
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
  width: 100%;
  height: 600px;  
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 500px;
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
    width: 100%;
    height: 480px;
    position: absolute;
    top: 0;
    opacity: 0;
    transition: 0.3s;
    border-radius: 20px;
    background-color: rgba(32, 33, 37, 30%);

    @media (max-width: 768px) {
      height: 380px;
    }
  }

  &: hover {
    & [role='tooltip'] {
      visibility: visible;
      opacity: 1;
    }
  }

`

export const CarouselOutline = style.span`
  color: white;
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 16px;
  padding: 5px 20px 5px 10px;
`

export const CarouselCategory = style.span`
  color: white;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 20px;
  border: 1px solid white;
  padding: 5px 10px;
  font-size: 14px;
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

export const CarouselImageDiv = style.div`
  display: flex;
  width: 100%;
  height: 480px;
  position: relative;

  @media (max-width: 768px) {
    height: 380px;
  }
`

export const IndexContainer = style.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  @media (max-width: 960px) {
    width: 100%;
  }
`

export const IndexHeader = style.h2`
  font-size:36px;
  margin: 0;
  font-style: italic;
`

export const IndexBody = style.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;

  & ul {
    gap: 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    margin:20px 0 0 0;

    @media (max-width: 960px) {
      gap: 10px;
    }

    & li {
      & p {
        line-height: 1.3;
        margin: 0;
        color: 'black';
      }
    }
  }
`
