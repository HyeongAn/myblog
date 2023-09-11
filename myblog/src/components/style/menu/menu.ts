'use client'

import style from 'styled-components'

export interface SlideProps {
  isManaged?: boolean
}

export const SlideMenuContainer = style.div`
  width: 300px;
  height: 100%;
  background-color: rgba(238, 238, 238, 95%);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  transition: 0.4s ease;
`

export const SlideMenuHeader = style.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(238, 238, 238, 1);
  position: relative;
`

export const SlideMenuBody = style.div`
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

export const SlideMenuUl = style.ul`
  width: 80%;
  margin: 0px;
  padding: 0;

  & li {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
`

export const SlideProfileContainer = style.div`
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: end;
  justify-content: center;
  background-color: #EBF8FF;
  box-shadow: 0 0 0 5px #1A356D;
  border-radius: 50%;
  overflow: hidden;
  box-align: end;

  & div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 5px;
    left: -11px;
    display: block;
  }
`

export const ManagedSpot = style.div<SlideProps>`
  background-color: ${(props) => (props.isManaged ? '#48BB78' : '#A0AEC0')} ;
  width: 8px;
  height: 8px;
  border-radius: 50%;
`

export const ManagedOutLine = style.span<SlideProps>`
  font-size: 10px;
  color: ${(props) => (props.isManaged ? '#48BB78' : '#A0AEC0')} ;
`
