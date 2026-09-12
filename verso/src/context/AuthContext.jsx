import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

function initializeDemoUser() {
  const users = JSON.parse(localStorage.getItem('verso_users')) || []

  const demoUserExists = users.some(
    (storedUser) => storedUser.email === 'demo@verso.com',
  )

  if (demoUserExists) {
    return
  }

  const demoUser = {
    id: 'demo-user',
    name: 'Leitor Demo',
    email: 'demo@verso.com',
    password: '123456',
  }

  localStorage.setItem(
    'verso_users',
    JSON.stringify([...users, demoUser]),
  )
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('verso_current_user')

    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    initializeDemoUser()
  }, [])

  function register(newUser) {
    const users = JSON.parse(localStorage.getItem('verso_users')) || []

    const emailExists = users.some(
      (storedUser) => storedUser.email === newUser.email,
    )

    if (emailExists) {
      return {
        success: false,
        message: 'Este e-mail já está cadastrado.',
      }
    }

    const userToSave = {
      id: crypto.randomUUID(),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    }

    localStorage.setItem(
      'verso_users',
      JSON.stringify([...users, userToSave]),
    )

    return {
      success: true,
      user: userToSave,
    }
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('verso_users')) || []

    const foundUser = users.find(
      (storedUser) =>
        storedUser.email.toLowerCase() === email.trim().toLowerCase() &&
        storedUser.password === password,
    )

    if (!foundUser) {
      return {
        success: false,
        message: 'E-mail ou senha inválidos.',
      }
    }

    const loggedUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    }

    localStorage.setItem(
      'verso_current_user',
      JSON.stringify(loggedUser),
    )

    setUser(loggedUser)

    return {
      success: true,
      user: loggedUser,
    }
  }

  function logout() {
    localStorage.removeItem('verso_current_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }