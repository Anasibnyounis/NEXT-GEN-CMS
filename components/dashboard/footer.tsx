import Link from "next/link"

export function DashboardFooter() {
  return (
    <footer className="border-t py-4 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ModernCMS. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground hover:underline">
            Documentation
          </Link>
          <Link href="/help" className="text-sm text-muted-foreground hover:underline">
            Help
          </Link>
        </div>
      </div>
    </footer>
  )
}
