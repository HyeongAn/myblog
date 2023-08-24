import Link from 'next/link'
import { HeadContainer, HeadLinkContainer } from '../style/container'

const Header = () => {
  return (
    <HeadContainer>
      <h1>{`YoonHu's Blog`}</h1>
      <HeadLinkContainer>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
      </HeadLinkContainer>
    </HeadContainer>
  )
}

export default Header
