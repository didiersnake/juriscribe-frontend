// components/client-layout.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/lib/authContext"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const route = useRouter()

  return (
    <AuthProvider>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Navbar
        onNavigate={() => route.push("/")}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />
      {children}
      <Footer />
    </AuthProvider>
  )
}
