<<<<<<< HEAD

=======
>>>>>>> 559e999fecac457ca40e16a5137e62828d0bd244
import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
<<<<<<< HEAD

  const [user, setUser] = useState(() => {

    const saved = localStorage.getItem('smarthome_user')

    return saved ? JSON.parse(saved) : null
  })


  // ======================
  // SIGNUP
  // ======================

  const signup = async (name, email, password) => {

    try {

      const response = await fetch('http://localhost:5000/signup', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name,
          email,
          password
        })

      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.message }
      }

      localStorage.setItem(
        'smarthome_user',
        JSON.stringify(data.user)
      )

      setUser(data.user)

      return { success: true }

    } catch (err) {

      return { error: err.message }

    }

  }


  // ======================
  // LOGIN
  // ======================

  const login = async (email, password) => {

    try {

      const response = await fetch('http://localhost:5000/login', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email,
          password
        })

      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.message }
      }

      localStorage.setItem(
        'smarthome_user',
        JSON.stringify(data.user)
      )

      setUser(data.user)

      return { success: true }

    } catch (err) {

      return { error: err.message }

    }

  }


  // ======================
  // LOGOUT
  // ======================

  const logout = () => {

    localStorage.removeItem('smarthome_user')

    setUser(null)

  }


  return (

    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  )

}

export function useAuth() {

  return useContext(AuthContext)

}


=======
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
>>>>>>> 559e999fecac457ca40e16a5137e62828d0bd244
