
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

import BookCard from "../BookCard/BookCard";

import "./Hero.css";

export default function Hero({
  query,
  onQueryChange,
  onSearch,
  books,
  loading,
  error,
  searched,
  page,
  nextUrl,
  prevUrl,
  onNext,
  onPrev,
  onReserve,
}) {
  const listTemplate = (items) => (
    <div className="hero-results-grid">
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
    <section className="hero">
      <div className="hero-top">
        <div className="hero-content">
          <div className="hero-label">
            <span></span>
            <p>PLATAFORMA LITERÁRIA</p>
          </div>

          <h1>
            Seu próximo mundo
            <br />
            <span>começa em uma página.</span>
          </h1>

          <p className="hero-description">
            Descubra histórias, encontre novos autores e
            transforme alguns minutos do seu dia em uma nova
            viagem.
          </p>

          <form
            className="hero-search"
            onSubmit={onSearch}
          >
            <InputText
              placeholder="Buscar livros, autores..."
              value={query}
              onChange={(event) =>
                onQueryChange(event.target.value)
              }
            />

            <Button
              label="Buscar"
              type="submit"
            />
          </form>

          <div className="hero-buttons">
            <Button
              label="Explorar livros"
              className="btn-explorar"
            />

            <Button
              label="Minha biblioteca"
              className="btn-biblioteca"
            />
          </div>

          <div className="hero-info">
            <div>
              <strong>12+</strong>
              <small>Obras</small>
            </div>

            <div>
              <strong>PDF & EPUB</strong>
              <small>Formatos digitais</small>
            </div>

            <div>
              <strong>Reserva</strong>
              <small>Física disponível</small>
            </div>
          </div>
        </div>

        <div className="hero-visual"></div>
      </div>

      {searched && (
        <div className="hero-results">
          {loading && (
            <div className="hero-results-status">
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

                <div className="hero-pagination">
                  <Button
                    label="Anterior"
                    icon="pi pi-chevron-left"
                    onClick={onPrev}
                    disabled={!prevUrl}
                    outlined
                  />

                  <span className="hero-page-label">
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
      )}
    </section>
  );
}