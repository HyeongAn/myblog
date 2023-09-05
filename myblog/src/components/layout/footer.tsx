import { FooterContainer, FooterLinkContainer } from '../style/container'

const Footer = () => {
  return (
    <FooterContainer>
      <div style={{ width: '100%', padding: '10px' }}>
        <p style={{ fontWeight: '700' }}>{`CopyRight. YoonHu's Blog`}</p>
        <p style={{ margin: '0' }}>
          공부한것을 적어두고 기록해두는 블로그입니다.
        </p>
        <p style={{ margin: '0' }}>FrontEnd Developer</p>
      </div>
    </FooterContainer>
  )
}

export default Footer
