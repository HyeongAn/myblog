import { CurrentProps } from '../../../types/props'
import { RowCenterContainer } from '../style/container'
import { ManagedOutLine, ManagedSpot } from '../style/menu/menu'

const SlideMenuProfileCurrent = ({ managed, outline }: CurrentProps) => {
  return (
    <RowCenterContainer style={{ gap: '6px' }}>
      <ManagedSpot $managed={managed} />
      <ManagedOutLine $managed={managed}>{outline}</ManagedOutLine>
    </RowCenterContainer>
  )
}

export default SlideMenuProfileCurrent
