import Image from 'next/image'
import { CloseButtonProps } from '../../../../types/props'
import { CloseButton } from './button'

const CloseButtons = ({ src, alt, clickEvent }: CloseButtonProps) => {
  return (
    <CloseButton>
      <Image
        src={src}
        alt={alt}
        width="25"
        height="25"
        onClick={() => clickEvent()}
      />
    </CloseButton>
  )
}

export default CloseButtons
