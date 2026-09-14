import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const { currentUser, isAuthenticated, logout } = useAuth()

  const items = [
    {
      label: 'Início',
      command: () => navigate('/'),
    },
    {
      label: 'Explorar',
      command: () => navigate('/catalogo'),
    },
    {
      label: 'Minha Biblioteca',
      command: () => navigate('/biblioteca'),
    },
  ]

  const start = (
    <Link to="/" className="navbar-logo">
      <span className="logo-icon">V</span>
      <span className="logo-text">VERSO</span>
    </Link>
  )

  function handleLogout() {
    logout()
    navigate('/')
  }

  const end = (
    <div className="navbar-actions">
   
      <Button
        icon="pi pi-sun"
        className="navbar-icon-button"
        text
        aria-label="Alternar tema"
      />

      {isAuthenticated ? (
        <>
          <Link to="/perfil" className="navbar-account">
            <Avatar
              label={currentUser?.name?.charAt(0).toUpperCase() || 'U'}
              shape="circle"
              className="navbar-avatar"
            />

            <span>Minha conta</span>
          </Link>

          <Button
            label="Sair"
            icon="pi pi-sign-out"
            text
            onClick={handleLogout}
            className="navbar-logout"
          />
        </>
      ) : (
        <Link to="/login" className="navbar-login">
          Entrar
        </Link>
      )}
    </div>
  )

  return (
    <Menubar
      model={items}
      start={start}
      end={end}
      className="navbar"
    />
  )
}