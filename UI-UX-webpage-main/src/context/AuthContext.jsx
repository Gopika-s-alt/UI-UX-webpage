
import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

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


