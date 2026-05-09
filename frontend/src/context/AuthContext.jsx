import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tf_user')
    return saved ? JSON.parse(saved) : null
  })

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem('tf_users') || '[]')
    const exists = users.find(u => u.email === email)
    if (exists) throw new Error('Email already registered')
    const newUser = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() }
    localStorage.setItem('tf_users', JSON.stringify([...users, newUser]))
    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    localStorage.setItem('tf_user', JSON.stringify(safeUser))
    return safeUser
  }

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('tf_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem('tf_user', JSON.stringify(safeUser))
    return safeUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('tf_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
