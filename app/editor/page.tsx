"use client"

import TextEditor from "@/components/text-editor"
import { motion } from "motion/react"

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
  return (
    // <div className="mx-auto max-w-[650px] py-4">
    //   <TextEditor />
    // </div>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-[650px] py-5"
    >
      {/* <motion.div variants={itemVariants}>
        <h4 className="mb-6 text-3xl font-bold">Document Editor</h4>
      </motion.div> */}

      <motion.div variants={itemVariants}>
        <TextEditor />
      </motion.div>
    </motion.div>
  )
}
