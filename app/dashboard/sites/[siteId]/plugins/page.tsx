import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPlugins } from "@/actions/plugins"
import { getWebsiteById } from "@/actions/websites"
import Link from "next/link"
import { Plus, Puzzle, MoreHorizontal } from "lucide-react"
import { EmptyState } from "@/components/dashboard/empty-state"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { togglePluginStatus } from "@/actions/plugins"
import { format } from "date-fns"

export default async function PluginsPage({ params }: { params: { siteId: string } }) {
  const { siteId } = params
  const website = await getWebsiteById(siteId)
  const plugins = await getPlugins(siteId)

  if (!website) {
    return <div>Website not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{website.name}</h1>
          <p className="text-muted-foreground">Manage your plugins and extensions</p>
        </div>
        <Link href={`/dashboard/sites/${siteId}/plugins/new`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Plugin
          </Button>
        </Link>
      </div>

      {plugins.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plugins.map((plugin) => (
            <Card key={plugin.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>{plugin.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/sites/${siteId}/plugins/${plugin.id}`}>Configure</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>{plugin.description || "No description"}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant={plugin.enabled ? "default" : "secondary"}>
                    {plugin.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                  <form
                    action={async () => {
                      "use server"
                      await togglePluginStatus(plugin.id, !plugin.enabled)
                    }}
                  >
                    <Switch checked={plugin.enabled} />
                  </form>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Updated {format(new Date(plugin.updatedAt), "MMM d, yyyy")}
                </div>
                <Link href={`/dashboard/sites/${siteId}/plugins/${plugin.id}`}>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Puzzle}
          title="No plugins yet"
          description="Add plugins to extend your website's functionality."
          action={
            <Link href={`/dashboard/sites/${siteId}/plugins/new`}>
              <Button>Add Plugin</Button>
            </Link>
          }
        />
      )}
    </div>
  )
}
