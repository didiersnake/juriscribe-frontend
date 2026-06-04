"use client"

import * as React from "react"
import GuestHome from "@/components/guest-home"
export default function Page() {
  const login = () => {
    // window.location.href = "http://localhost:8888/oauth2/authorization/google"
    window.location.href =
      "https://juriscribebackend.didierdjakoua.site/oauth2/authorization/google"
  }
  return (
    <div>
      <GuestHome onLogin={() => login()} />
    </div>
  )
}
