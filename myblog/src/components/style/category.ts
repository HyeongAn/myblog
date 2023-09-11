'use client'

import style from 'styled-components'

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

export const CategoryKey = style.p`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  color: #202125;

`

export const CategoryValue = style.p`
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  color: #202125;
`
