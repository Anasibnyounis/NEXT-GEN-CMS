import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Eye, BarChart3, Users, Globe } from "lucide-react"
import Link from "next/link"
import { WebsiteCard } from "@/components/dashboard/website-card"

export default function DashboardPage() {
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6,782</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Websites</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <WebsiteCard
              title="Company Website"
              description="Corporate website with about, services, and contact pages"
              image="/placeholder.svg?height=200&width=300"
              status="published"
              url="https://company-example.com"
              lastEdited="2 days ago"
            />
            <WebsiteCard
              title="E-commerce Store"
              description="Online store with product catalog and checkout"
              image="/placeholder.svg?height=200&width=300"
              status="published"
              url="https://store-example.com"
              lastEdited="5 days ago"
            />
            <WebsiteCard
              title="Portfolio"
              description="Personal portfolio showcasing projects and skills"
              image="/placeholder.svg?height=200&width=300"
              status="published"
              url="https://portfolio-example.com"
              lastEdited="1 week ago"
            />
            <WebsiteCard
              title="Blog"
              description="Content blog with articles and newsletter signup"
              image="/placeholder.svg?height=200&width=300"
              status="draft"
              lastEdited="3 days ago"
            />
          </div>
        </TabsContent>
        <TabsContent value="published" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <WebsiteCard
              title="Company Website"
              description="Corporate website with about, services, and contact pages"
              image="/placeholder.svg?height=200&width=300"
              status="published"
              url="https://company-example.com"
              lastEdited="2 days ago"
            />
            <WebsiteCard
              title="E-commerce Store"
              description="Online store with product catalog and checkout"
              image="/placeholder.svg?height=200&width=300"
              status="published"
              url="https://store-example.com"
              lastEdited="5 days ago"
            />
            <WebsiteCard
              title="Portfolio"
              description="Personal portfolio showcasing projects and skills"
              image="/placeholder.svg?height=200&width=300"
              status="published"
              url="https://portfolio-example.com"
              lastEdited="1 week ago"
            />
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <WebsiteCard
              title="Blog"
              description="Content blog with articles and newsletter signup"
              image="/placeholder.svg?height=200&width=300"
              status="draft"
              lastEdited="3 days ago"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
