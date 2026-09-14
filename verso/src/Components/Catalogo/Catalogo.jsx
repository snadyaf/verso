
import { useState } from "react";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

import BookCard from "../BookCard/BookCard";
import ReservationDialog from "../Reserva/Reserva";

import "./Catalogo.css";

function Catalogo({
  books = [],
  loading,
  error,
  searched,
  query,
  page,
  nextUrl,
  prevUrl,
  onNext,
  onPrev,
}) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [reservationVisible, setReservationVisible] = useState(false);

  function handleReserve(book) {
    setSelectedBook(book);
    setReservationVisible(true);
  }

  function handleCloseReservation() {
    setReservationVisible(false);
    setSelectedBook(null);
  }

  function handleReservationConfirmed() {
    setReservationVisible(false);
    setSelectedBook(null);
  }

  const listTemplate = (items) => (
    <div className="catalogo-grid">
      {items.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onReserve={handleReserve}
        />
      ))}
    </div>
  );

  return (
    <section className="catalogo">
      <div className="catalogo-header">
        <h1>Catálogo de Livros</h1>
        <p>Encontre algo novo para ler</p>
      </div>

      <div className="catalogo-content">
        {loading && (
          <div className="catalogo-status">
            <ProgressSpinner
              style={{
                width: "40px",
                height: "40px",
              }}
              strokeWidth="4"
            />

            <p>Buscando livros...</p>
          </div>
        )}

        {error && !loading && (
          <Message
            severity="error"
            text="Não foi possível buscar os livros agora. Tente novamente."
          />
        )}

        {!loading &&
          !error &&
          searched &&
          books.length === 0 && (
            <Message
              severity="warn"
              text={`Nenhum livro encontrado para "${query}".`}
            />
          )}

        {!loading &&
          !error &&
          books.length > 0 && (
            <>
              <DataView
                value={books}
                listTemplate={listTemplate}
              />

              <div className="catalogo-pagination">
                <Button
                  label="Anterior"
                  icon="pi pi-chevron-left"
                  onClick={onPrev}
                  disabled={!prevUrl}
                  outlined
                />

                <span className="catalogo-page-label">
                  Página {page}
                </span>

                <Button
                  label="Próxima"
                  icon="pi pi-chevron-right"
                  iconPos="right"
                  onClick={onNext}
                  disabled={!nextUrl}
                  outlined
                />
              </div>
            </>
          )}

        {!loading &&
          !error &&
          !searched && (
            <div className="catalogo-status">
              <p>Use a busca acima para encontrar livros.</p>
            </div>
          )}
      </div>

      <ReservationDialog
        visible={reservationVisible}
        book={selectedBook}
        onHide={handleCloseReservation}
        onReservationConfirmed={handleReservationConfirmed}
      />
    </section>
  );
}

export default Catalogo;

