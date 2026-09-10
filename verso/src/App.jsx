import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Footer from './Components/Footer/Footer'
import CTA from './Components/CTA/CTA'

function App() {
  
  return (
    <>
     <Navbar />

     <Hero />

     <CTA />

     <Footer />
    </>
  )
}

export default App
