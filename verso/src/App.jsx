
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Footer from "./Components/Footer/Footer";
import CTA from "./Components/CTA/CTA";
import Login from "./Components/Login/Login";
import Perfil from "./Components/Perfil/Perfil";
import Catalogo from "./Components/Catalogo/Catalogo";
import ReservationDialog from "./Components/Reserva/Reserva";

const BASE_URL = "https://gutendex.com/books/";

function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searched, setSearched] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [page, setPage] = useState(1);

  const [selectedBook, setSelectedBook] = useState(null);
  const [reservationVisible, setReservationVisible] = useState(false);

  const fetchBooks = async (url) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Falha na requisição");
      }

      const data = await response.json();

      setBooks(data.results || []);
      setNextUrl(data.next || null);
      setPrevUrl(data.previous || null);
    } catch (err) {
      setError(true);
      setBooks([]);
      setNextUrl(null);
      setPrevUrl(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(BASE_URL);
  }, []);

  const handleQueryChange = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setSearched(false);
      setPage(1);
      fetchBooks(BASE_URL);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const search = query.trim();

    if (!search) {
      setSearched(false);
      setPage(1);
      fetchBooks(BASE_URL);
      return;
    }

    setSearched(true);
    setPage(1);

    fetchBooks(
      `${BASE_URL}?search=${encodeURIComponent(search)}`
    );
  };

  const handleNext = () => {
    if (!nextUrl) return;

    setPage((currentPage) => currentPage + 1);
    fetchBooks(nextUrl);
  };

  const handlePrev = () => {
    if (!prevUrl) return;

    setPage((currentPage) => currentPage - 1);
    fetchBooks(prevUrl);
  };

  const handleReserve = (book) => {
    setSelectedBook(book);
    setReservationVisible(true);
  };

  const closeReservation = () => {
    setReservationVisible(false);
    setSelectedBook(null);
  };

  return (
    <>
      <Navbar />

      <Hero
        query={query}
        onQueryChange={handleQueryChange}
        onSearch={handleSearch}
        books={books}
        loading={loading}
        error={error}
        searched={searched}
        page={page}
        nextUrl={nextUrl}
        prevUrl={prevUrl}
        onNext={handleNext}
        onPrev={handlePrev}
        onReserve={handleReserve}
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
        onReserve={handleReserve}
      />

      <ReservationDialog
        visible={reservationVisible}
        book={selectedBook}
        onHide={closeReservation}
        onReservationConfirmed={closeReservation}
      />

      <CTA />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}

export default App;