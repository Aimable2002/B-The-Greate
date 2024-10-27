import React, {useState, useEffect} from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import View from './Pages/View'

function App() {

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
      {isSmallScreen ? (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/view' element={<View />} />
        </Routes>
      ) : (
        <div className='w-flex items-center justify-center flex-1'>
          <h1>
          iPads, PCs, and large TV screens are still in development.
            Use Smart Phones
          </h1>
        </div>
      )}
    </div>
  )
}

export default App
