import './App.css'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'
import CTA from './components/CTA/CTA'
import Catalogo from './components/Catalogo/Catalogo'
import Login from './components/Login/Login'
import Perfil from './components/Perfil/Perfil'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Catalogo />
      <CTA />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  )
}

export default App