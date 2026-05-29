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
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React from "react"
import { useAuth } from "@/lib/authContext"
import { documentService } from "@/lib/services/documentService"
import UploadDrawer from "./upload-drawer"
import { useRouter } from "next/navigation"

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
  } = useAuth()

  const [documentType, setDocumentType] = React.useState<DocumentFileType>(
    documentTypes[0] || { id: 0, name: "", description: "", createdAt: "" }
  )
  const [docTypeLoading, setDocTypeLoading] = React.useState(true)

  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = React.useState(false)
  const [documentTypeList, setDocumentTypeList] = React.useState<
    Array<DocumentFileType>
  >(documentTypes || [])
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<File>()

  const [loadedDocuments, setLoadedDocuments] = React.useState<Document[]>([])

  // Create a ref for the hidden input
  const fileInputRef = React.useRef<HTMLInputElement>(null)

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

    console.log("Document request:", document)
    const response = await documentService.create(formData)
    console.log("Document created:", response)
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

  React.useEffect(() => {
    if (documentType?.id !== 0) {
      const documentTypeId = Number(documentType?.id)
      apiClient
        .get<Document[]>("/api/documents/type/" + documentTypeId)
        .then((documents) => {
          setLoadedDocuments(documents)
          setDocTypeLoading(false)
          console.log(" Loaded documents", documents)
        })
        .catch((error) => {
          console.error(
            "Failed to fetch documents for type :" + documentTypeId,
            error
          )
          setIsLoggedIn(false)
        })
    }
  }, [documentType])

  React.useEffect(() => {
    // Fetch document types from the backend API
    if (documentTypes.length === 0) {
      apiClient
        .get<DocumentFileType[]>("/api/document-types")
        .then((documentTypes) => {
          console.log("Fetched document types:", documentTypes)
          setDocumentTypeList(documentTypes)
          setDocumentType(documentTypes[0])
          setLoading(false)
        })
        .catch((error) => {
          console.error("Failed to fetch document types:", error)
          setIsLoggedIn(false)
          onNavigate("/")
        })
    }
  }, [])

  const router = useRouter()
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

  const newDocument = (
    <section className="bg-slate-100/50 px-4 pt-8 pb-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-base font-medium text-slate-700">
            Start a new document
          </h2>
          <button className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
            Template Gallery
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
              Blank
            </span>
          </motion.div>

          {/* Upload Button */}
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".docx,.pdf"
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
                  Upload File
                  <br />
                  (.docx, .pdf)
                </span>
              </div>
              <span className="text-center text-sm font-medium text-slate-800 transition-colors group-hover:text-blue-600">
                Upload Template
              </span>
            </motion.div>
          </>
        </motion.div>
      </div>
    </section>
  )

  const recentTemplatesSection = (
    <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex items-center justify-between px-2"
      >
        <h2 className="text-base font-medium text-slate-800">Your Templates</h2>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <div className="relative z-20">
            {loading ? (
              <></>
            ) : (
              <button
                onClick={() => setIsOwnerDropdownOpen(!isOwnerDropdownOpen)}
                className="group hidden cursor-pointer items-center gap-1 transition-colors hover:text-slate-900 sm:flex"
              >
                {documentType?.name}
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
                    {documentTypeList.map((option) => (
                      <button
                        key={option?.id}
                        onClick={() => {
                          setDocumentType(option)
                          setIsOwnerDropdownOpen(false)
                          setDocTypeLoading(true)
                        }}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
                      >
                        {option?.name}
                        {documentType.name === option?.name && (
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
            <Clock size={16} /> Last opened
          </button>
        </div>
      </motion.div>

      {/* Grid View for User Templates */}

      {docTypeLoading ? (
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

              {/* <div className="flex items-start justify-between px-1">
                <div className="flex items-start gap-2 overflow-hidden">
                  <FileText
                    size={16}
                    className="mt-0.5 shrink-0 text-blue-500 transition-colors group-hover:text-blue-600"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-sm font-medium text-slate-800 transition-colors group-hover:text-blue-600">
                      {file.title}
                    </span>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      {file.owner === "Me" ? (
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-bold text-white">
                          D
                        </div>
                      ) : (
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[8px] font-bold text-white">
                          P
                        </div>
                      )}
                      <span className="truncate text-xs text-slate-500">
                        {file.date}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="shrink-0 rounded-full p-1 text-slate-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-slate-200">
                  <MoreVertical size={16} />
                </button>
              </div> */}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative grid grid-cols-2 gap-6 px-2"
        >
          {loadedDocuments.map((file, i) => (
            <motion.div
              variants={itemVariants}
              key={i}
              className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 transition-all duration-300 hover:border-blue-300 hover:shadow-xl sm:p-1 md:flex-row"
            >
              {/* Large Document Preview */}
              <div
                // onClick={onOpenEditor}
                className="relative flex aspect-[1/1.4] w-full shrink-0 cursor-pointer flex-col gap-3 overflow-hidden rounded-lg border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm transition-all group-hover:border-blue-400 sm:p-6 md:w-56"
              >
                {/* Simulated docx content styling */}
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-white shadow-sm">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div className="mb-2 h-3 w-3/4 rounded bg-slate-300"></div>
                <div className="h-1.5 w-full rounded bg-slate-200"></div>
                <div className="h-1.5 w-full rounded bg-slate-200"></div>
                <div className="h-1.5 w-5/6 rounded bg-slate-200"></div>
                <div className="mt-3 h-1.5 w-full rounded bg-slate-200"></div>
                <div className="h-1.5 w-full rounded bg-slate-200"></div>
                <div className="h-1.5 w-4/6 rounded bg-slate-200"></div>

                {/* Overlay Action */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Open Document
                  </span>
                </div>
              </div>

              {/* Info section next to preview */}
              <div className="mt-4 flex flex-1 flex-col justify-center">
                <div className="mb-2 flex items-start justify-between">
                  <h3
                    className="cursor-pointer text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-600"
                    // onClick={onOpenEditor}
                  >
                    {file.fileName}
                  </h3>
                  <button className="shrink-0 rounded-full p-1 text-slate-400 transition-all hover:bg-slate-100">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className="mb-4 flex flex-col items-start gap-4 text-sm text-slate-500 sm:mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    Opened{" "}
                    {file.last_opened
                      ? new Date(file?.last_opened).toDateString()
                      : new Date(file.createdAt).toDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                      <User size={12} />
                    </div>
                    Me
                  </span>
                </div>
                <div className="mt-auto mb-3.5">
                  <button
                    onClick={() => router.push("/editor")}
                    className="w-max rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
                  >
                    Use Template
                  </button>
                </div>
              </div>
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
        documentTypeList={documentTypeList}
        lawDomainList={lawDomains}
        jurisdictionList={jurisdictions}
        isOpen={isUploadDrawerOpen}
        onClose={() => setIsUploadDrawerOpen(false)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit={async (data: any) => {
          console.log("upload config ", data)

          if (selectedFile && data) {
            await saveUploadedFile(
              selectedFile,
              data?.docType,
              data?.lawDomain,
              data?.jurisdiction
            )
          }

          setIsUploadDrawerOpen(false)
        }}
      />
    </div>
  )
}
