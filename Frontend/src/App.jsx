import React, {useState, useEffect} from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import View from './Pages/View'
// import Signs from './Pages/Register'
// import SignInPage from './Pages/signin'
import SignUpPage from './Pages/signup'
import Dashboard from './Pages/Dashboard'
import Signup from './Pages/signup'
import Login from './Pages/Login'
import MenuMovie from './Pages/MenuMovie'
// import { useAuthContext } from './context/authContext'
import { useAuthContext } from './context/authContext'
function App() {

  const { AuthUser } = useAuthContext()

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='w-screen'>
      {/* {isSmallScreen ? ( */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/view/:id' element={ AuthUser ? <View /> : <Navigate to='/login' /> } />
          {/* <Route path='/login' element={<SignInPage />} /> */}
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/dashboard' element={ AuthUser ? <Dashboard /> : <Navigate to='/login' /> } />
          <Route path='/Register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/menu' element={ AuthUser ? <MenuMovie /> : <Navigate to='/login' /> } />
        </Routes>
      {/* ) : ( */}
        {/* <div className='w-flex items-center text-center justify-center flex-1'>
          <h1>
          iPads, PCs, and large TV screens are still in development.
            Use Smart Phones
          </h1>
          // {/* <Routes>
          //   <Rutes> */}
        {/* </div>oute path='/sign' element={<Signs />} />
          </Ro
      // )} */}
    </div>
  )
}

export default App
