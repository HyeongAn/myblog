'use client'
import Link from 'next/link'
import { HeadContainer } from '../style/container'
import { useContext, useEffect, useState } from 'react'
import miniMenu from '../../../assets/svg/mini-menu.svg'
import Image from 'next/image'
import SlideMenu from '../slidemenu/slide-menu'
import SlideMenuContents from '../slidemenu/slide-menu-contents'

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

  return (
    <HeadContainer>
      <Link href="/" style={{ color: 'black', marginRight: '8px' }}>
        <h1>An.</h1>
      </Link>
      {width >= 640 ? (
        <div style={{ position: 'absolute', right: '10px' }}>
          <Link href="/" style={{ color: 'black', marginRight: '8px' }}>
            Home
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
          <Image src={miniMenu} alt="menu button" style={{ width: '18px', height: '18px' }} />
        </div>
      )}
      <SlideMenu isOpen={isOpen} setIsOpen={setIsOpen} xPosition={xPosition} setXPosition={setXPosition}>
        <SlideMenuContents toggleMenu={toggleMenu} />
      </SlideMenu>
    </HeadContainer>
  )
}

export default Header
