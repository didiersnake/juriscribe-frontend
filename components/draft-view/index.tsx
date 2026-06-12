import { useState } from "react"
import { FileText, Clock, MoreVertical, Search, Trash2 } from "lucide-react"
import { motion, AnimatePresence, Variants } from "motion/react"
import DocumentPreview from "../template-dashboard/document-preview"
import { removeDocumentFromDraft } from "@/lib/services/indexedDBService"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/authContext"
import { DocumentContentResponse } from "@/lib/types"
import React from "react"
import { formatDate } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

export default function DraftsView({
  drafts,
  setDrafts,
  locale,
}: {
  drafts: DocumentContentResponse[]
  setDrafts: React.Dispatch<React.SetStateAction<DocumentContentResponse[]>>
  locale: string
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const t = useTranslations()
  const router = useRouter()
  const { setLoading, setDocumentId, setUseDraft } = useAuth()
  const filteredDrafts = drafts.filter((d) =>
    d.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id: number) => {
    const result = await removeDocumentFromDraft(id)
    if (result !== undefined) {
      setDrafts(drafts.filter((d) => d.id !== id))
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center bg-white px-2 py-8 pb-20 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header Area */}
        <div className="mb-10 flex flex-col justify-between gap-4 px-2 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {t("drafts_page.header.title")}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {t("drafts_page.header.subtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <div className="group relative w-full min-w-[250px] sm:w-1/3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-blue-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400 focus:outline-none"
              placeholder={t("drafts_page.search.placeholder")}
            />
          </div>
        </div>

        {/* Drafts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence>
            {filteredDrafts.map((draft) => (
              <motion.div
                key={draft.id}
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9 }}
                // onClick={onOpenEditor}
                className="group flex cursor-pointer flex-col"
              >
                <div className="relative mb-3 flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5">
                  <DocumentPreview
                    htmlContent={draft.content}
                    fallbackType="guest"
                    buttonText={t("drafts_page.actions.select")}
                    onButtonClick={() => {
                      setLoading(true)
                      setDocumentId(draft.id)
                      setUseDraft(true)
                      router.push("/editor")
                    }}
                  />
                  {/* Delete Button (Visible on hover) */}
                  <div className="absolute top-2 right-2 z-30 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(draft.id)}
                      className="rounded border border-slate-200 bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:border-red-200 hover:text-red-500"
                      title={t("drafts_page.actions.delete_title")}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex items-start justify-between px-1">
                  <div className="flex flex-col gap-1 pr-2">
                    <span className="line-clamp-2 text-sm leading-tight font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                      {draft.fileName}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Clock size={12} />
                      <span>{formatDate(draft.lastOpened, locale)}</span>
                    </div>
                  </div>
                  {/* <button className="shrink-0 rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                    <MoreVertical size={16} />
                  </button> */}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredDrafts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
              <FileText
                size={48}
                className="mb-4 text-slate-300"
                strokeWidth={1}
              />
              <h3 className="text-lg font-medium text-slate-600">
                {t("drafts_page.empty_state.title")}
              </h3>
              <p className="text-sm">
                {t("drafts_page.empty_state.description")}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
