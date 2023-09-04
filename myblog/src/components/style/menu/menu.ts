'use client'

import style from 'styled-components'

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
