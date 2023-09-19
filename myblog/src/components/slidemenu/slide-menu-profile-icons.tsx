'use client'
import notionIcon from '../../../assets/Notion-logo.svg'
import gitIcon from '../../../assets/Git-logo.svg'
import velogIcon from '../../../assets/velog-logo.svg'
import emailIcon from '../../../assets/email-logo.svg'
import rocketpunch from '../../../assets/rocketpunch-logo.svg'
import { RowBetweenContainer } from '../style/container'
import ProfileIconButtons from '../style/buttons/profile-icon-button'

const ProfileIcons = () => {
  return (
    <RowBetweenContainer style={{ width: '130px', marginTop: '6px', justifyContent: 'center', gap: '10px' }}>
      {Array.from({
        length: 4,
        0: {
          href: 'https://github.com/HyeongAn',
          src: gitIcon,
          alt: 'git icon',
          name: 'Git',
          managed: true,
        },
        1: {
          href: 'mailto:ahsy92@naver.com',
          src: emailIcon,
          alt: 'email icon',
          name: 'Email',
          managed: true,
        },
        2: {
          href: 'https://www.rocketpunch.com/@guddks84',
          src: rocketpunch,
          alt: 'rocket punch icon',
          name: 'RocketPunch',
          managed: true,
        },
        3: {
          href: 'https://velog.io/@ahsy92',
          src: velogIcon,
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
