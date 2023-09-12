'use client'

import { SlideMenuBody, SlideMenuHeader, SlideMenuUl } from '../style/menu/menu'
import closeIcon from '../../../assets/svg/close-icon.svg'
import Image from 'next/image'
import CloseButtons from '../style/buttons/close-button'
import MenuList from '../style/menu/menuList'
import SlideMenuProfile from './slide-menu-profile'

interface MenuContentsProps {
  toggleMenu: () => void
}

const SlideMenuContents = ({ toggleMenu }: MenuContentsProps) => {
  return (
    <>
      <SlideMenuHeader>
        <span style={{ fontWeight: '700', fontSize: '20px' }}>Menu</span>
        <CloseButtons src={closeIcon} alt={'close-button'} clickEvent={toggleMenu} />
      </SlideMenuHeader>
      <SlideMenuBody>
        <SlideMenuProfile />
        <SlideMenuUl>
          {Array.from({
            length: 1,
            0: { name: 'Home', href: '/' },
            1: { name: 'Blog', href: '/blog' },
          }).map((menu, index) => {
            return <MenuList clickEvent={toggleMenu} list={menu} key={`menu-list-index-${index}`} />
          })}
        </SlideMenuUl>
      </SlideMenuBody>
    </>
  )
}

export default SlideMenuContents
