import Link from 'next/link'
import { HTMLProps } from 'react'

type LinkProps = {
  href: string
  children: React.ReactNode
  hNumber: string
  isPass: boolean
}

const CustomLink = ({ href, children, hNumber, isPass }: LinkProps) => {
  const foundHeaders = () => {
    switch (hNumber) {
      case 'H1':
        return (
          <Link data-active={isPass} href={href}>
            {children}
          </Link>
        )
      case 'H2':
        return (
          <Link data-active={isPass} style={{ marginLeft: '12px' }} href={href}>
            {children}
          </Link>
        )
      case 'H3':
        return (
          <Link data-active={isPass} style={{ marginLeft: '24px' }} href={href}>
            {children}
          </Link>
        )
    }
  }

  return <>{foundHeaders()}</>
}

export default CustomLink
