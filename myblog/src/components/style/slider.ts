'use client'
import style from 'styled-components'

export const SlideContainer = style.div`
  width: 100%;
  max-width: 1150px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 390px) {
  width: 360px;
  display: flex;
  justify-content: center;
  }

`

export const CardContainer = style.div`
width: 320px;
max-height: 420px;
background-color: white;
overflow: hidden;
`

export const CardSlider = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const CarouselSlider = style.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
`
