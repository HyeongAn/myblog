'use client'

import style from 'styled-components'

export const IconButton = style.a`
  height: 60px;
  color: black;
  border: none;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:transparent;
  cursor: pointer;
  text-decoration: none;
  color: black;

  & p {
    padding-top: 5px;
    font-size: 16px;
    font-weight: 500;
  }
`

export const SliderButton = style.button`
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 5px;

  @media (max-width: 390px) {
    display: none;
  }
`

export const CloseButton = style.button`
  width 25px;
  height: 25px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
`
