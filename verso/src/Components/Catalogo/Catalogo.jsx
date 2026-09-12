import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import BookCard from "../BookCard/BookCard";
import "./Catalogo.css";

const BASE_URL = "https://gutendex.com/books/";

function Catalogo() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searched, setSearched] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [page, setPage] = useState(1);

  const fetchBooks = async (url) => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Falha na requisição");
      const data = await res.json();
      setBooks(data.results || []);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (err) {
      setError(true);
      setBooks([]);
      setNextUrl(null);
      setPrevUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    setPage(1);
    fetchBooks(`${BASE_URL}?search=${encodeURIComponent(query)}`);
  };

  const handleNext = () => {
    if (!nextUrl) return;
    setPage((p) => p + 1);
    fetchBooks(nextUrl);
  };

  const handlePrev = () => {
    if (!prevUrl) return;
    setPage((p) => p - 1);
    fetchBooks(prevUrl);
  };

  const listTemplate = (items) => (
    <div className="catalogo-grid">
      {items.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );

  return (
    <section className="catalogo">
      <div className="catalogo-header">
        <h1>Catálogo de Livros</h1>
        <p>Encontre algo novo para ler</p>

        <form className="catalogo-search" onSubmit={handleSearch}>
          <InputText
            placeholder="Busque por título, autor ou assunto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button label="Pesquisar" type="submit" />
        </form>
      </div>

      <div className="catalogo-content">
        {loading && (
          <div className="catalogo-status">
            <ProgressSpinner style={{ width: "40px", height: "40px" }} strokeWidth="4" />
            <p>Buscando livros...</p>
          </div>
        )}

        {error && !loading && (
          <Message severity="error" text="Não foi possível buscar os livros agora. Tente novamente." />
        )}

        {!loading && !error && searched && books.length === 0 && (
          <Message severity="warn" text={`Nenhum livro encontrado para "${query}".`} />
        )}

        {!loading && !error && books.length > 0 && (
          <>
            <DataView value={books} listTemplate={listTemplate} />

            <div className="catalogo-pagination">
              <Button
                label="Anterior"
                icon="pi pi-chevron-left"
                onClick={handlePrev}
                disabled={!prevUrl}
                outlined
              />
              <span className="catalogo-page-label">Página {page}</span>
              <Button
                label="Próxima"
                icon="pi pi-chevron-right"
                iconPos="right"
                onClick={handleNext}
                disabled={!nextUrl}
                outlined
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Catalogo;