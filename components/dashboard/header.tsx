"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Menu, Layers } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import DashboardSidebar from "./sidebar"

export default function DashboardHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="lg:hidden">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Layers className="h-5 w-5" />
          <span>ModernCMS</span>
        </Link>
      </div>

      <div className="w-full flex items-center gap-4 md:ml-auto md:gap-6 lg:gap-8">
        <form className="hidden md:flex-1 md:flex max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full pl-8" />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
    </header>
  )
}
