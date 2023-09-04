'use client'

import { useEffect, useRef, useState } from 'react'
import { SlideMenuContainer } from '../style/menu/menu'
import { SideMenuProp } from '../../../types/props'

const SlideMenu = ({
  children,
  isOpen,
  setIsOpen,
  xPosition,
  setXPosition,
}: SideMenuProp) => {
  const slideMenuRef = useRef<HTMLDivElement>(null)

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = (e: any) => {
    const sideArea = slideMenuRef.current
    const sideChildren = sideArea === null ? null : sideArea.contains(e.target)
    if (isOpen && (!sideArea || !sideChildren)) {
      setXPosition(-300)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClose)
    return () => {
      window.removeEventListener('click', handleClose)
    }
  })

  return (
    <SlideMenuContainer
      ref={slideMenuRef}
      style={{ transform: `translatex(-${xPosition}px)` }}
    >
      <div>{children}</div>
    </SlideMenuContainer>
  )
}

export default SlideMenu
