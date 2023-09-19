'use client'
import { Value } from '../../../../types/props'
import { useEffect, useState } from 'react'
import { ContentsContainer } from '@/components/style/container'
import MarkdownView from '@/components/markdown/markdown-view'

interface DetailPageProps {
  content: Value
}

const DetailPage = ({ content }: DetailPageProps) => {
  const [markdown, setMarkdown] = useState<string>('')

  useEffect(() => {
    setMarkdown(content.toString())
  }, [])

  return (
    <ContentsContainer style={{ maxWidth: '768px' }}>
      <MarkdownView post={markdown} />
    </ContentsContainer>
  )
}

export default DetailPage
