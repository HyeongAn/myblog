'use client'
import Image from 'next/image'
import nukiProfilePicture from '../../../assets/nuki_profile.png'
import ProfileIcons from './slide-menu-profile-icons'
import { SlideProfileContainer } from '../style/menu/menu'

const SlideMenuProfile = () => {
  return (
    <>
      <SlideProfileContainer>
        <div>
          <Image src={nukiProfilePicture} alt="profile image" layout="fill" objectFit="contain" />
        </div>
      </SlideProfileContainer>
      <ProfileIcons />
    </>
  )
}

export default SlideMenuProfile
