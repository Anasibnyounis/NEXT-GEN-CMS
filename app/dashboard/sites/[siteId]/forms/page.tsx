import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getForms } from "@/actions/forms"
import { getWebsiteById } from "@/actions/websites"
import Link from "next/link"
import { Plus, MessageSquare, MoreHorizontal } from "lucide-react"
import { EmptyState } from "@/components/dashboard/empty-state"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"

export default async function FormsPage({ params }: { params: { siteId: string } }) {
  const { siteId } = params
  const website = await getWebsiteById(siteId)
  const forms = await getForms(siteId)

  if (!website) {
    return <div>Website not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{website.name}</h1>
          <p className="text-muted-foreground">Manage your forms and submissions</p>
        </div>
        <Link href={`/dashboard/sites/${siteId}/forms/new`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Form
          </Button>
        </Link>
      </div>

      {forms.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <Card key={form.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>{form.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/sites/${siteId}/forms/${form.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/sites/${siteId}/forms/${form.id}/submissions`}>View Submissions</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  {Array.isArray(form.fields) ? `${form.fields.length} fields` : "No fields"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-sm">
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{`<Form id="${form.id}" />`}</code>
                  <p className="mt-2 text-muted-foreground">Use this code to embed the form in your pages</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Updated {format(new Date(form.updatedAt), "MMM d, yyyy")}
                </div>
                <Link href={`/dashboard/sites/${siteId}/forms/${form.id}`}>
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
          icon={MessageSquare}
          title="No forms yet"
          description="Create your first form to collect data from your website visitors."
          action={
            <Link href={`/dashboard/sites/${siteId}/forms/new`}>
              <Button>Create Form</Button>
            </Link>
          }
        />
      )}
    </div>
  )
}
