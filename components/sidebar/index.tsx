import React from "react"
import {
  X,
  FileText,
  Scale,
  FileArchive,
  AlertCircle,
  Gavel,
  Landmark,
  Send,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 shrink-0"
                >
                  <rect
                    x="6"
                    y="4"
                    width="36"
                    height="40"
                    rx="4"
                    fill="#1E3A8A"
                  />
                  <path d="M30 4 L42 16 L42 4 Z" fill="#D97706" />
                  <path d="M24 14 L17 28 L24 38 L31 28 Z" fill="#F8FAFC" />
                  <line
                    x1="24"
                    y1="21"
                    x2="24"
                    y2="33"
                    stroke="#1E3A8A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="24" cy="18" r="1.5" fill="#1E3A8A" />
                </svg>
                <span className="text-xl font-bold tracking-tight text-slate-800">
                  JuriScribe
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="mb-2 px-4 py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                Legal Documents
              </div>
              <nav className="space-y-1">
                {/* <button
                  onClick={onClose}
                  className="group flex w-full items-center gap-3 px-6 py-3 text-left font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <FileText
                    size={20}
                    className="text-slate-400 transition-colors group-hover:text-blue-500"
                  />
                  <span>Assignation</span>
                </button> */}
                <button
                  onClick={onClose}
                  className="group flex w-full items-center gap-3 px-6 py-3 text-left font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <Scale
                    size={20}
                    className="text-slate-400 transition-colors group-hover:text-blue-500"
                  />
                  <span>Direct Citation</span>
                </button>

                <button
                  onClick={onClose}
                  className="group flex w-full items-center gap-3 px-6 py-3 text-left font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <Send
                    size={20}
                    className="text-slate-400 transition-colors group-hover:text-blue-500"
                  />
                  <span>Writ of Summons</span>
                </button>

                <div className="px-4 pt-4 pb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Complaints & Petitions
                </div>

                <button
                  onClick={onClose}
                  className="group flex w-full items-center gap-3 px-6 py-3 text-left font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <AlertCircle
                    size={20}
                    className="text-slate-400 transition-colors group-hover:text-blue-500"
                  />
                  <span>Simple Complaint</span>
                </button>
                <button
                  onClick={onClose}
                  className="group flex w-full items-center gap-3 px-6 py-3 text-left font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <Gavel
                    size={20}
                    className="text-slate-400 transition-colors group-hover:text-blue-500"
                  />
                  <span>Complaint (Civil Party)</span>
                </button>
                <button
                  onClick={onClose}
                  className="group flex w-full items-center gap-3 px-6 py-3 text-left font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <FileArchive
                    size={20}
                    className="text-slate-400 transition-colors group-hover:text-blue-500"
                  />
                  <span>Motion / Petition</span>
                </button>
                <button
                  onClick={onClose}
                  className="group flex w-full items-center gap-3 px-6 py-3 text-left font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <Landmark
                    size={20}
                    className="text-slate-400 transition-colors group-hover:text-blue-500"
                  />
                  <span>Administrative Petition</span>
                </button>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
