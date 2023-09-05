'use client'
import Image from 'next/image'
import profilePicture from '../../../assets/profile.jpg'
import notionIcon from '../../../assets/Notion-logo.svg'
import gitIcon from '../../../assets/Git-logo.svg'
import velogIcon from '../../../assets/velog-logo.svg'
import { RowBetweenContainer } from '../style/container'
import ProfileIconButtons from '../style/buttons/profile-icon-button'

const SlideMenuProfile = () => {
  return (
    <>
      <Image
        src={profilePicture}
        alt="profile image"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <RowBetweenContainer style={{ width: '100px', marginTop: '10px' }}>
        {Array.from({
          length: 3,
          0: {
            href: 'https://www.notion.so/87d3f1d26daf49368f9dfe7119f2cb84?pvs=4',
            src: notionIcon,
            alt: 'notion icon',
          },
          1: {
            href: 'https://github.com/HyeongAn',
            src: gitIcon,
            alt: 'git icon',
          },
          2: {
            href: 'https://velog.io/@ahsy92',
            src: velogIcon,
            alt: 'velog icon',
          },
        }).map((menu, index) => {
          return (
            <ProfileIconButtons
              key={`menu-list-index-${index}`}
              src={menu.src}
              href={menu.href}
              alt={menu.alt}
            />
          )
        })}
      </RowBetweenContainer>
    </>
  )
}

export default SlideMenuProfile
