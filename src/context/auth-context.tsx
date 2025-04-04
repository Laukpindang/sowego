import { createContext, useContext, useEffect, useState } from 'react'

import { User } from '@/types/User'

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthProviderState = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

const initialState: AuthProviderState = {
  user: null,
  setUser: () => null,
  logout: () => null
}

const AuthProviderContext = createContext<AuthProviderState>(initialState)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user-vite')
    if (stored) {
      return setUser(JSON.parse(stored))
    }
    return setUser(null)
  }, [])

  const value = {
    user,
    setUser: (user: User) => {
      localStorage.setItem('user-vite', JSON.stringify(user))
      setUser(user)
    },
    logout: () => {
      localStorage.removeItem('user-vite')
      setUser(null)
    }
  }

  return <AuthProviderContext.Provider value={value}>{children}</AuthProviderContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext)

  if (context === undefined) throw new Error('useAuth must be used within a AuthProvider')

  return context
}
