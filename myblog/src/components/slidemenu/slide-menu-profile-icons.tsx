'use client'
import { RowBetweenContainer } from '../style/container'
import ProfileIconButtons from '../style/buttons/profile-icon-button'

const ProfileIcons = () => {
  return (
    <RowBetweenContainer style={{ width: '150px', marginTop: '6px', gap: '10px' }}>
      {Array.from({
        length: 4,
        0: {
          href: 'https://github.com/HyeongAn',
          image: 'git',
          alt: 'git icon',
          name: 'Git',
          managed: true,
        },
        1: {
          href: 'mailto:ahsy92@naver.com',
          image: 'email',
          alt: 'email icon',
          name: 'Email',
          managed: true,
        },
        2: {
          href: 'https://www.rocketpunch.com/@guddks84',
          image: 'rocket',
          alt: 'rocket punch icon',
          name: 'RocketPunch',
          managed: true,
        },
        3: {
          href: 'https://velog.io/@ahsy92',
          image: 'velog',
          alt: 'velog icon',
          name: 'Velog',
          managed: false,
        },
      }).map((menu, index) => {
        return <ProfileIconButtons key={`menu-list-index-${index}`} profile={menu} />
      })}
    </RowBetweenContainer>
  )
}

export default ProfileIcons
