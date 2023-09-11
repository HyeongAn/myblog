'use client'
import Image from 'next/image'
import nukiProfilePicture from '../../../assets/nuki_profile.png'
import ProfileIcons from './slide-menu-profile-icons'
import { SlideProfileContainer } from '../style/menu/menu'
import { ColumnCenterContainer } from '../style/container'
import SlideMenuProfileCurrent from './slider-menu-profile-current'

const SlideMenuProfile = () => {
  return (
    <>
      <SlideProfileContainer>
        <div>
          <Image src={nukiProfilePicture} alt="profile image" layout="fill" objectFit="contain" />
        </div>
      </SlideProfileContainer>
      <ColumnCenterContainer>
        <p>권형안</p>
        {Array.from({
          length: 2,
          0: { isManaged: true, outline: 'Currently Managed' },
          1: { isManaged: false, outline: 'Currently not Managed' },
        }).map((content, index) => {
          return (
            <SlideMenuProfileCurrent
              isManaged={content.isManaged}
              outline={content.outline}
              key={`profile-content-index-${index}`}
            />
          )
        })}
      </ColumnCenterContainer>
      <ProfileIcons />
    </>
  )
}

export default SlideMenuProfile
