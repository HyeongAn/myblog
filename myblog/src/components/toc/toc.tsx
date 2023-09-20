'use client'

import { useEffect, useState } from 'react'
import CustomLink from './custom-link'
import useObservation from '../../../lib/hooks/useObservation'

const TOC = () => {
  const [currentId, setCurrentId] = useState<string>('')
  // 맨처음엔 Element였음.
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([])

  useEffect(() => {
    const observer = useObservation(setCurrentId)
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1, h2, h3'))

    setHeadingEls(headingElements)

    headingElements.map((header) => {
      observer.observe(header)
    })
  }, [])

  return (
    <>
      {headingEls?.map((heading, index) => {
        return (
          <CustomLink
            hNumber={heading.nodeName}
            isPass={heading.id === currentId}
            href={'#' + heading.id}
            key={`heading-${index}`}
          >
            {heading.innerText}
          </CustomLink>
        )
      })}
    </>
  )
}
export default TOC
