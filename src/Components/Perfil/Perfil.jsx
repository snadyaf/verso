import { useNavigate } from 'react-router-dom'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'

import './Perfil.css'

import { useState } from 'react'
import { Dialog } from 'primereact/dialog'


function Perfil() {

  const [reservationsVisible, setReservationsVisible] = useState(false)

  const navigate = useNavigate()

  const usuario = JSON.parse(localStorage.getItem('currentUser')) || {
    name: 'Leitor',
    email: ''
  }

  const favoritos = JSON.parse(localStorage.getItem('favorites')) || []
  const queroLer = JSON.parse(localStorage.getItem('wantToRead')) || []
  const jaLi = JSON.parse(localStorage.getItem('read')) || []
  const reservas = JSON.parse(
    localStorage.getItem('reservations') || '[]'
  )


  return (
    <main className="perfil-page">
      <section className="perfil-container">

        <header className="perfil-header">
          <div className="perfil-user">
            <Avatar
              label={usuario.name?.charAt(0).toUpperCase()}
              shape="circle"
              className="perfil-avatar"
            />

            <div>
              <span className="perfil-eyebrow">
                Meu espaço
              </span>

              <h1>
                Olá, {usuario.name}
              </h1>

              <p>
                Organize suas leituras e acompanhe seus livros.
              </p>
            </div>
          </div>

          <Button
            label="Sair"
            icon="pi pi-sign-out"
            text
            className="perfil-logout"
          />
        </header>

        <section className="perfil-stats">

          <Card className="perfil-stat-card">
            <i className="pi pi-heart stat-icon" />

            <span className="stat-value">
              {favoritos.length}
            </span>

            <span className="stat-label">
              Favoritos
            </span>
          </Card>

          <Card className="perfil-stat-card">
            <i className="pi pi-book stat-icon" />

            <span className="stat-value">
              {queroLer.length}
            </span>

            <span className="stat-label">
              Quero ler
            </span>
          </Card>

          <Card className="perfil-stat-card">
            <i className="pi pi-check-circle stat-icon" />

            <span className="stat-value">
              {jaLi.length}
            </span>

            <span className="stat-label">
              Já li
            </span>
          </Card>

        </section>

        <section className="biblioteca-section">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                Sua coleção
              </span>

              <h2>
                Minha Biblioteca
              </h2>
            </div>

            <Button
              label="Ver biblioteca"
              icon="pi pi-arrow-right"
              iconPos="right"
              text
              onClick={() => navigate('/biblioteca')}
              className="section-link"
            />
          </div>

          <div className="library-tabs">

            <Button
              label={`Favoritos (${favoritos.length})`}
              icon="pi pi-heart"
              text
              className="library-tab active"
            />

            <Button
              label={`Quero ler (${queroLer.length})`}
              icon="pi pi-book"
              text
              className="library-tab"
            />

            <Button
              label={`Já li (${jaLi.length})`}
              icon="pi pi-check"
              text
              className="library-tab"
            />

          </div>

          {favoritos.length > 0 ? (
            <div className="books-grid">
              {favoritos.slice(0, 4).map((book) => (
                <Card
                  key={book.id}
                  className="book-card"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="book-cover"
                  />

                  <div className="book-info">
                    <h3>{book.title}</h3>

                    <p>{book.author}</p>

                    <Tag
                      value="Favorito"
                      className="book-tag"
                    />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="empty-library">
              <i className="pi pi-book" />

              <h3>
                Sua biblioteca ainda está vazia
              </h3>

              <p>
                Explore o catálogo e adicione livros
                aos seus favoritos.
              </p>

              <Button
                label="Explorar catálogo"
                onClick={() => navigate('/')}
                className="catalog-button"
              />
            </div>
          )}

        </section>

        <section className="reservations-card">

          <div className="reservation-icon">
            <i className="pi pi-bookmark" />
          </div>

          <div className="reservation-content">
            <span>
              Minha leitura
            </span>

            <h2>
              Minhas Reservas
            </h2>

            <p>
              Acompanhe os livros físicos que você
              reservou e consulte o status das suas reservas.
            </p>
          </div>

          <Button
            label="Ver reservas"
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={() => setReservationsVisible(true)}
            className="reservation-button"
          />


        </section>

      </section>

      <div className="section-heading">
        <div>
          <span className="section-eyebrow">
            Sua coleção
          </span>

          <h2>
            Minha Biblioteca
          </h2>
        </div>

        <div className="section-actions">
          <Button
            label="Explorar catálogo"
            icon="pi pi-compass"
            onClick={() => navigate('/')}
            className="catalog-button"
          />

          <Button
            label="Ver biblioteca"
            icon="pi pi-arrow-right"
            iconPos="right"
            text
            onClick={() => navigate('/biblioteca')}
            className="section-link"
          />
        </div>
      </div>

      <Dialog
        header="Minhas Reservas"
        visible={reservationsVisible}
        onHide={() => setReservationsVisible(false)}
        modal
        dismissableMask
        className="reservations-dialog"
        breakpoints={{
          '960px': '75vw',
          '640px': '95vw'
        }}
      >
        {reservas.length === 0 ? (
          <div className="reservations-empty">
            <i className="pi pi-bookmark" />

            <h3>
              Nenhuma reserva realizada
            </h3>

            <p>
              Explore o catálogo e reserve um livro para
              encontrá-lo aqui.
            </p>

            <Button
              label="Explorar catálogo"
              icon="pi pi-compass"
              onClick={() => {
                setReservationsVisible(false)
                navigate('/')
              }}
            />
          </div>
        ) : (
          <div className="reservations-list">

            {reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="reservation-item"
              >
                <img
                  src={reserva.cover}
                  alt={reserva.title}
                  className="reservation-item-cover"
                />

                <div className="reservation-item-content">

                  <div className="reservation-item-header">
                    <div>
                      <h3>
                        {reserva.title}
                      </h3>

                      <p>
                        {reserva.author}
                      </p>
                    </div>

                    <Tag
                      value={reserva.status}
                      severity="success"
                    />
                  </div>

                  <div className="reservation-details">

                    <div>
                      <span>
                        <i className="pi pi-calendar" />
                        Início
                      </span>

                      <strong>
                        {new Date(
                          reserva.startDate
                        ).toLocaleDateString('pt-BR')}
                      </strong>
                    </div>

                    <div>
                      <span>
                        <i className="pi pi-calendar-plus" />
                        Final
                      </span>

                      <strong>
                        {new Date(
                          reserva.endDate
                        ).toLocaleDateString('pt-BR')}
                      </strong>
                    </div>

                  </div>

                  <div className="reservation-contact">
                    <span>
                      <i className="pi pi-phone" />
                      {reserva.phone}
                    </span>

                    <span>
                      <i className="pi pi-id-card" />
                      {reserva.cpf}
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </Dialog>

    </main>
  )
}

export default Perfil