"use client"

import TextEditor from "@/components/text-editor"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const onBack = () => {
    router.push("/documents")
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto bg-slate-100 py-5"
    >
      <motion.div variants={itemVariants}>
        <TextEditor onBack={onBack} />
      </motion.div>
    </motion.div>
  )
}
