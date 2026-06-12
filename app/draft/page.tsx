"use client"
import React from "react"
import DraftsView from "@/components/draft-view"
import { getAllUserDocumentsFromDraft } from "@/lib/services/indexedDBService"
import { useAuth } from "@/lib/authContext"
import { DocumentContentResponse } from "@/lib/types"

export default function DraftPage() {
  const { user, loading, setLoading } = useAuth()
  const [drafts, setDrafts] = React.useState([] as DocumentContentResponse[])

  React.useEffect(() => {
    getAllUserDocumentsFromDraft(user?.id as number)
      .then((documents) => {
        console.log("Documents:", documents)
        setDrafts(documents)
        setLoading(false)
      })
      .catch((error) => console.error("Error loading document content:", error))
  }, [])

  return loading ? (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
    </div>
  ) : (
    <div>
      <DraftsView drafts={drafts} setDrafts={setDrafts} />
    </div>
  )
}
