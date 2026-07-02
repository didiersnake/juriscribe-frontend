/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Upload,
  FileText,
  ArrowRight,
  Download,
  Loader2,
  Languages,
  Globe,
} from "lucide-react"
import FileScanner from "./file-scanner"
import Toast from "../ui/toast"
import { axiosInstance } from "@/lib/services/api"
import { useTranslations } from "next-intl"

export default function TranslationView() {
  const [targetLanguage, setTargetLanguage] = useState("fr")
  const [file, setFile] = useState<File | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationComplete, setTranslationComplete] = useState(false)
  const [toast, setToast] = useState<{
    isOpen: boolean
    type?: "success" | "error"
    message: string
  }>({
    isOpen: false,
    type: "success",
    message: "",
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const languages = [
    { code: "fr", name: "French (Français)" },
    { code: "es", name: "Spanish (Español)" },
    { code: "en", name: "English (English)" },

    // { code: "de", name: "German (Deutsch)" },
    // { code: "it", name: "Italian (Italiano)" },
    // { code: "pt", name: "Portuguese (Português)" },
    // { code: "zh", name: "Chinese (中文)" },
    // { code: "ja", name: "Japanese (日本語)" },
    // { code: "ar", name: "Arabic (العربية)" },
  ]
  const t = useTranslations("DocumentTranslation")

  const handleLanguageChangeRequest = async () => {
    const formData = new FormData()
    formData.append("file", file as File)
    formData.append("targetLanguage", targetLanguage)

    const response: any = await axiosInstance.post(
      "/api/documents/translate",
      formData,
      {
        responseType: "blob", // Important for handling binary data
      }
    )
    if (response) {
      console.log("Export response:", response)
    }
    const blob = response.data
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = file?.name || "document.pdf"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileSelect = (e: any) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".docx")) {
        setToast({
          isOpen: true,
          type: "error",
          message: "Please upload a valid .docx file.",
        })
        return
      }
      setFile(selectedFile)
      setTranslationComplete(false)
    }
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      if (!droppedFile.name.endsWith(".docx")) {
        setToast({
          isOpen: true,
          type: "error",
          message: "Please upload a valid .docx file.",
        })
        return
      }
      setFile(droppedFile)
      setTranslationComplete(false)
    }
  }

  const startTranslation = () => {
    if (!file) {
      setToast({
        isOpen: true,
        type: "error",
        message: "Please upload a document first.",
      })
      return
    }
    setIsScanning(true)
  }

  const onScanComplete = (isSafe: any) => {
    setIsScanning(false)

    if (!isSafe) {
      setToast({
        isOpen: true,
        type: "error",
        message: "Upload blocked. Malicious code detected!",
      })
      setFile(null)
      return
    }

    setIsTranslating(true)
    // Simulate translation process
    setTimeout(() => {
      setIsTranslating(false)
      setTranslationComplete(true)
      setToast({
        isOpen: true,
        type: "success",
        message: "Document translated successfully!",
      })
    }, 3000)
  }

  const handleReset = () => {
    setFile(null)
    setTranslationComplete(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center bg-white px-4 py-8 pb-20 lg:px-8">
      <FileScanner
        isScanning={isScanning}
        fileName={file?.name}
        onComplete={onScanComplete}
      />
      <Toast
        isOpen={toast.isOpen}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />

      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Languages size={32} />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-800">
            {t("header.title")}
          </h1>
          <p className="mx-auto max-w-lg text-slate-500">
            {t("header.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column: Upload & Config */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                <Globe size={18} className="text-blue-500" />
                {t("config.targetLanguage")}
              </h2>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-3 text-slate-700 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                disabled={isTranslating || isScanning}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-1 flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                <FileText size={18} className="text-blue-500" />
                {t("config.uploadTitle")}
              </h2>

              {!file ? (
                <div
                  className="group flex min-h-[200px] flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 transition-all hover:border-blue-400 hover:bg-blue-50/50"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-transform group-hover:scale-110">
                    <Upload size={28} />
                  </div>
                  <p className="mb-1 text-center text-sm font-medium text-slate-700">
                    {t("config.dragDropActive")}
                  </p>
                  <p className="text-center text-xs text-slate-500">
                    {t("config.allowedFormats")}
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileSelect}
                  />
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    <FileText size={28} />
                  </div>
                  <p className="mb-1 max-w-[250px] truncate font-medium text-slate-800">
                    {file.name}
                  </p>
                  <p className="mb-6 text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  {!isTranslating && !translationComplete && (
                    <button
                      onClick={handleReset}
                      className="text-sm font-medium text-slate-500 transition-colors hover:text-red-500"
                      disabled={isScanning}
                    >
                      {t("config.removeFile")}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Status & Actions */}
          <div className="flex flex-col">
            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              {!file && !isTranslating && !translationComplete && (
                <div className="text-center opacity-60">
                  <Languages
                    size={48}
                    className="mx-auto mb-4 text-slate-400"
                  />
                  <p className="text-sm text-slate-500">
                    {t("status.emptyState")}
                  </p>
                </div>
              )}

              {file && !isTranslating && !translationComplete && (
                <div className="flex w-full flex-col items-center text-center">
                  <div className="mb-6 flex items-center justify-center gap-4 rounded-full border border-slate-100 bg-white p-4 text-slate-400 shadow-sm">
                    <FileText size={24} className="text-blue-500" />
                    <ArrowRight size={20} className="animate-pulse" />
                    <Globe size={24} className="text-blue-500" />
                  </div>
                  <button
                    onClick={startTranslation}
                    disabled={isScanning}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 font-medium text-white shadow-md shadow-blue-900/10 transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {t("status.readyToTranslate")}
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {isTranslating && (
                <div className="z-10 flex w-full flex-col items-center text-center">
                  <Loader2
                    size={48}
                    className="mx-auto mb-6 animate-spin text-blue-500"
                  />
                  <h3 className="mb-2 text-lg font-bold text-slate-800">
                    {t("status.readyToTranslate.title")}
                  </h3>
                  <p className="mx-auto max-w-[250px] text-sm text-slate-500">
                    {t("status.readyToTranslate.description")}
                  </p>

                  <div className="mt-8 h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                      className="h-full rounded-full bg-blue-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              )}

              <AnimatePresence>
                {translationComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 flex w-full flex-col items-center text-center"
                  >
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Download size={28} />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-800">
                      {t("status.complete.title")}
                    </h3>
                    {/* <p className="mb-8 text-sm text-slate-500">
                      Your document has been translated to{" "}
                      {languages.find((l) => l.code === targetLanguage)?.name}.
                    </p> */}

                    <div className="flex w-full flex-col items-center gap-3">
                      <button className="flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
                        <Download size={18} />
                        {t("status.complete.downloadDocx")}
                      </button>
                      <button className="flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
                        <Download size={18} />
                        {t("status.complete.downloadPdf")}
                      </button>
                      <button
                        onClick={handleReset}
                        className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                      >
                        {t("status.complete.translateAnother")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative backgrounds */}
              {isTranslating && (
                <div className="absolute inset-0 z-0 bg-gradient-to-tr from-blue-50/50 to-transparent"></div>
              )}
              {translationComplete && (
                <div className="absolute inset-0 z-0 bg-gradient-to-tr from-emerald-50/50 to-transparent"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
