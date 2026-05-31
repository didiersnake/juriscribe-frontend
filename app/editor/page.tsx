"use client"

import TextEditor from "@/components/text-editor"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import React from "react"
import { useAuth } from "../../lib/authContext"
import { documentService } from "../../lib/services/documentService"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function EditorPage() {
  const { documentId, loading, setLoading } = useAuth()
  const [content, setContent] = React.useState<string>("Hello World!!!")
  const [name, setName] = React.useState<string>("Untitled Document")
  const router = useRouter()
  const onBack = () => {
    router.push("/documents")
  }

  React.useEffect(() => {
    if (documentId !== 0) {
      documentService
        .getById(documentId)
        .then((response) => {
          if (response) {
            // console.log("Loaded document content:", response)
            setContent(response?.content)
            setName(response?.fileName)
            // editor?.commands.setContent(response)
          }
        })
        .catch((error) => {
          console.error("Error loading document content:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [documentId])

  return loading ? (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
    </div>
  ) : (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto bg-slate-100 py-5"
    >
      <motion.div variants={itemVariants}>
        <TextEditor onBack={onBack} content={content} name={name} />
      </motion.div>
    </motion.div>
  )
}
