'use client'

import style, { keyframes } from 'styled-components'

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
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  & [role='tooltip'] {
    height: 26px;
    visibility: hidden;
    position: absolute;
    background: #F9F9F9;
    border-radius: 6px;
    bottom: -30px;
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
    background-color: var(--hv-cr);
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
  color: var(--font--color);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const IndexControlButton = style.button<ControllerProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid var(--font--color);
  cursor: pointer;
  background: ${(props) => (props.$isClick ? 'var(--font--color)' : 'transparent')};
  padding: 0;
`

export const ControllerButton = style.div`
  width 24px;
  height: 24px;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
`

export const rotate_image = keyframes`
  0% {
    transform: rotate(0deg);
    width: 8px;
    height: 8px;
  }
  25% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(-40deg);
  }
  75% {
    transform: rotate(-20deg);
    width: 22px;
    height: 22px;
  }
  100% {
    transform: rotate(0deg);
    width: 20px;
    height: 20px;
  }
`

export const ThemeButton = style.button`
  border: none;
  background-color: transparent;
  
  & img {
    width: 20px;
    height: 20px;
    animation: ${rotate_image} 0.2s linear;
    transform-origin: 50% 50%;
  }
`

export const DarkThemeButton = style.div`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 10px;
  display: var(--dis--light);
  border-radius: 50%;
  
  &:hover {
    background-color: var(--hv-cr);
    transition: background-color 0.2s ease;
  }
`

export const LightThemeButton = style.div`
  width: 40px;
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
  display: var(--dis--black);
  border-radius: 50%;

  &:hover {
    background-color: var(--hv-cr);
    transition: background-color 0.2s ease;
  }
`
