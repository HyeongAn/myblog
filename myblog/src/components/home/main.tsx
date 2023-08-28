import Image from 'next/image'
import profilePicture from '../../../assets/profile.jpeg'
import notionIcon from '../../../assets/Notion-logo.svg'
import gitIcon from '../../../assets/Git-logo.svg'
import {
  ColumnCenterContainer,
  RowLeftContainer,
  ContentContainer,
  ContentHeaderContainer,
  ContentBodyContainer,
} from '../style/container'
import IconButtons from '../style/buttons/iconButton'

const Main = () => {
  return (
    <ColumnCenterContainer>
      <ContentContainer>
        <ContentHeaderContainer>
          <h1>{`👨🏻‍💻 YoonHu's Intro`}</h1>
          <Image style={{ borderRadius: '12px' }} src={profilePicture} alt="profileImage" />
        </ContentHeaderContainer>
        <ContentBodyContainer>
          <h3>프론트엔드 개발자 권형안입니다.</h3>
          <p>
            좋아하는 것을 만들고 이를 통해 사용자의 더 나은 삶에 기여하고자 합니다.
            <br />
            현재는 대형 에너지 및 공정 설비 시뮬레이션을 통한 디지털 트윈 서비스 회사에서 데스크톱 App 프론드엔드
            개발자로 재직중에 있습니다.
          </p>
          <RowLeftContainer style={{ marginTop: '10px' }}>
            <IconButtons
              src={notionIcon}
              alt="notion icon"
              name="Notion"
              href="https://www.notion.so/87d3f1d26daf49368f9dfe7119f2cb84?pvs=4"
            />
            <IconButtons src={gitIcon} alt="git icon" name="Git" href="https://github.com/HyeongAn" />
          </RowLeftContainer>
        </ContentBodyContainer>
      </ContentContainer>
    </ColumnCenterContainer>
  )
}

export default Main