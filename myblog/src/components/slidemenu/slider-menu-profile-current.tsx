import { CurrentProps } from '../../../types/props'
import { RowCenterContainer } from '../style/container'
import { ManagedOutLine, ManagedSpot } from '../style/menu/menu'

const SlideMenuProfileCurrent = ({ isManaged, outline }: CurrentProps) => {
  return (
    <RowCenterContainer style={{ gap: '6px' }}>
      <ManagedSpot isManaged={isManaged} />
      <ManagedOutLine isManaged={isManaged}>{outline}</ManagedOutLine>
    </RowCenterContainer>
  )
}

export default SlideMenuProfileCurrent
