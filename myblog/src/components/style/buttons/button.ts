'use client'

import style from 'styled-components'

interface ControllerProps {
  $isClick?: boolean
}

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

export const IconLinkContainer = style.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  & [role='tooltip'] {
    height: 18px;
    visibility: hidden;
    position: absolute;
    background: #F9F9F9;
    border-radius: 6px;
    bottom: -25px;
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 20%);
    padding: 0 8px;
    color: black;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.3s;
  }
  &:hover {
    background-color: #E2E8F0;
    transition: all 0.2s;
    & [role='tooltip'] {
      visibility: visible;
      opacity: 1;
      cursor: default;
      &:hover {
        visibility: hidden;
        opacity: 0;
        
      }
    }
  }

`

export const IconLink = style.a`
  width: 18px;
  height: 18px;
`

export const ControllerButton = style.button<ControllerProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid black;
  cursor: pointer;
  background: ${(props) => (props.$isClick ? 'black' : 'transparent')};
  padding: 0;
  
`
