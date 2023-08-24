import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { IconButton } from './button'
import Image from 'next/image'
import { InconButtonProps } from '../../../../types/props'

const IconButtons = ({ src, alt, name, href }: InconButtonProps) => {
  return (
    <IconButton href={href}>
      <Image style={{ width: '30px', height: '30px', marginRight: '5px' }} src={src} alt={`${alt}`} />
      <p>{name}</p>
    </IconButton>
  )
}

export default IconButtons
