'use client'
import { PostData, Value } from '../../../../types/props'
import { useEffect, useState } from 'react'
import { ContentsContainer } from '@/components/style/container'
import MarkdownView from '@/components/markdown/markdown-view'
import { AnimatePresence, motion } from 'framer-motion'
import SuggestPage from './suggest-page'
import SlideMenuProfile from '@/components/slidemenu/slide-menu-profile'
import { TOCAside } from '@/components/style/toc'
import TOC from '@/components/toc/toc'

interface DetailPageProps {
  content: string
  postData: PostData[]
}

const DetailPage = ({ content, postData }: DetailPageProps) => {
  return (
    <AnimatePresence>
      <motion.div
        style={{ width: '100%', maxWidth: '768px' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        <ContentsContainer style={{ maxWidth: '768px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '100%' }}>
            <TOCAside>
              <TOC />
            </TOCAside>
          </div>
          <MarkdownView post={content} />
        </ContentsContainer>
        <SuggestPage postData={postData} />
        <SlideMenuProfile />
      </motion.div>
    </AnimatePresence>
  )
}

export default DetailPage
