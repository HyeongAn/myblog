import Main from '../components/home/main/main'
import SlideMenuProfile from '@/components/slidemenu/slide-menu-profile'

const Home = () => {
  return (
    <div className="home">
      <Main />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <SlideMenuProfile />
      </div>
    </div>
  )
}

export default Home
