import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, XCircle, X } from "lucide-react"

export default function Toast({
  isOpen,
  type = "success",
  message,
  onClose,
  duration = 3000,
}: {
  isOpen: boolean
  type?: "success" | "error"
  message: string
  onClose: () => void
  duration?: number
}) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-6 left-1/2 z-[10000] flex -translate-x-1/2 items-center shadow-lg"
        >
          <div
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
              type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <div className="flex shrink-0 items-center justify-center">
              {type === "success" ? (
                <CheckCircle2 size={20} className="text-emerald-600" />
              ) : (
                <XCircle size={20} className="text-red-600" />
              )}
            </div>
            <p className="pr-2 text-sm font-medium">{message}</p>
            <button
              onClick={onClose}
              className={`shrink-0 rounded-md p-1 transition-colors ${
                type === "success"
                  ? "text-emerald-600 hover:bg-emerald-100"
                  : "text-red-600 hover:bg-red-100"
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
