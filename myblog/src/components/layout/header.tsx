'use client'
import Link from 'next/link'
import { HeadContainer } from '../style/container'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { DarkThemeButton, LightThemeButton, ThemeButton } from '../style/buttons/button'
import moon from '../../../assets/svg/moon-icon.svg'
import sun from '../../../assets/svg/sun-icon.svg'

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

  const themeModeHandle = () => {
    const newTheme = localStorage.theme === 'dark' ? 'light' : 'dark'
    localStorage.theme = newTheme
    document.body.dataset.theme = newTheme
  }

  return (
    <HeadContainer>
      <Link
        href="/"
        style={{
          fontStyle: 'italic',
          fontSize: '24px',
          fontWeight: '700',
          margin: '20px 20px',
        }}
      >
        An.
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* {width >= 640 ? ( */}
        <Link
          href="https://www.notion.so/87d3f1d26daf49368f9dfe7119f2cb84?pvs=4"
          target="_blank"
          style={{ marginRight: '8px', fontStyle: 'italic', fontWeight: '700' }}
        >
          About
        </Link>
        <DarkThemeButton>
          <ThemeButton onClick={() => themeModeHandle()}>
            <Image src={sun} alt="light theme icon" />
          </ThemeButton>
        </DarkThemeButton>
        <LightThemeButton>
          <ThemeButton onClick={() => themeModeHandle()}>
            <Image src={moon} alt="dark theme icon" />
          </ThemeButton>
        </LightThemeButton>
      </div>
      {/* ) : (
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
      */}
    </HeadContainer>
  )
}

export default Header
