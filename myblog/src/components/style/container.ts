'use client'

import style from 'styled-components'

export const ColumnCenterContainer = style.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ColumnLeftContainer = style.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ColumnContainer = style.section`
  display: flex;
  flex-direction: column;
`

export const RowCenterContainer = style.section`
display: flex;
justify-content: center;
align-items: center;
`

export const RowLeftContainer = style.section`
  display: flex;
  align-items: center;
`

export const HeadContainer = style.section`
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

export const CardContainer = style.section`
  width: 320px;
  height: 410px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 8px rgb(0 0 0 / 20%);
  margin: 0 20px;
`
export const CardSlider = style.div`
  maxWidth: 960px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`
