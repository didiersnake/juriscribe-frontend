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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Navbar
        isLoggedIn={true}
        onToggleAuth={() => console.log("Toggle auth")}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />
      <div>
        <GuestHome
          onLogin={() => console.log("Login clicked")}
          isLoggedIn={true}
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
