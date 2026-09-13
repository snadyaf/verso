import { useState } from "react";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./BookCard.css";

function BookCard({ book }) {
  const [showDetails, setShowDetails] = useState(false);

  const cover = book.formats?.["image/jpeg"];
  const authors = book.authors?.map((a) => a.name).join(", ") || "Autor desconhecido";
  const tags = book.subjects?.slice(0, 3) || [];

  const description = book.summaries?.[0] || "Sem descrição disponível para este livro.";
  const categories = book.subjects?.length > 0 ? book.subjects : ["Sem categoria"];

  const pdfUrl = Object.entries(book.formats || {}).find(([type]) => type.includes("pdf"))?.[1];
  const epubUrl = Object.entries(book.formats || {}).find(([type]) => type.includes("epub"))?.[1];
  const readUrl = book.formats?.["text/html"];

  return (
    <>
      <div className="bookcard">
        <div className="bookcard-cover">
          {cover ? (
            <img src={cover} alt={book.title} />
          ) : (
            <div className="bookcard-no-cover">Sem capa</div>
          )}
        </div>

        <div className="bookcard-body">
          <h3 className="bookcard-title">{book.title}</h3>
          <p className="bookcard-author">{authors}</p>

          {tags.length > 0 && (
            <div className="bookcard-tags">
              {tags.map((tag, i) => (
                <Tag key={i} value={tag} />
              ))}
            </div>
          )}

          <Button
            label="Detalhes"
            className="bookcard-button"
            outlined
            onClick={() => setShowDetails(true)}
          />
        </div>
      </div>

      <Dialog
        header={book.title}
        visible={showDetails}
        onHide={() => setShowDetails(false)}
        className="bookcard-dialog"
        style={{ width: "560px" }}
      >
        <div className="bookcard-dialog-content">
          {cover ? (
            <img src={cover} alt={book.title} className="bookcard-dialog-cover" />
          ) : (
            <div className="bookcard-no-cover bookcard-dialog-no-cover">Sem capa</div>
          )}

          <div className="bookcard-dialog-info">
            <p><strong>Autor(es):</strong> {authors}</p>

            <p className="bookcard-dialog-description">{description}</p>

            <p><strong>Categorias:</strong></p>
            <div className="bookcard-dialog-tags">
              {categories.slice(0, 6).map((cat, i) => (
                <Tag key={i} value={cat} />
              ))}
            </div>

            <div className="bookcard-dialog-formats">
              <Tag
                value={pdfUrl ? "PDF disponível" : "PDF indisponível"}
                severity={pdfUrl ? "success" : "danger"}
              />
              <Tag
                value={epubUrl ? "EPUB disponível" : "EPUB indisponível"}
                severity={epubUrl ? "success" : "danger"}
              />
            </div>

            <div className="bookcard-dialog-links">
              {readUrl && (
                <Button
                  label="Ler online"
                  icon="pi pi-book"
                  onClick={() => window.open(readUrl, "_blank")}
                />
              )}
              {epubUrl && (
                <Button
                  label="Baixar EPUB"
                  icon="pi pi-download"
                  outlined
                  onClick={() => window.open(epubUrl, "_blank")}
                />
              )}
              {pdfUrl && (
                <Button
                  label="Baixar PDF"
                  icon="pi pi-download"
                  outlined
                  onClick={() => window.open(pdfUrl, "_blank")}
                />
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default BookCard;