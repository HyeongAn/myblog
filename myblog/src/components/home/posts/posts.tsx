'use client'
import { PostGridContainer } from '@/components/style/container'
import { PostListProps } from '../../../../types/props'
import PostCard from './post-card'
import { AnimatePresence, motion } from 'framer-motion'
import useInfiniteScroll from '../../../../lib/hooks/useInfiniteScroll'

const NUMBER_OF_ITEMS_PER_PAGE = 10

const Posts = ({ postData }: PostListProps) => {
  const [observeRef, count] = useInfiniteScroll()
  return (
    <AnimatePresence>
      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        <PostGridContainer>
          {postData &&
            postData
              .slice(0, count * NUMBER_OF_ITEMS_PER_PAGE)
              .map((data, index) => <PostCard postData={data} key={`post-card-${index}`} />)}
        </PostGridContainer>
        <div ref={observeRef} style={{ width: '100%', height: '30px' }} />
      </motion.div>
    </AnimatePresence>
  )
}

export default Posts
