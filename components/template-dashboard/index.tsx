import { Plus, Upload, MoreVertical, FileText, Clock } from "lucide-react"
import { motion } from "motion/react"

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

  const handleUpload = () => {
    alert(
      "Simulating file upload. In production, this opens a file picker to parse .docx or .pdf into the JuriScribe engine."
    )
  }

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

          {/* Sample Templates */}
          {/* {[
              { title: "Service Agreement" },
              { title: "Bylaws Framework" },
            ].map((t, i) => (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                key={i}
                className="group flex hidden w-32 cursor-pointer flex-col gap-2 sm:w-40 md:flex"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
                  <div className="mb-4 h-2 w-1/2 rounded bg-slate-200 transition-colors group-hover:bg-blue-100"></div>
                  <div className="mb-2 h-1 w-full rounded bg-slate-100"></div>
                  <div className="mb-2 h-1 w-full rounded bg-slate-100"></div>
                  <div className="mb-2 h-1 w-3/4 rounded bg-slate-100"></div>
                  <div className="mb-2 h-1 w-full rounded bg-slate-100"></div>
                  <div className="mb-2 h-1 w-5/6 rounded bg-slate-100"></div>
                </div>
                <span className="truncate px-1 text-center text-sm font-medium text-slate-800 transition-colors group-hover:text-blue-600">
                  {t.title}
                </span>
              </motion.div>
            ))} */}
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
          <span className="hidden cursor-pointer transition-colors hover:text-slate-900 sm:inline">
            Owned by Me
          </span>
          <span className="hidden text-slate-300 sm:inline">|</span>
          <span className="flex cursor-pointer items-center gap-2 rounded p-1.5 transition-colors hover:bg-slate-100">
            <Clock size={16} /> Last opened
          </span>
        </div>
      </motion.div>

      {/* Grid View for User Templates */}
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

            <div className="flex items-start justify-between px-1">
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
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col overflow-x-hidden bg-white pb-20">
      {newDocument}
      {recentTemplatesSection}
    </div>
  )
}
