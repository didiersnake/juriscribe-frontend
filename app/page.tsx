"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import TextEditor from "@/components/text-editor"
import Navbar from "@/components/navbar"
import GuestHome from "@/components/guest-home"
import TemplateDashboard from "@/components/template-dashboard"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Navbar
        isLoggedIn={isLoggedIn}
        onToggleAuth={toggleAuth}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />
      <div>
        <GuestHome
          onLogin={() => setIsLoggedIn(true)}
          isLoggedIn={isLoggedIn}
        />
      </div>
      {/* <div className="mx-auto max-w-[650px] py-10">
        <TextEditor />
      </div> */}
      {/* <TemplateDashboard /> */}
      <Footer />
    </div>
  )
}
