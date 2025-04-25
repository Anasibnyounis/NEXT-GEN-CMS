import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPages } from "@/actions/pages"
import { getWebsiteById } from "@/actions/websites"
import Link from "next/link"
import { Plus, FileText, Home, ExternalLink, MoreHorizontal } from "lucide-react"
import { EmptyState } from "@/components/dashboard/empty-state"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default async function PagesPage({ params }: { params: { siteId: string } }) {
  const { siteId } = params
  const website = await getWebsiteById(siteId)
  const pages = await getPages(siteId)

  if (!website) {
    return <div>Website not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{website.name}</h1>
          <p className="text-muted-foreground">Manage your website pages</p>
        </div>
        <Link href={`/dashboard/sites/${siteId}/pages/new`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Page
          </Button>
        </Link>
      </div>

      {pages.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {page.isHome && <Home className="h-4 w-4 text-primary" />}
                    {page.title}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/sites/${siteId}/pages/${page.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/preview/${siteId}/${page.slug}`} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="truncate">{page.description || "No description"}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{`/${page.slug}`}</Badge>
                  {page.isHome && <Badge>Home Page</Badge>}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Updated {format(new Date(page.updatedAt), "MMM d, yyyy")}
                </div>
                <Link href={`/dashboard/sites/${siteId}/pages/${page.id}`}>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No pages yet"
          description="Create your first page to get started."
          action={
            <Link href={`/dashboard/sites/${siteId}/pages/new`}>
              <Button>Create Page</Button>
            </Link>
          }
        />
      )}
    </div>
  )
}
