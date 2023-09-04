'use client'
import Image from 'next/image'
import profilePicture from '../../../assets/profile.jpg'
import notionIcon from '../../../assets/Notion-logo.svg'
import gitIcon from '../../../assets/Git-logo.svg'
import { RowBetweenContainer } from '../style/container'

const SlideMenuProfile = () => {
  return (
    <>
      <Image
        src={profilePicture}
        alt="profile image"
        width={100}
        height={100}
        style={{ borderRadius: '50%' }}
      />
      <RowBetweenContainer style={{ width: '80px', marginTop: '10px' }}>
        <a href="https://www.notion.so/87d3f1d26daf49368f9dfe7119f2cb84?pvs=4">
          <Image src={notionIcon} alt="notion icon" width={18} height={18} />
        </a>
        <a href="https://github.com/HyeongAn">
          <Image src={gitIcon} alt="git icon" width={18} height={18} />
        </a>
      </RowBetweenContainer>
    </>
  )
}

export default SlideMenuProfile
