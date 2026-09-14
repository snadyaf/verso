import { useState } from 'react'
import Catalogo from './Components/Catalogo/Catalogo'
import ReservationDialog from './Components/Reserva/Reserva'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Footer from './Components/Footer/Footer'
import CTA from './Components/CTA/CTA'
import Login from './Components/Login/Login'
import Perfil from './Components/Perfil/Perfil'

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
  const [selectedBook, setSelectedBook] = useState(null)
  const [reservationVisible, setReservationVisible] = useState(false)

  const handleReserve = (book) => {
    setSelectedBook(book)
    setReservationVisible(true)
  }

  const closeReservation = () => {
    setReservationVisible(false)
    setSelectedBook(null)
  }

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
        books={books}
        loading={loading}
        error={error}
        searched={searched}
        page={page}
        nextUrl={nextUrl}
        prevUrl={prevUrl}
        onNext={handleNext}
        onReserve={handleReserve}
        onPrev={handlePrev}
      />
      <Catalogo books={books} loading={loading} error={error} searched={searched} query={query} page={page} nextUrl={nextUrl} prevUrl={prevUrl} onNext={handleNext} onPrev={handlePrev} onReserve={handleReserve} />
      <ReservationDialog visible={reservationVisible} book={selectedBook} onHide={closeReservation} onReservationConfirmed={closeReservation} />
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