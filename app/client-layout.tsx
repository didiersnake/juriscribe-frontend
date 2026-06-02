// components/client-layout.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/lib/authContext"
import { getCookie } from "@/lib/utils"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const route = useRouter()
  // const locale = await getCookie("locale") || "en"
  const [locale, setLocale] = React.useState("en")

  React.useEffect(() => {
    getCookie("locale").then((cookieLocale) => {
      if (cookieLocale) {
        setLocale(cookieLocale)
      }
    })
  }, [locale])

  return (
    <AuthProvider>
      {/* <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}
      <Navbar
        locale={locale}
        onNavigate={() => route.push("/")}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />
      {children}
      <Footer />
    </AuthProvider>
  )
}
