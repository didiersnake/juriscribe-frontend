"use client"

import { useRouter } from "next/navigation"
import TemplateDashboard from "@/components/template-dashboard"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div>
      <TemplateDashboard onNavigate={(route: string) => router.push(route)} />
    </div>
  )
}
