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

export const RowBetweenContainer = style.div`
  display: flex;
  justify-content: space-around;
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

export const MainContainer = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`

export const MainHeaderContainer = style.div`
  display: flex;
  min-width: 350px;
  flex-direction: column;
  justify-content: center;

  & h2 {
    font-size: 60px;
  }
`

export const MainBodyContainer = style.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  
`

export const FooterContainer = style.footer`
  display: flex;
  width: 100%;
  min-width: 390px;
  min-height: 100px;
  font-size: 12px;
  justify-content: center;
  align-items: center;
`

export const FooterLinkContainer = style.div`
  display: flex;
  width: 80px;
  justify-content: space-between;
  align-items: center;
`

export const FlexibleImageContainer = style.div`
  width: 80%;
  height: 80%;
  position: relative;
  min-width: 370px;
  min-height: 200px;

`
