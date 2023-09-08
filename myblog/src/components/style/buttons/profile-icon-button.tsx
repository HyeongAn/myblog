import Image from 'next/image'
import { ProfileIconButtonProps } from '../../../../types/props'
import { IconLink, IconLinkContainer } from './button'
import { ManagedSpot } from '../menu/menu'

const ProfileIconButtons = ({ profile }: ProfileIconButtonProps) => {
  return (
    <IconLinkContainer>
      <IconLink aria-describedby="icon-info" target="_blank" href={profile.href}>
        <Image src={profile.src} alt={profile.alt} style={{ width: '18px', height: '18px' }} />
      </IconLink>
      <span role="tooltip" id="icon-info">
        {profile.name}
      </span>
      <ManagedSpot isManaged={profile.isManaged} />
    </IconLinkContainer>
  )
}

export default ProfileIconButtons
