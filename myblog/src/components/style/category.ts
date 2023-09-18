'use client'

import style from 'styled-components'

interface CategoryProps {
  $isClicked: boolean
}

export const CategoryContainer = style.nav`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  max-width: 640px;
`

export const CategoryWrapper = style.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
`

export const CategoryKey = style.p<CategoryProps>`
  font-size: 18px;
  font-weight: ${(props) => (props.$isClicked ? '700' : '400')};
  margin: 0;
  color: #202125;

`

export const CategoryValue = style.p<CategoryProps>`
  font-size: 12px;
  font-weight: ${(props) => (props.$isClicked ? '700' : '400')};
  margin: 0;
  color: #202125;
`
