'use client'
import { Value } from '../../../../types/props'
import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { ContentsContainer } from '@/components/style/container'

interface DetailPageProps {
  content: Value
}

const DetailPage = ({ content }: DetailPageProps) => {
  useEffect(() => {
    hljs.highlightAll()
  }, [])

  return (
    <ContentsContainer style={{ maxWidth: '768px' }}>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </ContentsContainer>
  )
}

export default DetailPage
