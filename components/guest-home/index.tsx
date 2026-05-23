import { useAuth } from "@/lib/authContext"
import { apiClient } from "@/lib/services/api"
import { FileText, Shield, ArrowRight, BookOpen, Layers } from "lucide-react"
import { motion } from "motion/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SigninIcon } from "../ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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
export default function GuestHome({ onLogin }: { onLogin: () => void }) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   // Check if user is already logged in (e.g., by checking localStorage)

  //   if (isLoggedIn === false) {
  //     apiClient
  //       .get("/api/users/user")
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       .then((data: any) => {
  //         setUser(data)
  //         setIsLoggedIn(true)
  //       })
  //       .catch((error) => {
  //         console.error("Failed to fetch user:", error)
  //       })
  //   }
  // }, [])

  const heroSection = (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center md:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
        The new standard for legal templates
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl"
      >
        Draft legal documents with{" "}
        <span className="text-blue-600">confidence and speed</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl"
      >
        JuriScribe provides a powerful, robust template engine for legal
        professionals. Sign in to access premium templates, upload your own
        frameworks, and generate flawless PDFs in seconds.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
      >
        {isLoggedIn ? (
          <button
            onClick={() => router.push("/documents")}
            // className="flex items-center justify-center gap-3 rounded-lg bg-blue-50 px-8 py-3.5 text-lg font-medium text-blue-700 shadow-sm transition-all hover:bg-blue-100 active:scale-95"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3.5 text-lg font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200/50 active:scale-95"
          >
            Explore Template Library <ArrowRight size={20} />
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-8 py-3.5 text-lg font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-95"
          >
            {SigninIcon}
            Sign in
          </button>
        )}
        {isLoggedIn ? null : (
          <button className="rounded-lg bg-blue-600 px-8 py-3.5 text-lg font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95">
            Explore Public Library
          </button>
        )}
      </motion.div>
    </section>
  )

  const valueProps = (
    <section className="overflow-hidden border-t border-slate-200 bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          <motion.div
            variants={itemVariants}
            className="group flex flex-col items-center text-center"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:text-blue-700 group-hover:shadow-md">
              <FileText size={28} />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-800">
              Google Docs Interface
            </h3>
            <p className="leading-relaxed text-slate-600">
              Enjoy a familiar, sleek editing experience. No learning curve
              required. Format, edit, and export just like you always have.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="group flex flex-col items-center text-center"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white text-emerald-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-700 group-hover:shadow-md">
              <Shield size={28} />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-800">
              Bank-Grade Privacy
            </h3>
            <p className="leading-relaxed text-slate-600">
              Your templates and client data belong to you. We employ rigorous
              encryption protocols to keep confidential documents secure.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="group flex flex-col items-center text-center"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white text-indigo-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:text-indigo-700 group-hover:shadow-md">
              <Layers size={28} />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-800">
              Custom Templates
            </h3>
            <p className="leading-relaxed text-slate-600">
              Upload your custom boilerplate agreements. Share them across your
              organization or keep them private to your account.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  const publicTemplateList = (
    <section className="mx-auto w-full max-w-7xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Featured Public Templates
          </h2>
          <p className="mt-2 text-slate-500">
            A small sample of what is available inside JuriScribe.
          </p>
        </div>
        <button className="group hidden items-center gap-1 font-medium text-blue-600 hover:text-blue-700 sm:flex">
          View all{" "}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { title: "Standard NDA", domain: "Corporate Law" },
          { title: "Independent Contractor", domain: "Employment" },
          { title: "Commercial Lease", domain: "Real Estate" },
          { title: "Software License", domain: "Intellectual Property" },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group cursor-pointer"
          >
            <div className="relative mb-4 flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-900/5">
              <div className="mb-2 h-8 w-full rounded bg-slate-100 transition-colors group-hover:bg-blue-50"></div>
              <div className="mb-2 h-3 w-3/4 rounded bg-slate-100 transition-colors group-hover:bg-blue-50"></div>
              <div className="mb-2 h-3 w-5/6 rounded bg-slate-100"></div>
              <div className="mb-2 h-3 w-full rounded bg-slate-100"></div>
              <div className="mb-2 h-3 w-2/3 rounded bg-slate-100"></div>
              <div className="flex-1"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90"></div>
              <div className="absolute right-4 bottom-4 left-4 flex items-center justify-center rounded bg-slate-900 p-2 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Sign in to view
              </div>
            </div>
            <h4 className="line-clamp-1 font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
              {item.title}
            </h4>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <BookOpen size={14} /> {item.domain}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )

  return (
    <>
      <div className="flex min-h-screen flex-col bg-white">
        {heroSection}
        {valueProps}
        {publicTemplateList}
      </div>
    </>
  )
}
