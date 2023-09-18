'use client'
import { PostGridContainer, PostsListContainer } from '@/components/style/container'
import { PostListProps } from '../../../../types/props'
import PostCard from './post-card'
import { AnimatePresence, motion } from 'framer-motion'

const Posts = ({ postData }: PostListProps) => {
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
          {postData && postData.map((data, index) => <PostCard postData={data} key={`post-card-${index}`} />)}
        </PostGridContainer>
      </motion.div>
    </AnimatePresence>
  )
}

export default Posts
