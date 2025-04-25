"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Layers,
  LayoutGrid,
  FileText,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  ChevronDown,
  PlusCircle,
} from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background lg:block lg:w-64">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Layers className="h-6 w-6" />
            <span>ModernCMS</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            <Link href="/dashboard" passHref>
              <Button
                variant="ghost"
                className={cn("justify-start gap-2 h-9", pathname === "/dashboard" && "bg-muted")}
              >
                <LayoutGrid className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            <div className="py-2">
              <div className="flex items-center justify-between px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <span>Websites</span>
                <Link href="/dashboard/sites/new">
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only">New website</span>
                  </Button>
                </Link>
              </div>
              <div className="grid gap-1 pt-1">
                <Link href="/dashboard/sites/company" passHref>
                  <Button variant="ghost" className="justify-start gap-2 h-9 text-muted-foreground">
                    Company Website
                  </Button>
                </Link>
                <Link href="/dashboard/sites/store" passHref>
                  <Button variant="ghost" className="justify-start gap-2 h-9 text-muted-foreground">
                    E-commerce Store
                  </Button>
                </Link>
                <Link href="/dashboard/sites/portfolio" passHref>
                  <Button variant="ghost" className="justify-start gap-2 h-9 text-muted-foreground">
                    Portfolio
                  </Button>
                </Link>
                <Link href="/dashboard/sites/blog" passHref>
                  <Button variant="ghost" className="justify-start gap-2 h-9 text-muted-foreground">
                    Blog
                  </Button>
                </Link>
              </div>
            </div>

            <Link href="/dashboard/pages" passHref>
              <Button
                variant="ghost"
                className={cn("justify-start gap-2 h-9", pathname === "/dashboard/pages" && "bg-muted")}
              >
                <FileText className="h-4 w-4" />
                Pages
              </Button>
            </Link>

            <Link href="/dashboard/products" passHref>
              <Button
                variant="ghost"
                className={cn("justify-start gap-2 h-9", pathname === "/dashboard/products" && "bg-muted")}
              >
                <ShoppingCart className="h-4 w-4" />
                Products
              </Button>
            </Link>

            <Link href="/dashboard/users" passHref>
              <Button
                variant="ghost"
                className={cn("justify-start gap-2 h-9", pathname === "/dashboard/users" && "bg-muted")}
              >
                <Users className="h-4 w-4" />
                Users
              </Button>
            </Link>

            <Link href="/dashboard/settings" passHref>
              <Button
                variant="ghost"
                className={cn("justify-start gap-2 h-9", pathname === "/dashboard/settings" && "bg-muted")}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>

            <Link href="/dashboard/help" passHref>
              <Button
                variant="ghost"
                className={cn("justify-start gap-2 h-9", pathname === "/dashboard/help" && "bg-muted")}
              >
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Button>
            </Link>
          </nav>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">JD</div>
            <div className="flex-1 overflow-hidden">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground truncate">john@example.com</div>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
