'use client'
import { ContentsContainer } from '@/components/style/post'
import { Value } from '../../../../types/props'
import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

interface DetailPageProps {
  content: Value
}

const DetailPage = ({ content }: DetailPageProps) => {
  useEffect(() => {
    hljs.highlightAll()
  }, [])

  return (
    <ContentsContainer>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </ContentsContainer>
  )
}

export default DetailPage
