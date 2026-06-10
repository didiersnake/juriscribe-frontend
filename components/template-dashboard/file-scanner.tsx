import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ShieldCheck,
  ShieldAlert,
  Loader2,
  File,
  CheckCircle2,
} from "lucide-react"

export default function FileScanner({
  isScanning,
  fileName = "document.docx",
  onComplete,
}: {
  isScanning: boolean
  fileName?: string
  onComplete?: (safe: boolean) => void
}) {
  const [scanStatus, setScanStatus] = useState("scanning") // 'scanning', 'safe', 'threat'
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isScanning) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScanStatus("scanning")
      setProgress(0)

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.floor(Math.random() * 10) + 5 // progress by 5-20%
        })
      }, 300)

      const timeout = setTimeout(() => {
        clearInterval(interval)
        setProgress(100)
        // default to safe for simulation
        const safe = Math.random() > 0.1 // 90% chance safe
        setScanStatus("safe")

        setTimeout(() => {
          if (onComplete) onComplete(safe)
        }, 1500)
      }, 2500)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    } else {
      setScanStatus("scanning")
      setProgress(0)
    }
  }, [isScanning, onComplete])

  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 50, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed right-6 bottom-6 z-[9999] w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
        >
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
                  {scanStatus === "scanning" && (
                    <ShieldCheck
                      size={20}
                      className="animate-pulse text-blue-500"
                    />
                  )}
                  {scanStatus === "safe" && (
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  )}
                  {scanStatus === "threat" && (
                    <ShieldAlert size={20} className="text-red-500" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    {scanStatus === "scanning" && "Scanning for malware..."}
                    {scanStatus === "safe" && "File is safe"}
                    {scanStatus === "threat" && "Threat detected!"}
                  </h4>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <File size={12} />
                    <span className="max-w-[150px] truncate">{fileName}</span>
                  </div>
                </div>
              </div>

              {scanStatus === "scanning" && (
                <Loader2 size={16} className="animate-spin text-slate-400" />
              )}
            </div>

            {/* Progress bar */}
            {scanStatus === "scanning" && (
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "linear", duration: 0.3 }}
                />
              </div>
            )}

            {scanStatus === "safe" && (
              <div className="rounded border border-emerald-100 bg-emerald-50 px-2 py-1.5 text-xs font-medium text-emerald-600">
                Secured by Juris AI Defender
              </div>
            )}

            {scanStatus === "threat" && (
              <div className="rounded border border-red-100 bg-red-50 px-2 py-1.5 text-xs font-medium text-red-600">
                Upload blocked. Malicious code detected!
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
