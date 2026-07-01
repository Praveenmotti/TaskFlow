import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tf_user')
    return saved ? JSON.parse(saved) : null
  })

  const register = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: normalizedEmail, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Registration failed')
    setUser(data)
    localStorage.setItem('tf_user', JSON.stringify(data))
    return data
  }

  const login = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    setUser(data)
    localStorage.setItem('tf_user', JSON.stringify(data))
    return data
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