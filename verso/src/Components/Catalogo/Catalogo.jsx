
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

import BookCard from "../BookCard/BookCard";

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
  onReserve,
}) {
  if (searched) {
    return null;
  }

  const listTemplate = (items) => (
    <div className="catalogo-grid">
      {items.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onReserve={onReserve}
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

            <p>Carregando catálogo...</p>
          </div>
        )}

        {error && !loading && (
          <Message
            severity="error"
            text="Não foi possível carregar o catálogo agora. Tente novamente."
          />
        )}

        {!loading &&
          !error &&
          books.length === 0 && (
            <div className="catalogo-status">
              <p>
                Nenhum livro disponível no catálogo.
              </p>
            </div>
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
      </div>
    </section>
  );
}

export default Catalogo;