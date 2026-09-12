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
        style={{ width: "480px" }}
      >
        <div className="bookcard-dialog-content">
          {cover ? (
            <img src={cover} alt={book.title} className="bookcard-dialog-cover" />
          ) : (
            <div className="bookcard-no-cover bookcard-dialog-no-cover">Sem capa</div>
          )}

          <div className="bookcard-dialog-info">
            <p><strong>Autor(es):</strong> {authors}</p>
            {book.subjects?.length > 0 && (
              <p><strong>Assuntos:</strong> {book.subjects.join(", ")}</p>
            )}
            {book.download_count !== undefined && (
              <p><strong>Downloads:</strong> {book.download_count.toLocaleString()}</p>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default BookCard;