import { useAuth } from "@/lib/authContext"
import {
  FileText,
  Shield,
  ArrowRight,
  BookOpen,
  Layers,
  Zap,
  Cloud,
  Download,
  CheckCircle2,
  Lock,
  Upload,
  Edit3,
} from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { SigninIcon } from "../ui/button"
import { useTranslations } from "next-intl"

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
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()
  const t = useTranslations("Homepage")

  const heroSection = (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center md:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
        {t("hero.badge")}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl"
      >
        {t("hero.title")}{" "}
        <span className="text-blue-600">{t("hero.titleHighlight")}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl"
      >
        {t("hero.description")}
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
            {t("hero.cta.exploreLibrary")} <ArrowRight size={20} />
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-8 py-3.5 text-lg font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-95"
          >
            {SigninIcon}
            {t("hero.cta.signIn")}
          </button>
        )}
        {isLoggedIn ? null : (
          <button className="flex items-center justify-center gap-3 rounded-lg bg-blue-50 px-8 py-3.5 text-lg font-medium text-blue-700 shadow-sm transition-all hover:bg-blue-100 active:scale-95">
            {t("hero.cta.explorePublicLibrary")} <ArrowRight size={20} />
          </button>
        )}
      </motion.div>
    </section>
  )

  const valueProps = (
    <section className="overflow-hidden border-t border-slate-100 bg-slate-50 px-6 py-20">
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
              {t("insights.googleDocs.title")}
            </h3>
            <p className="leading-relaxed text-slate-600">
              {t("insights.googleDocs.description")}
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
              {t("insights.bankPrivacy.title")}
            </h3>
            <p className="leading-relaxed text-slate-600">
              {t("insights.bankPrivacy.description")}
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
              {t("insights.customTemplates.title")}
            </h3>
            <p className="leading-relaxed text-slate-600">
              {t("insights.customTemplates.description")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  const featureSection = (
    <section
      id="features"
      className="border-t border-slate-100 bg-white px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {t("features.heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            {t("features.subheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            // {
            //   icon: Zap,
            //   title: "Smart Auto-fill",
            //   desc: "Instantly populate documents with pre-saved client data and case details.",
            // },
            {
              icon: Cloud,
              title: t("features.items.cloudSynchronization.title"),
              desc: t("features.items.cloudSynchronization.desc"),
            },
            // {
            //   icon: Lock,
            //   title: "Role-based Access",
            //   desc: "Control who can view, edit, or publish templates within your organization.",
            // },
            {
              icon: Download,
              title: t("features.items.oneClickExport.title"),
              desc: t("features.items.oneClickExport.desc"),
            },
            {
              icon: CheckCircle2,
              title: t("features.items.versionControl.title"),
              desc: t("features.items.versionControl.desc"),
            },
            {
              icon: Layers,
              title: t("features.items.editablePdfDocx.title"),
              desc: t("features.items.editablePdfDocx.desc"),
            },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:border-blue-100 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm transition-transform group-hover:scale-110">
                  <Icon size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-800">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-slate-600">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )

  const howItWorksSection = (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-900 px-6 py-24 text-white"
    >
      <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl"></div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {t("howItWorks.heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            {t("howItWorks.subheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-8">
          {[
            {
              step: "01",
              title: t(`howItWorks.steps.${0}.title`),
              desc: t(`howItWorks.steps.${0}.desc`),
              icon: Upload,
            },
            {
              step: "02",
              title: t(`howItWorks.steps.${1}.title`),
              desc: t(`howItWorks.steps.${1}.desc`),
              icon: Edit3,
            },
            {
              step: "03",
              title: t(`howItWorks.steps.${2}.title`),
              desc: t(`howItWorks.steps.${2}.desc`),
              icon: Download,
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Connector Line (visible on desktop) */}
                {i !== 2 && (
                  <div className="absolute top-12 left-[60%] hidden h-[2px] w-full bg-gradient-to-r from-blue-500/30 to-transparent md:block"></div>
                )}

                <div className="relative mb-8 h-24 w-24">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-blue-600/20 transition-colors group-hover:bg-blue-600/30"></div>
                  <div className="absolute inset-2 z-10 flex items-center justify-center rounded-full border border-slate-700 bg-slate-800 transition-colors group-hover:border-blue-500">
                    <Icon
                      size={32}
                      className="text-blue-400 transition-colors group-hover:text-blue-300"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-900 bg-blue-600 text-sm font-bold text-white shadow-sm">
                    {item.step}
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mx-auto max-w-xs leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )

  const publicTemplateList = (
    <section
      id="library"
      className="mx-auto w-full max-w-7xl bg-slate-50 px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {t("templates.title")}
          </h2>
          <p className="mt-2 text-slate-500">{t("templates.desc")}</p>
        </div>
        <button className="group hidden items-center gap-1 font-medium text-blue-600 hover:text-blue-700 sm:flex">
          {t("templates.viewAll")}{" "}
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
      {loading ? (
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col bg-white font-sans">
          {heroSection}
          {valueProps}
          {howItWorksSection}
          {featureSection}
          {publicTemplateList}
        </div>
      )}
    </>
  )
}
