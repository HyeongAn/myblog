import PostList from '@/components/home/posts/posts-list'
import Main from '../components/home/main/main'
import SlideMenuProfile from '@/components/slidemenu/slide-menu-profile'

const Home = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Main />
      <PostList />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <SlideMenuProfile />
      </div>
    </div>
  )
}

export default Home
