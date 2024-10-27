import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import View from './Pages/View'

function App() {

  return (
    <div className='w-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/view' element={<View />} />
      </Routes>
    </div>
  )
}

export default App
