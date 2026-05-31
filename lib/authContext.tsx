import { DocumentFileType } from "./types"
import { User } from "./types"

const AuthContext = React.createContext<{
  isLoggedIn: boolean
  user: User | null
  documentTypes: Array<DocumentFileType>
  lawDomains: Array<DocumentFileType>
  jurisdictions: Array<DocumentFileType>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => void
  setJurisdictions: (jurisdictions: Array<DocumentFileType>) => void
  setLawDomains: (lawDomains: Array<DocumentFileType>) => void
  setDocumentTypes: (documentTypes: Array<DocumentFileType>) => void
  toggleAuth: () => void
  setIsLoggedIn: (value: boolean) => void
  logout: () => void
  loading: boolean
  documentId: number
  setDocumentId: (id: number) => void
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
  documentTypes: [],
  lawDomains: [],
  jurisdictions: [],
  setJurisdictions: () => {},
  setLawDomains: () => {},
  setDocumentTypes: () => {},
  documentId: 0,
  setDocumentId: () => {},
})
export const useAuth = () => React.useContext(AuthContext)
import React from "react"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)
  const [lawDomains, setLawDomains] = React.useState<Array<DocumentFileType>>(
    []
  )
  const [jurisdictions, setJurisdictions] = React.useState<
    Array<DocumentFileType>
  >([])
  const [documentTypes, setDocumentTypes] = React.useState<
    Array<DocumentFileType>
  >([])
  const [documentId, setDocumentId] = React.useState(0)

  const toggleAuth = () => setIsLoggedIn(!isLoggedIn)
  const logout = () => setIsLoggedIn(false)

  return (
    <AuthContext.Provider
      value={{
        documentId,
        setDocumentId,
        isLoggedIn,
        user,
        toggleAuth,
        setIsLoggedIn,
        logout,
        setUser,
        loading,
        setLoading,
        documentTypes,
        lawDomains,
        jurisdictions,
        setJurisdictions,
        setLawDomains,
        setDocumentTypes,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
