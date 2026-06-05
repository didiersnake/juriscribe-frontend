/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
  Menu,
  Search,
  Settings,
  HelpCircle,
  User,
  LogOut,
  Check,
  Globe,
} from "lucide-react"
import { useAuth } from "@/lib/authContext"
import React from "react"
import { apiClient } from "@/lib/services/api"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

export default function Navbar({
  onToggleSidebar,
  locale,
  setLocale,
  onNavigate,
}: {
  onToggleSidebar: () => void
  onNavigate: (route: string) => void
  locale: string
  setLocale: (value: string) => void
}) {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    user,
    setLoading,
    loading,
    documentTypes,
    lawDomains,
    jurisdictions,
    setJurisdictions,
    setLawDomains,
    setDocumentTypes,
    changeLocale,
    setSelectedDocumentType,
  } = useAuth()

  const route = useRouter()

  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false)
  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ]
  const t = useTranslations("Navbar")

  const handleLogin = () => {
    window.location.href = "http://localhost:8888/oauth2/authorization/google"
  }

  const handleLogout = () => {
    apiClient
      .post("/logout", {})
      .then(() => {
        setIsLoggedIn(false)
        setUser(null)
        route.push("/")
      })
      .catch((error) => {
        console.error("Failed to logout:", error)
      })
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (documentTypes.length === 0) {
        // console.log("Fetching document types")
        apiClient
          .get("/api/document-types")
          .then((data: any) => {
            console.log(data)
            setDocumentTypes(data)
            setSelectedDocumentType(data[0])
          })
          .catch((error) => {
            console.error("Failed to fetch document types:", error)
          })
      }

      if (jurisdictions.length === 0) {
        console.log("Fetching jurisdictions")
        apiClient
          .get("/api/jurisdictions")
          .then((data: any) => {
            setJurisdictions(data)
          })
          .catch((error) => {
            console.error("Failed to fetch jurisdictions:", error)
          })
      }

      if (lawDomains.length === 0) {
        apiClient
          .get("/api/law-domains")
          .then((data: any) => {
            setLawDomains(data)
          })
          .catch((error) => {
            console.error("Failed to fetch law domains:", error)
          })
      }
    }
  }, [isLoggedIn])

  useEffect(() => {
    console.log("Fetching user")
    apiClient
      .get("/api/users/user")
      .then((data: any) => {
        setUser(data)
        setLoading(false)
        setIsLoggedIn(true)
      })
      .catch((error) => {
        setLoading(false)
        // if (error.response === undefined) {
        //   onNavigate("/")
        // }
        console.error("Failed to fetch user:", error)
      })
  }, [isLoggedIn])

  const leftNav = (
    <div className="relative flex shrink-0 items-center gap-2 sm:gap-4">
      {/* FIXED: Added block md:hidden to strictly control visibility on medium screens and up */}
      <button
        onClick={onToggleSidebar}
        className="block rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95 sm:p-3 md:hidden"
      >
        <Menu size={24} />
      </button>

      <div
        className="group flex cursor-pointer items-center gap-3"
        onClick={() => onNavigate("/")}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 shrink-0 transform transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
        >
          <rect x="6" y="4" width="36" height="40" rx="4" fill="#1E3A8A" />
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
        <span className="hidden text-[20px] font-bold tracking-tight text-slate-800 transition-colors group-hover:text-blue-900 sm:block sm:text-[24px]">
          JuriScribe
        </span>
      </div>
    </div>
  )

  const middleNav = (
    /* FIXED: Enforced hidden element behavior by default, switching strictly to flex on md breakpoints */
    <div className="hidden flex-1 items-center justify-center gap-8 px-4 md:flex md:px-8">
      <a
        onClick={() => route.push("/#features")}
        className="text-sm font-medium text-slate-600 transition-colors hover:cursor-pointer hover:text-blue-600"
      >
        {t("links.features")}
      </a>
      <a
        onClick={() => route.push("/#how-it-works")}
        className="text-sm font-medium text-slate-600 transition-colors hover:cursor-pointer hover:text-blue-600"
      >
        {t("links.howItWorks")}
      </a>
      <a
        onClick={() => route.push("/#library")}
        className="text-sm font-medium text-slate-600 transition-colors hover:cursor-pointer hover:text-blue-600"
      >
        {t("links.library")}
      </a>
    </div>
  )

  const RightNav = (isLoggedIn: boolean) => {
    return (
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        {/* Language Selector */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center gap-1 rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95"
            title="Language"
          >
            <Globe size={20} />
            <span className="text-sm font-medium">
              {languages
                .find((lang) => lang.code === locale)
                ?.code.toUpperCase()}
            </span>
          </button>

          {isLanguageOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLanguageOpen(false)}
              ></div>
              <div className="absolute top-full right-0 z-50 mt-2 w-40 origin-top-right transform rounded-lg border border-slate-200 bg-white py-1 shadow-lg transition-all">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLocale(lang.code)
                      setLocale(lang.code)
                      setIsLanguageOpen(false)
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors ${locale === lang.code ? "bg-blue-50 font-medium text-blue-700" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    <span>{lang.label}</span>
                    {locale === lang.code && <Check size={16} />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {isLoggedIn && (
          <>
            <button
              className="hidden rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95 md:block"
              title="Help"
            >
              <HelpCircle size={22} />
            </button>
          </>
        )}

        <div className="pl-2">
          {isLoggedIn ? (
            <div className="group relative">
              <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white shadow-sm transition-all active:scale-95 sm:h-10 sm:w-10 sm:text-base">
                {user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <User size={18} />
                )}
              </button>
              <div className="invisible absolute top-full right-0 z-50 origin-top-right translate-y-1 transform pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                  <div className="mb-1 border-b border-slate-100 px-4 py-2">
                    <p className="text-sm font-medium text-slate-800">
                      {user?.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:cursor-pointer hover:bg-red-50"
                  >
                    <LogOut size={16} /> {t("logout")}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md active:scale-95 sm:px-6 sm:py-2.5 sm:text-base"
            >
              <User size={18} />
              <span className="hidden sm:inline">{t("signIn")}</span>
            </button>
          )}
        </div>
      </div>
    )
  }

  return loading ? null : (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {leftNav}
      {middleNav}
      {RightNav(isLoggedIn)}
    </header>
  )
}
