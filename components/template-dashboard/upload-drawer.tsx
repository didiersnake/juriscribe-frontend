/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DocumentFileType } from "@/lib/types"
import {
  X,
  FileText,
  FileOutput,
  FileSearch,
  Check,
  CloudUpload,
} from "lucide-react"
import { useTranslations } from "next-intl"

export default function UploadDialog({
  isOpen,
  onClose,
  onSubmit,
  documentTypeList,
  lawDomainList,
  jurisdictionList,
  locale,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: object) => void
  documentTypeList: Array<any>
  lawDomainList: Array<any>
  jurisdictionList: Array<any>
  locale: string
}) {
  const [docTypeId, setDocTypeId] = useState(documentTypeList[0]?.id || 0)
  const [jurisdictionId, setJurisdictionId] = useState(
    jurisdictionList[1]?.id || 0
  )
  const [lawDomainId, setLawDomainId] = useState(lawDomainList[1]?.id || 0)
  const t = useTranslations("upload_dialog")

  const handleClose = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center rounded-lg p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                  <CloudUpload size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {t("header.title")}
                  </h2>
                  <p className="hidden text-sm text-slate-500 sm:block">
                    {t("header.subtitle")}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
                {/* Topic 1 */}
                <div>
                  <div className="mb-4">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 font-mono text-xs font-bold text-blue-700">
                        1
                      </span>
                      {t("document_category.title")}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {documentTypeList.map((type) => {
                      const Icon = FileText
                      const isSelected = docTypeId === type?.id
                      return (
                        <div
                          key={type.id}
                          onClick={() => {
                            setDocTypeId(type?.id)
                          }}
                          className="group relative flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200"
                          style={{
                            borderColor: isSelected ? "#2563eb" : "#e2e8f0",
                            backgroundColor: isSelected ? "#eff6ff" : "#ffffff",
                            boxShadow: isSelected
                              ? "0 2px 8px 0 rgba(37,99,235,0.10)"
                              : undefined,
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.borderColor = "#cbd5e1"
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.backgroundColor = "#f8fafc"
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.borderColor = "#e2e8f0"
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.backgroundColor = "#ffffff"
                            }
                          }}
                        >
                          <div
                            style={{
                              color: isSelected ? "#2563eb" : "#94a3b8",
                            }}
                            className="shrink-0 transition-colors duration-200"
                          >
                            <Icon
                              size={24}
                              strokeWidth={isSelected ? 2 : 1.5}
                            />
                          </div>
                          <div className="flex-1">
                            <h4
                              className="mb-0.5 text-sm font-semibold transition-colors duration-200"
                              style={{
                                color: isSelected ? "#1e3a8a" : "#374151",
                              }}
                            >
                              {locale === "fr" ? type.frName : type.enName}
                            </h4>
                            {/* <p
                              className="text-xs leading-snug transition-colors duration-200"
                              style={{
                                color: isSelected ? "#1d4ed8" : "#6b7280",
                              }}
                            >
                              {type.description}
                            </p> */}
                          </div>
                          <div
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200"
                            style={{
                              borderColor: isSelected ? "#2563eb" : "#cbd5e1",
                              backgroundColor: isSelected
                                ? "#2563eb"
                                : "#ffffff",
                            }}
                          >
                            {isSelected && (
                              <Check
                                size={12}
                                strokeWidth={3}
                                className="text-white"
                              />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Topic 2 */}
                <div>
                  <div className="mb-4">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-100 font-mono text-xs font-bold text-indigo-700">
                        2
                      </span>
                      {t("jurisdiction.title")}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {jurisdictionList.map((mode) => {
                      const Icon = FileOutput
                      const isSelected = jurisdictionId === mode.id
                      return (
                        <div
                          key={mode.id}
                          onClick={() => {
                            setJurisdictionId(mode.id)
                          }}
                          className="group relative flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200"
                          style={{
                            borderColor: isSelected ? "#4f46e5" : "#e2e8f0",
                            backgroundColor: isSelected ? "#eef2ff" : "#ffffff",
                            boxShadow: isSelected
                              ? "0 2px 8px 0 rgba(79,70,229,0.10)"
                              : undefined,
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.borderColor = "#cbd5e1"
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.backgroundColor = "#f8fafc"
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.borderColor = "#e2e8f0"
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.backgroundColor = "#ffffff"
                            }
                          }}
                        >
                          <div
                            style={{
                              color: isSelected ? "#4f46e5" : "#94a3b8",
                            }}
                            className="shrink-0 transition-colors duration-200"
                          >
                            <Icon
                              size={24}
                              strokeWidth={isSelected ? 2 : 1.5}
                            />
                          </div>
                          <div className="flex-1">
                            <h4
                              className="mb-0.5 text-sm font-semibold transition-colors duration-200"
                              style={{
                                color: isSelected ? "#1e1b4b" : "#374151",
                              }}
                            >
                              {locale === "fr" ? mode.frName : mode.enName}
                            </h4>
                            {/* <p
                              className="text-xs leading-snug transition-colors duration-200"
                              style={{
                                color: isSelected ? "#4338ca" : "#6b7280",
                              }}
                            >
                              {mode.description}
                            </p> */}
                          </div>
                          <div
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200"
                            style={{
                              borderColor: isSelected ? "#4f46e5" : "#cbd5e1",
                              backgroundColor: isSelected
                                ? "#4f46e5"
                                : "#ffffff",
                            }}
                          >
                            {isSelected && (
                              <Check
                                size={12}
                                strokeWidth={3}
                                className="text-white"
                              />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Topic 3 */}
                <div>
                  <div className="mb-4">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 font-mono text-xs font-bold text-blue-700">
                        3
                      </span>
                      {t("law_domain.title")}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {lawDomainList.map((type) => {
                      const Icon = FileSearch
                      const isSelected = lawDomainId === type?.id
                      return (
                        <div
                          key={type.id}
                          onClick={() => {
                            setLawDomainId(type?.id)
                          }}
                          className="group relative flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200"
                          style={{
                            borderColor: isSelected ? "#2563eb" : "#e2e8f0",
                            backgroundColor: isSelected ? "#eff6ff" : "#ffffff",
                            boxShadow: isSelected
                              ? "0 2px 8px 0 rgba(37,99,235,0.10)"
                              : undefined,
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.borderColor = "#cbd5e1"
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.backgroundColor = "#f8fafc"
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.borderColor = "#e2e8f0"
                              ;(
                                e.currentTarget as HTMLDivElement
                              ).style.backgroundColor = "#ffffff"
                            }
                          }}
                        >
                          <div
                            style={{
                              color: isSelected ? "#2563eb" : "#94a3b8",
                            }}
                            className="shrink-0 transition-colors duration-200"
                          >
                            <Icon
                              size={24}
                              strokeWidth={isSelected ? 2 : 1.5}
                            />
                          </div>
                          <div className="flex-1">
                            <h4
                              className="mb-0.5 text-sm font-semibold transition-colors duration-200"
                              style={{
                                color: isSelected ? "#1e3a8a" : "#374151",
                              }}
                            >
                              {locale === "fr" ? type.frName : type.enName}
                            </h4>
                            {/* <p
                              className="text-xs leading-snug transition-colors duration-200"
                              style={{
                                color: isSelected ? "#1d4ed8" : "#6b7280",
                              }}
                            >
                              {type.description}
                            </p> */}
                          </div>
                          <div
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200"
                            style={{
                              borderColor: isSelected ? "#2563eb" : "#cbd5e1",
                              backgroundColor: isSelected
                                ? "#2563eb"
                                : "#ffffff",
                            }}
                          >
                            {isSelected && (
                              <Check
                                size={12}
                                strokeWidth={3}
                                className="text-white"
                              />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="z-20 flex w-full shrink-0 justify-center bg-slate-50 pt-2 pb-6">
              <div className="flex w-max items-center gap-3 rounded-full border border-slate-200 bg-white p-2 shadow-lg">
                <button
                  onClick={handleClose}
                  className="rounded-full px-6 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 active:scale-95"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => {
                    onSubmit({
                      docType: docTypeId,
                      jurisdiction: jurisdictionId,
                      lawDomain: lawDomainId,
                    })
                  }}
                  className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
                >
                  {t("confirm_upload")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
