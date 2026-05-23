const AuthContext = React.createContext<{
  isLoggedIn: boolean
  user: User | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => void
  toggleAuth: () => void
  setIsLoggedIn: (value: boolean) => void
  logout: () => void
  loading: boolean
  setLoading: (value: boolean) => void
}>({
  isLoggedIn: false,
  user: null,
  toggleAuth: () => {},
  setIsLoggedIn: () => {},
  logout: () => {},
  setUser: () => {},
  loading: false,
  setLoading: () => {},
})
export const useAuth = () => React.useContext(AuthContext)
import React from "react"
import { User } from "./types"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)

  const toggleAuth = () => setIsLoggedIn(!isLoggedIn)
  const logout = () => setIsLoggedIn(false)

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        toggleAuth,
        setIsLoggedIn,
        logout,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
