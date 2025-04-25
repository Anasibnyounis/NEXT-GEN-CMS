import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import Link from "next/link"
import { WebsiteCard } from "@/components/dashboard/website-card"
import { getWebsites } from "@/actions/websites"
import { EmptyState } from "@/components/dashboard/empty-state"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"

export default async function DashboardPage() {
  const websites = await getWebsites()

  const publishedWebsites = websites.filter((website) => website.status === "PUBLISHED")
  const draftWebsites = websites.filter((website) => website.status === "DRAFT")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/dashboard/sites/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Website
          </Button>
        </Link>
      </div>

      <DashboardStats websiteCount={websites.length} />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Websites</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {websites.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {websites.map((website) => (
                <WebsiteCard
                  key={website.id}
                  id={website.id}
                  title={website.name}
                  description={website.description || ""}
                  image="/placeholder.svg?height=200&width=300"
                  status={website.status.toLowerCase() as "published" | "draft"}
                  url={website.url}
                  lastEdited={new Date(website.updatedAt).toLocaleDateString()}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No websites yet"
              description="Create your first website to get started."
              action={
                <Link href="/dashboard/sites/new">
                  <Button>Create Website</Button>
                </Link>
              }
            />
          )}
        </TabsContent>
        <TabsContent value="published" className="space-y-4">
          {publishedWebsites.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {publishedWebsites.map((website) => (
                <WebsiteCard
                  key={website.id}
                  id={website.id}
                  title={website.name}
                  description={website.description || ""}
                  image="/placeholder.svg?height=200&width=300"
                  status="published"
                  url={website.url}
                  lastEdited={new Date(website.updatedAt).toLocaleDateString()}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No published websites"
              description="Publish a website to see it here."
              action={
                websites.length > 0 ? (
                  <Link href={`/dashboard/sites/${websites[0].id}/settings`}>
                    <Button>Publish Website</Button>
                  </Link>
                ) : (
                  <Link href="/dashboard/sites/new">
                    <Button>Create Website</Button>
                  </Link>
                )
              }
            />
          )}
        </TabsContent>
        <TabsContent value="drafts" className="space-y-4">
          {draftWebsites.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {draftWebsites.map((website) => (
                <WebsiteCard
                  key={website.id}
                  id={website.id}
                  title={website.name}
                  description={website.description || ""}
                  image="/placeholder.svg?height=200&width=300"
                  status="draft"
                  lastEdited={new Date(website.updatedAt).toLocaleDateString()}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No draft websites"
              description="Create a new website to get started."
              action={
                <Link href="/dashboard/sites/new">
                  <Button>Create Website</Button>
                </Link>
              }
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
