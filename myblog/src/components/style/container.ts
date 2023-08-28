'use client'

import style from 'styled-components'

export const ColumnCenterContainer = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 370px;

  @media (max-width: 390px) {
    min-width: 370px;
    align-items: center;
  }
`
export const ColumnLeftContainer = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ColumnContainer = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const RowCenterContainer = style.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const RowLeftContainer = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

export const HeadContainer = style.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 390px;
  min-height: 55px;
  position: relative;
  top: 0;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 20%);
  
`

export const ContentContainer = style.div`
display: flex;
justify-content: center;
align-items: center;
max-width: 700px;

@media (max-width: 640px) {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
`

export const ContentHeaderContainer = style.div`
display: flex;
min-width: 350px;
flex-direction: column;
justify-content: center;

@media (max-width: 390px) {
  align-items: center;
  justify-content: center;
}
`

export const ContentBodyContainer = style.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 390px) {
    width: 320px;
    justify-content: center;
    padding: 0 10px 10px 10px;
  }
`

export const FooterContainer = style.footer`
  display: flex;
  width: 100%;
  min-width: 390px;
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
