'use client'

import { IndexBody, IndexContainer, IndexHeader } from '@/components/style/main'
import { MainPostDataProps } from '../../../../types/props'
import Link from 'next/link'

const MainIndex = ({ postData }: MainPostDataProps) => {
  return (
    <IndexContainer>
      <IndexHeader>Lately.</IndexHeader>
      <IndexBody>
        <ul>
          {postData.map((data, index) => {
            return (
              <Link href={`/${data.data.category}/${data.slug}`} key={`index-data-${index}`}>
                <li>
                  <p style={{ color: 'black', opacity: '0.6', fontSize: '12px' }}>{data.data.date}</p>
                  <p style={{ color: 'black', fontSize: '14px' }}>{data.data.title}</p>
                </li>
              </Link>
            )
          })}
        </ul>
      </IndexBody>
    </IndexContainer>
  )
}

export default MainIndex
