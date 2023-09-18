'use client'
import Image from 'next/image'
import nukiProfilePicture from '../../../assets/nuki_profile.png'
import ProfileIcons from './slide-menu-profile-icons'
import { SlideProfileContainer } from '../style/menu/menu'
import { ColumnCenterContainer } from '../style/container'
import SlideMenuProfileCurrent from './slider-menu-profile-current'

const SlideMenuProfile = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <SlideProfileContainer>
        <div>
          <Image src={nukiProfilePicture} alt="profile image" fill style={{ objectFit: 'contain' }} />
        </div>
      </SlideProfileContainer>
      <ColumnCenterContainer>
        <p>권형안</p>
        {Array.from({
          length: 2,
          0: { managed: true, outline: 'Currently Managed' },
          1: { managed: false, outline: 'Currently not Managed' },
        }).map((content, index) => {
          return (
            <SlideMenuProfileCurrent
              managed={content.managed}
              outline={content.outline}
              key={`profile-content-index-${index}`}
            />
          )
        })}
      </ColumnCenterContainer>
      <ProfileIcons />
    </div>
  )
}

export default SlideMenuProfile
