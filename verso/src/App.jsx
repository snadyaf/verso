import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'
import CTA from './components/CTA/CTA'
import Catalogo from './components/Catalogo/Catalogo'
import Login from './components/Login/Login'
import Perfil from './components/Perfil/Perfil'

const BASE_URL = "https://gutendex.com/books/"

function Home() {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searched, setSearched] = useState(false)
  const [nextUrl, setNextUrl] = useState(null)
  const [prevUrl, setPrevUrl] = useState(null)
  const [page, setPage] = useState(1)

  const fetchBooks = async (url) => {
    setLoading(true)
    setError(false)

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error("Falha na requisição")
      const data = await res.json()
      setBooks(data.results || [])
      setNextUrl(data.next)
      setPrevUrl(data.previous)
    } catch (err) {
      setError(true)
      setBooks([])
      setNextUrl(null)
      setPrevUrl(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setSearched(true)
    setPage(1)
    fetchBooks(`${BASE_URL}?search=${encodeURIComponent(query)}`)
  }

  const handleNext = () => {
    if (!nextUrl) return
    setPage((p) => p + 1)
    fetchBooks(nextUrl)
  }

  const handlePrev = () => {
    if (!prevUrl) return
    setPage((p) => p - 1)
    fetchBooks(prevUrl)
  }

  return (
    <>
      <Navbar />
      <Hero
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />
      <Catalogo
        books={books}
        loading={loading}
        error={error}
        searched={searched}
        query={query}
        page={page}
        nextUrl={nextUrl}
        prevUrl={prevUrl}
        onNext={handleNext}
        onPrev={handlePrev}
      />
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