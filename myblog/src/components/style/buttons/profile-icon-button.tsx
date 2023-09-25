import Image from 'next/image'
import { ProfileIconButtonProps } from '../../../../types/props'
import { IconLink, IconLinkContainer } from './button'
import { ManagedSpot } from '../menu/menu'
import SvgStyle from '../svg-style'

const ProfileIconButtons = ({ profile }: ProfileIconButtonProps) => {
  return (
    <IconLinkContainer>
      <div style={{ width: '26px', height: '26px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconLink aria-describedby="icon-info" target="_blank" href={profile.href}>
          <SvgStyle image={profile.image} />
        </IconLink>
      </div>
      <span role="tooltip" id="icon-info">
        {profile.name}
      </span>
      <ManagedSpot style={{ position: 'absolute', bottom: '0', right: '0' }} $managed={profile.managed} />
    </IconLinkContainer>
  )
}

export default ProfileIconButtons
