"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createPage } from "@/actions/pages"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"

export default function NewPagePage() {
  const params = useParams<{ siteId: string }>()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState({
    title: "",
    slug: "",
    description: "",
    isHome: false,
  })

  const handleChange = (field: string, value: any) => {
    setPage((prev) => ({ ...prev, [field]: value }))
  }

  const handleSlugChange = (value: string) => {
    // Convert to slug format
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    handleChange("slug", slug)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Basic validation
      if (!page.title || !page.slug) {
        toast({
          title: "Validation Error",
          description: "Page title and slug are required.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const result = await createPage(params.siteId, {
        ...page,
        content: {
          sections: [
            {
              type: "content",
              title: page.title,
              content: "<p>Start editing this page in the page editor.</p>",
            },
          ],
        },
      })

      if (result.success) {
        toast({
          title: "Page created",
          description: "Your new page has been created successfully.",
        })

        if (result.pageId) {
          router.push(`/dashboard/sites/${params.siteId}/editor?page=${result.pageId}`)
        }
      } else {
        toast({
          title: "Error",
          description:
            typeof result.error === "string"
              ? result.error
              : "Failed to create page. Please check the form and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push(`/dashboard/sites/${params.siteId}/pages`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Page</h1>
            <p className="text-muted-foreground mt-2">Add a new page to your website</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create & Edit"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Information</CardTitle>
          <CardDescription>Basic information about your page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="page-title">Page Title</Label>
            <Input
              id="page-title"
              value={page.title}
              onChange={(e) => {
                handleChange("title", e.target.value)
                handleSlugChange(e.target.value)
              }}
              placeholder="About Us"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="page-slug">Slug</Label>
            <Input
              id="page-slug"
              value={page.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="about-us"
            />
            <p className="text-xs text-muted-foreground">
              This will be used in the URL: /{page.slug || "example-slug"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="page-description">Description (optional)</Label>
            <Textarea
              id="page-description"
              value={page.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="A brief description of this page"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="page-home"
              checked={page.isHome}
              onCheckedChange={(checked) => handleChange("isHome", checked)}
            />
            <Label htmlFor="page-home">
              Set as homepage
              <span className="block text-xs text-muted-foreground">This will replace your current homepage</span>
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create & Edit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
