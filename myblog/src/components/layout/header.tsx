'use client'
import Link from 'next/link'
import { HeadContainer } from '../style/container'
import { useContext, useEffect, useState } from 'react'
import miniMenu from '../../../assets/svg/mini-menu.svg'
import Image from 'next/image'
import SlideMenu from '../slidemenu/slidemenu'

interface HeaderProps {
  xWidth: number
}

const Header = ({ xWidth }: HeaderProps) => {
  const [width, setWidth] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [xPosition, setXPosition] = useState(xWidth)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setXPosition(0)
      setIsOpen(true)
    } else {
      setXPosition(-xPosition)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    console.log(xPosition)
  }, [xPosition])

  return (
    <HeadContainer>
      <h1>{`YoonHu's Blog`}</h1>
      {width >= 640 ? (
        <div style={{ position: 'absolute', right: '10px' }}>
          <Link href="/" style={{ color: 'black', marginRight: '8px' }}>
            Home
          </Link>
          <Link href="/blog" style={{ color: 'black' }}>
            Blog
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: '10px',
            width: '55px',
            height: '55px',
          }}
          onClick={() => toggleMenu()}
        >
          <Image src={miniMenu} alt="menu button" width="18" height="18" />
        </div>
      )}
      <SlideMenu
        toggleMenu={toggleMenu}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        xPosition={xPosition}
        setXPosition={setXPosition}
      >
        <div>hi</div>
      </SlideMenu>
    </HeadContainer>
  )
}

export default Header
