import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Next from './pages/Next'

function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Next />} />
      </Routes>
    </>
  )
}

export { App }
