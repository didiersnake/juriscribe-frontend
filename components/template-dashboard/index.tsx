import { apiClient } from "@/lib/services/api"
import { DocumentFileType, Document, DocumentRequest } from "@/lib/types"
import {
  Plus,
  Upload,
  MoreVertical,
  FileText,
  Clock,
  ChevronDown,
  Check,
  User,
  Search,
  BookOpen,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React from "react"
import { useAuth } from "@/lib/authContext"
import { documentService } from "@/lib/services/documentService"
import UploadDrawer from "./upload-drawer"
import { useRouter } from "next/navigation"
import EdgeLoader from "../ui/edgeLoader"
import Toast from "../ui/toast"
import { useTranslations } from "next-intl"
import { getCookie } from "@/lib/utils"
import DocumentPreview from "./document-preview"
import FileScanner from "./file-scanner"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
} as const

interface TemplateDashboardProps {
  onNavigate: (route: string) => void
}

export default function TemplateDashboard({
  onNavigate,
}: TemplateDashboardProps) {
  const {
    setIsLoggedIn,
    loading,
    setLoading,
    documentTypes,
    jurisdictions,
    lawDomains,
    setDocumentId,
    selectedDocumentType,
    setSelectedDocumentType,
  } = useAuth()

  const [edgeLoaderOpen, setEdgeLoaderOpen] = React.useState(true)
  const [toastOpen, setToastOpen] = React.useState(false)
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = React.useState(false)
  const [fileScannerOpen, setFileScannerOpen] = React.useState(false)

  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<File>()

  const [loadedDocuments, setLoadedDocuments] = React.useState<Document[]>([])
  const [toastType, setToastType] = React.useState("")
  const [toastMessage, setToastMessage] = React.useState("")
  // Create a ref for the hidden input
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [locale, setLocale] = React.useState("fr")

  const recentTemplates = [
    {
      title: "Employment Agreement (Executive)",
      date: "Opened Oct 24",
      owner: "Me",
    },
    { title: "Standard Mutual NDA", date: "Opened Oct 22", owner: "Me" },
    {
      title: "Seed Round Term Sheet",
      date: "Opened Sep 14",
      owner: "Partner",
    },
    { title: "Client Retainer Contract", date: "Opened Sep 02", owner: "Me" },
  ]

  const router = useRouter()
  const t = useTranslations("TemplateDashboard")
  const displayToast = (type: string, message: string) => {
    setToastType(type)
    setToastMessage(message)
    setToastOpen(true)
  }

  // Trigger file input click
  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const saveUploadedFile = async (
    selectedFile: File,
    documentTypeId?: number,
    lawDomainId?: number,
    jurisdictionId?: number
  ) => {
    if (!selectedFile) {
      console.error("No file selected")
      return
    }

    const document: DocumentRequest = {
      file: selectedFile,
      documentTypeId: documentTypeId || 0,
      lawDomainId: lawDomainId || 0,
      jurisdictionId: jurisdictionId || 0,
    }

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("documentTypeId", document.documentTypeId.toString())
    formData.append("lawDomainId", document.lawDomainId.toString())
    formData.append("jurisdictionId", document.jurisdictionId.toString())

    try {
      const response = await documentService.create(formData)
      if (response) {
        console.log("Document created:", response)
        await reloadDocuments(document.documentTypeId)
        setEdgeLoaderOpen(false)
        // setFileScannerOpen(false)

        displayToast("success", "Document created successfully")
      }
    } catch (error) {
      console.error("Error creating document:", error)
      // Handle the error here, e.g., display an error toast
      setEdgeLoaderOpen(false)
      // setFileScannerOpen(false)
      displayToast("error", "An error occurred while creating the document")
    }
  }

  const reloadDocuments = async (id: number) => {
    if (selectedDocumentType.id !== id) {
      return
    }
    await fetchDocmumentsByType(id)
  }

  // Handle file selection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      console.log("File selected:", selectedFile)
      setSelectedFile(selectedFile)
      setIsUploadDrawerOpen(true)
    }
  }

  const fetchDocmumentsByType = async (id: number) => {
    const response = await apiClient.get<Document[]>(
      "/api/documents/type/" + id
    )
    setLoadedDocuments(response)
    setEdgeLoaderOpen(false)
    console.log(" Loaded documents", response)
    return response
  }

  React.useEffect(() => {
    getCookie("locale").then((cookieLocale) => {
      if (cookieLocale) {
        setLocale(cookieLocale)
      }
    })
  }, [locale])

  React.useEffect(() => {
    // Fetch documents for the selected document type
    if (selectedDocumentType && selectedDocumentType.id) {
      fetchDocmumentsByType(selectedDocumentType.id)
        .then((documents) => {})
        .catch((error) => {
          console.error(
            "Failed to fetch documents for type :" + selectedDocumentType.id,
            error
          )
          setIsLoggedIn(false)
        })
    }
  }, [selectedDocumentType])

  const searchBar = (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8 px-2"
    >
      <div className="group relative max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500" />
        </div>
        <input
          type="text"
          className="block w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:shadow-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
          placeholder={t("placeholder")}
        />
      </div>
    </motion.div>
  )

  const newDocument = (
    <section className="bg-slate-100/50 px-4 pt-8 pb-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-base font-medium text-slate-700">
            {t("new_document_section.heading")}
          </h2>
          <button className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
            {t("new_document_section.template_gallery_btn")}
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-4 sm:gap-6"
        >
          {/* Blank Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group flex w-32 cursor-pointer flex-col gap-2 sm:w-40"
            onClick={() => onNavigate("/editor")}
          >
            <div className="flex aspect-[3/4] items-center justify-center rounded border border-slate-200 bg-white transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <Plus
                size={48}
                className="text-red-500 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.5}
              />
            </div>
            <span className="text-center text-sm font-medium text-slate-800 transition-colors group-hover:text-blue-600">
              {t("new_document_section.blank_template_label")}
            </span>
          </motion.div>

          {/* Upload Button */}
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".docx"
              style={{ display: "none" }}
            />
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group flex w-32 cursor-pointer flex-col gap-2 sm:w-40"
              onClick={handleUpload}
            >
              <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded border border-slate-200 bg-white transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Upload size={24} />
                </div>
                <span className="px-4 text-center text-xs font-medium text-slate-500">
                  {t("new_document_section.upload_file_subtext")}
                  <br />
                  (.docx)
                </span>
              </div>
              <span className="text-center text-sm font-medium text-slate-800 transition-colors group-hover:text-blue-600">
                {t("new_document_section.upload_template_label")}
              </span>
            </motion.div>
          </>
        </motion.div>
      </div>
    </section>
  )

  const recentTemplatesSection = (
    <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      {searchBar}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex items-center justify-between px-2"
      >
        <h2 className="text-base font-medium text-slate-800">
          {t("recent_templates_section.heading")}
        </h2>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <div className="relative z-20">
            {loading ? (
              <></>
            ) : (
              <button
                onClick={() => {
                  setIsOwnerDropdownOpen(!isOwnerDropdownOpen)
                }}
                className="group hidden cursor-pointer items-center gap-1 transition-colors hover:text-slate-900 sm:flex"
              >
                {locale === "fr"
                  ? selectedDocumentType?.frName
                  : selectedDocumentType?.enName}
                <ChevronDown
                  size={14}
                  className={`mt-0.5 transition-transform duration-200 ${isOwnerDropdownOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                />
              </button>
            )}

            <AnimatePresence>
              {isOwnerDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOwnerDropdownOpen(false)}
                  ></div>
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 z-50 mt-2 w-48 origin-top-right rounded-lg border border-slate-200 bg-white py-1.5 whitespace-nowrap shadow-lg"
                  >
                    {documentTypes.map((option) => (
                      <button
                        key={option?.id}
                        onClick={() => {
                          setSelectedDocumentType(option)
                          setIsOwnerDropdownOpen(false)
                          setEdgeLoaderOpen(true)
                        }}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
                      >
                        {locale === "fr" ? option?.frName : option?.enName}
                        {selectedDocumentType?.id === option?.id && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <span className="hidden text-slate-300 sm:inline">|</span>
          <button className="flex cursor-pointer items-center gap-2 rounded p-1.5 transition-colors hover:bg-slate-100">
            <Clock size={16} />
            {t("recent_templates_section.last_opened_btn")}
          </button>
        </div>
      </motion.div>

      {/* Grid View for User Templates */}

      {edgeLoaderOpen ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {recentTemplates.map((file, i) => (
            <motion.div
              variants={itemVariants}
              key={i}
              className="group flex cursor-pointer flex-col"
            >
              <div className="relative mb-3 flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5">
                {/* Simulated document lines */}
                <div className="mt-2 space-y-3">
                  <div className="h-2.5 w-2/3 rounded bg-slate-200 transition-colors duration-300 group-hover:bg-blue-100"></div>
                  <div className="space-y-1.5 pt-2">
                    <div className="h-1.5 w-full rounded bg-slate-100"></div>
                    <div className="h-1.5 w-5/6 rounded bg-slate-100"></div>
                    <div className="h-1.5 w-full rounded bg-slate-100"></div>
                    <div className="h-1.5 w-4/5 rounded bg-slate-100"></div>
                  </div>
                </div>

                {/* Bottom decorative logo/icon */}
                <div className="absolute -right-4 -bottom-4 opacity-10 transition-all duration-500 group-hover:rotate-12 group-hover:text-blue-600 group-hover:opacity-20">
                  <FileText size={100} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 items-start gap-4 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {loadedDocuments.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group flex cursor-pointer flex-col"
            >
              <div className="relative mb-4 flex h-[280px] flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-900/5 hover:border-blue-400">
                <DocumentPreview
                  htmlContent={item.htmlContent}
                  fallbackType="guest"
                  buttonText={t("recent_templates_section.use_template_btn")}
                  onButtonClick={() => {
                    setLoading(true)
                    setDocumentId(item.id)
                    router.push("/editor")
                  }}
                />
              </div>
              <h4 className="line-clamp-1 font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                {item.fileName.split(".")[0]}
              </h4>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <BookOpen size={14} />{" "}
                {locale === "fr"
                  ? item?.jurisdiction?.frName
                  : item?.jurisdiction?.enName}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col overflow-x-hidden bg-white pb-20">
      {newDocument}
      {recentTemplatesSection}
      <UploadDrawer
        documentTypeList={documentTypes}
        lawDomainList={lawDomains}
        jurisdictionList={jurisdictions}
        locale={locale}
        isOpen={isUploadDrawerOpen}
        onClose={() => setIsUploadDrawerOpen(false)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit={async (data: any) => {
          // console.log("upload config ", data)
          const { docType, jurisdiction, lawDomain } = data

          if (
            !docType ||
            !jurisdiction ||
            !lawDomain ||
            docType === 0 ||
            jurisdiction === 0 ||
            lawDomain === 0
          ) {
            displayToast("error", `${t("select_category")}`)
            return
          }

          if (selectedFile && data) {
            setEdgeLoaderOpen(true)
            setIsUploadDrawerOpen(false)
            setFileScannerOpen(true)
            setTimeout(async () => {
              await saveUploadedFile(
                selectedFile,
                docType,
                lawDomain,
                jurisdiction
              )
            }, 3000)
          }
        }}
      />
      <EdgeLoader isLoading={edgeLoaderOpen} />
      <Toast
        isOpen={toastOpen}
        type={toastType as "success" | "error"}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
      {/* <FileScanner isScanning={fileScannerOpen} onComplete={() => {}} /> */}
    </div>
  )
}
