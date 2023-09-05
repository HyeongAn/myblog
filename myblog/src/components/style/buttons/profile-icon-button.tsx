import Image from 'next/image'
import { ProfileIconButtonProps } from '../../../../types/props'

const ProfileIconButtons = ({ href, src, alt }: ProfileIconButtonProps) => {
  return (
    <a href={href}>
      <Image src={src} alt={alt} style={{ width: '18px', height: '18px' }} />
    </a>
  )
}

export default ProfileIconButtons
