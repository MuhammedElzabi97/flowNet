import { Route, Routes } from 'react-router-dom'
import Messages from './pages/Messages'
import Layout from './pages/Layout'
import Feed from './pages/Feed'
import Chat from './pages/Chat'
import Connections from './pages/Connections'
import Search from './pages/Search'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Settings from './pages/Settings'
import PostDetailes from './pages/PostDetailes'
import NotificationsPage from './pages/NotificationsPage'
import Login from './pages/Login'
import { useUser } from '@clerk/clerk-react'

const App = () => {
  {/*const {user}=useUser()*/}
  return (
    
    <>
    <Routes>
      {/*<Route path = "/" element = {!user ? <Login/>: <Layout/>}>*/}
      <Route path = "/" element = { <Layout/>}>
          <Route index element = {<Feed/>}/>
          <Route path='messages' element ={<Messages/>} />
          <Route path='messages/:userId' element ={<Chat/>} />
          <Route path='connections' element ={<Connections/>} />
          <Route path='search' element ={<Search/>} />
          <Route path='profile' element ={<Profile/>} />
          <Route path='profile/:profileId' element ={<Profile/>} />
          <Route path='create-post' element ={<CreatePost/>} />
          <Route path='settings' element ={<Settings/>} />
          <Route path='post/:postId' element ={<PostDetailes/>} />
          <Route path='notifications' element ={<NotificationsPage/>} />
          <Route path="/login" element={<Login />} />


          

      </Route>
    </Routes>
    </>
  )
}


export default App
