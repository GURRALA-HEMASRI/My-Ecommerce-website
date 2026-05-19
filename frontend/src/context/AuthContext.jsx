import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../data/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user')
      const savedToken = localStorage.getItem('token')

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const response = await api.login(email, password)

    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))

    setUser(response.user)

    return response.user
  }

  const register = async (name, email, password) => {
    const response = await api.register(name, email, password)

    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))

    setUser(response.user)

    return response.user
  }

  const logout = async () => {
    try {
      await api.logout()
    } catch (error) {
      console.error(error)
    }

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}