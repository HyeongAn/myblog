'use client'
import { PostsListContainer } from '@/components/style/container'
import { PostListProps } from '../../../../types/props'
import PostCard from './post-card'
import { AnimatePresence, motion } from 'framer-motion'

const Posts = ({ postData }: PostListProps) => {
  return (
    <AnimatePresence>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          gap: '20px',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '900px',
          flexWrap: 'wrap',
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        {postData && postData.map((data, index) => <PostCard postData={data} key={`post-card-${index}`} />)}
      </motion.div>
    </AnimatePresence>
  )
}

export default Posts
