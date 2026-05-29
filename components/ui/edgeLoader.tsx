import { motion, AnimatePresence } from "motion/react"

export default function EdgeLoader({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 right-0 left-0 z-[9999] h-1.5 overflow-hidden bg-blue-600/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
        >
          <motion.div
            className="h-full rounded-r-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.7)]"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            style={{ width: "50%" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
