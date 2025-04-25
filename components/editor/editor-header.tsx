"use client"

import { Button } from "@/components/ui/button"
import { Save, Undo, Redo, Smartphone, Tablet, Monitor, Eye, Settings, PanelLeft } from "lucide-react"
import Link from "next/link"

interface EditorHeaderProps {
  activeView: "desktop" | "tablet" | "mobile"
  setActiveView: (view: "desktop" | "tablet" | "mobile") => void
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
}

export function EditorHeader({ activeView, setActiveView, showSidebar, setShowSidebar }: EditorHeaderProps) {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
          className={showSidebar ? "bg-muted" : ""}
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="text-sm font-medium">Editing: Home Page</div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-none h-8 w-8 ${activeView === "mobile" ? "bg-muted" : ""}`}
            onClick={() => setActiveView("mobile")}
          >
            <Smartphone className="h-4 w-4" />
            <span className="sr-only">Mobile view</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-none h-8 w-8 ${activeView === "tablet" ? "bg-muted" : ""}`}
            onClick={() => setActiveView("tablet")}
          >
            <Tablet className="h-4 w-4" />
            <span className="sr-only">Tablet view</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-none h-8 w-8 ${activeView === "desktop" ? "bg-muted" : ""}`}
            onClick={() => setActiveView("desktop")}
          >
            <Monitor className="h-4 w-4" />
            <span className="sr-only">Desktop view</span>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Undo className="h-4 w-4" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Redo className="h-4 w-4" />
            <span className="sr-only">Redo</span>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>

        <Button variant="outline" size="sm" className="gap-1">
          <Eye className="h-4 w-4" />
          Preview
        </Button>

        <Button size="sm" className="gap-1">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>

      <div>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            Exit Editor
          </Button>
        </Link>
      </div>
    </header>
  )
}
