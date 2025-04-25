import type React from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import DashboardSidebar from "@/components/dashboard/sidebar"
import { DashboardFooter } from "@/components/dashboard/footer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
      <DashboardFooter />
    </div>
  )
}
