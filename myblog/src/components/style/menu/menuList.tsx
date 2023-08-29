import Link from 'next/link'
import { MenuListProps } from '../../../../types/props'

const MenuList = ({ list, clickEvent }: MenuListProps) => {
  return (
    <li>
      <Link
        style={{
          height: '30px',
          color: '#666666',
          cursor: 'pointer',
          fontSize: '18px',
        }}
        onClick={() => clickEvent()}
        href={list.href}
      >
        {list.name}
      </Link>
    </li>
  )
}

export default MenuList
