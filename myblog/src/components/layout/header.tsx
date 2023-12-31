'use client'
import Link from 'next/link'
import { HeadContainer } from '../style/container'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { ControllerButton, DarkThemeButton, LightThemeButton, ThemeButton } from '../style/buttons/button'
import moon from '../../../assets/svg/moon-icon.svg'
import sun from '../../../assets/svg/sun-icon.svg'
import wifi from '../../../assets/svg/wifi-icon.svg'
import { themeContext } from '../../../lib/context.module'
import SvgStyle from '../style/svg-style'

interface HeaderProps {
  xWidth: number
}

const Header = ({ xWidth }: HeaderProps) => {
  const { setTheme } = useContext(themeContext)
  const [width, setWidth] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [xPosition, setXPosition] = useState(xWidth)

  // useEffect(() => {
  //   setWidth(window.innerWidth)
  // }, [])

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
    setTheme(newTheme)
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
        Hu.
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
        <Link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="Blog Feed RSS"
          style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ControllerButton
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px',
            }}
          >
            <SvgStyle image="wifi" />
          </ControllerButton>
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
