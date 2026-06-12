"use client"
import React from "react"
import DraftsView from "@/components/draft-view"
import { getAllUserDocumentsFromDraft } from "@/lib/services/indexedDBService"
import { useAuth } from "@/lib/authContext"
import { DocumentContentResponse } from "@/lib/types"
import { getCookie } from "@/lib/utils"

export default function DraftPage() {
  const { user, loading, setLoading, changeLocale } = useAuth()
  const [drafts, setDrafts] = React.useState([] as DocumentContentResponse[])
  const [locale, setLocale] = React.useState("fr")

  const setLoad = () => setLoading(true)
  React.useEffect(() => {
    setLoad()
    getAllUserDocumentsFromDraft(user?.id as number)
      .then((documents) => {
        console.log("Documents:", documents)
        setDrafts(documents)
        setLoading(false)
      })
      .catch((error) => console.error("Error loading document content:", error))
  }, [])

  React.useEffect(() => {
    getCookie("locale").then((cookieLocale) => {
      if (cookieLocale) {
        setLocale(cookieLocale)
      }
    })
  }, [locale])

  return loading ? (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
    </div>
  ) : (
    <div>
      <DraftsView drafts={drafts} setDrafts={setDrafts} locale={locale} />
    </div>
  )
}
