import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Check localStorage for saved user
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('smarthome_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (email, password) => {
    // Get registered users
    const users = JSON.parse(localStorage.getItem('smarthome_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { error: 'Invalid email or password' }
    const userData = { name: found.name, email: found.email }
    localStorage.setItem('smarthome_user', JSON.stringify(userData))
    setUser(userData)
    return { success: true }
  }

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('smarthome_users') || '[]')
    if (users.find(u => u.email === email)) return { error: 'Email already registered' }
    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('smarthome_users', JSON.stringify(users))
    const userData = { name, email }
    localStorage.setItem('smarthome_user', JSON.stringify(userData))
    setUser(userData)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('smarthome_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
