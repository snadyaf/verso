import { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext'
import { Divider } from 'primereact/divider'
import { Message } from 'primereact/message'

import './Reserva.css'

function formatDate(date) {
  if (!date) return ''

  return date.toLocaleDateString('pt-BR')
}

function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function ReservationDialog({ visible, book, onHide, onReservationConfirmed }) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(addDays(new Date(), 7))

  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')
  const [signature, setSignature] = useState('')

  const [error, setError] = useState('')

  useEffect(() => {
    if (visible) {
      const today = new Date()

      setStartDate(today)
      setEndDate(addDays(today, 7))
      setPhone('')
      setCpf('')
      setSignature('')
      setError('')
    }
  }, [visible])

  function handleStartDateChange(event) {
    const date = event.value

    setStartDate(date)

    if (date) {
      setEndDate(addDays(date, 7))
    }
  }

  function handleConfirm() {
    if (!startDate) {
      setError('Informe a data de início da reserva.')
      return
    }

    if (!phone.trim()) {
      setError('Informe o telefone para contato.')
      return
    }

    if (!cpf.trim()) {
      setError('Informe o CPF.')
      return
    }

    if (!signature.trim()) {
      setError('Informe sua assinatura para aceitar o termo.')
      return
    }

    const reservations = JSON.parse(
      localStorage.getItem('reservations') || '[]'
    )

    const currentUser = JSON.parse(
      localStorage.getItem('verso_current_user') || '{}'
    )

    const reservation = {
      id: Date.now(),
      bookId: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      userId: currentUser.email || currentUser.name || 'anonymous',
      userName: currentUser.name || 'Leitor',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      phone,
      cpf,
      signature,
      status: 'Reservada',
      createdAt: new Date().toISOString()
    }

    const updatedReservations = [
      ...reservations,
      reservation
    ]

    localStorage.setItem(
      'reservations',
      JSON.stringify(updatedReservations)
    )

    onReservationConfirmed(reservation)

    onHide()
  }

  return (
    <Dialog
      header="Reservar livro"
      visible={visible}
      onHide={onHide}
      modal
      dismissableMask
      className="reservation-dialog"
      breakpoints={{
        '960px': '75vw',
        '640px': '95vw'
      }}
    >
      {book && (
        <div className="reservation-form">

          <div className="reservation-book">
            <img
              src={book.cover}
              alt={book.title}
              className="reservation-book-cover"
            />

            <div>
              <span className="reservation-label">
                Livro selecionado
              </span>

              <h3>{book.title}</h3>

              <p>{book.author}</p>
            </div>
          </div>

          <Divider />

          {error && (
            <Message
              severity="error"
              text={error}
              className="reservation-error"
            />
          )}

          <div className="reservation-fields">

            <div className="reservation-field">
              <label htmlFor="startDate">
                Data da reserva
              </label>

              <Calendar
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
                minDate={new Date()}
                dateFormat="dd/mm/yy"
                showIcon
                className="w-full"
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="endDate">
                Data final da reserva
              </label>

              <Calendar
                id="endDate"
                value={endDate}
                dateFormat="dd/mm/yy"
                disabled
                showIcon
                className="w-full"
              />

              <small>
                A reserva possui duração automática de 7 dias.
              </small>
            </div>

            <div className="reservation-field">
              <label htmlFor="phone">
                Telefone para contato
              </label>

              <InputMask
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.value)}
                mask="(99) 99999-9999"
                placeholder="(00) 00000-0000"
                className="w-full"
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="cpf">
                CPF
              </label>

              <InputMask
                id="cpf"
                value={cpf}
                onChange={(event) => setCpf(event.value)}
                mask="999.999.999-99"
                placeholder="000.000.000-00"
                className="w-full"
              />
            </div>

            <div className="reservation-field reservation-signature">
              <label htmlFor="signature">
                Assinatura do termo
              </label>

              <InputText
                id="signature"
                value={signature}
                onChange={(event) => setSignature(event.target.value)}
                placeholder="Digite seu nome completo para assinar"
                className="w-full"
              />

              <small>
                Ao assinar, você declara estar de acordo com os termos
                da reserva.
              </small>
            </div>

          </div>

          <div className="reservation-summary">
            <div>
              <span>Período da reserva</span>

              <strong>
                {formatDate(startDate)} até {formatDate(endDate)}
              </strong>
            </div>

            <i className="pi pi-calendar" />
          </div>

          <div className="reservation-actions">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              outlined
              severity="secondary"
              onClick={onHide}
            />

            <Button
              label="Confirmar reserva"
              icon="pi pi-check"
              onClick={handleConfirm}
            />
          </div>

        </div>
      )}
    </Dialog>
  )
}

export default ReservationDialog
