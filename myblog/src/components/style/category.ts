'use client'

import style from 'styled-components'

interface KeyProps {
  isAll?: boolean
}

export const CategoryContainer = style.nav`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  width: 100%;
  min-width: 640px;
`

export const CategoryWrapper = style.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
`

export const CategoryKey = style.p<KeyProps>`
  font-size: 18px;
  font-weight: ${(props) => (props.isAll ? '700' : '400')};
  margin: 0;
  color: #202125;

`

export const CategoryValue = style.p<KeyProps>`
  font-size: 12px;
  font-weight: ${(props) => (props.isAll ? '700' : '400')};
  margin: 0;
  color: #202125;
`
