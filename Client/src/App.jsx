import './App.css'
import HeroSection from './components/HeroSection'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
     
     <Router>
        <Routes>
          <Route path="/" element={<HeroSection/>}/>
          <Route path="/home" element={<HomePage/>}>

          <Route path='profile/:id' element={<Profile/>}/>
          
          </Route>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
     </Router>
     <ToastContainer/>
    </>
  )
}

export default App
