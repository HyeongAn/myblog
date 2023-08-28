'use client'

import style from 'styled-components'

export const ColumnCenterContainer = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ColumnLeftContainer = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ColumnContainer = style.div`
  display: flex;
  flex-direction: column;
`

export const RowCenterContainer = style.div`
display: flex;
justify-content: center;
align-items: center;
`

export const RowLeftContainer = style.div`
  display: flex;
  align-items: center;
`

export const HeadContainer = style.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 55px;
  position: relative;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 20%);
`
export const HeadLinkContainer = style.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  position: absolute;
  right: 10px;
  color: white;
`
export const FooterContainer = style.footer`
  display: flex;
  width: 100%;
  min-height: 120px;
  align-items: center;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 20%);
`

export const FooterLinkContainer = style.div`
  display: flex;
  width: 80px;
  justify-content: space-between;
  align-items: center;
`

export const CardContainer = style.div`
  width: 320px;
  height: 420px;
  background-color: white;
`
export const CardSlider = style.div`
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
