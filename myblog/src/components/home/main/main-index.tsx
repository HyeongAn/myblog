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
          {postData.slice(0, 10).map((data, index) => {
            return (
              <Link href={`/${data.data.category}/${data.slug}`} key={`index-data-${index}`}>
                <li>
                  <p style={{ opacity: '0.6', fontSize: '12px' }}>{data.data.date}</p>
                  <p style={{ fontSize: '14px' }}>{data.data.title}</p>
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
