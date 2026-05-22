"use client"
import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import React from "react"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import { AuthProvider } from "@/lib/authContext"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const route = useRouter()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <AuthProvider>
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <Navbar
            onNavigate={() => route.push("/")}
            onToggleSidebar={() => setIsSidebarOpen(true)}
          />
          {/* <ThemeProvider>{children}</ThemeProvider>
           */}
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
