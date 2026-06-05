import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, X } from "lucide-react"
import { useAuth } from "@/lib/authContext"
import { useTranslations } from "next-intl"

export default function JurisAIBanner() {
  const { bannerVisible, setBannerVisible } = useAuth()

  const t = useTranslations("Banner")

  return (
    <AnimatePresence>
      {bannerVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-50 max-w-[280px] md:bottom-12"
        >
          <div className="relative rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 p-1 shadow-2xl">
            <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-md"></div>
            <div className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-indigo-500/30 bg-slate-900 p-4">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/3 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-2xl"></div>

              <button
                onClick={() => setBannerVisible(false)}
                className="absolute top-2 right-2 z-10 rounded-full p-1 text-slate-400 transition-colors hover:cursor-pointer hover:text-white"
              >
                <X size={14} />
              </button>

              <div className="mt-1 flex items-center gap-2 text-xs font-bold tracking-wider text-indigo-300 uppercase">
                <Sparkles size={14} className="text-indigo-400" />
                <span>{t("status")}</span>
              </div>

              <h3 className="mt-1 text-base leading-tight font-bold text-white">
                {t("title")}
              </h3>

              <p className="text-xs leading-relaxed text-slate-400">
                {t("description")}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
