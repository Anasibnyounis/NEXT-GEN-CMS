"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TemplateCard } from "@/components/dashboard/template-card"
import { createWebsite } from "@/actions/websites"
import { useToast } from "@/components/ui/use-toast"

export default function NewSitePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    "site-name": "",
    "site-description": "",
    "site-type": "business",
    "site-language": "en",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      const result = await createWebsite(formDataObj)

      if (result.success) {
        toast({
          title: "Website created",
          description: "Your new website has been created successfully.",
        })
        router.push(`/dashboard/sites/${result.websiteId}/editor`)
      } else {
        toast({
          title: "Error",
          description:
            typeof result.error === "string"
              ? result.error
              : "Failed to create website. Please check the form and try again.",
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

  const handleTemplateSelect = (templateId: string) => {
    setIsLoading(true)

    // Create a website with the selected template
    const formDataObj = new FormData()
    formDataObj.append("site-name", `My ${templateId.charAt(0).toUpperCase() + templateId.slice(1)} Website`)
    formDataObj.append("site-description", `A website created with the ${templateId} template`)
    formDataObj.append("site-type", templateId)
    formDataObj.append("site-language", "en")

    createWebsite(formDataObj)
      .then((result) => {
        if (result.success) {
          toast({
            title: "Website created",
            description: "Your new website has been created successfully with the selected template.",
          })
          router.push(`/dashboard/sites/${result.websiteId}/editor`)
        } else {
          toast({
            title: "Error",
            description:
              typeof result.error === "string" ? result.error : "Failed to create website. Please try again.",
            variant: "destructive",
          })
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create a New Website</h1>
        <p className="text-muted-foreground mt-2">Get started by selecting a template or start from scratch</p>
      </div>

      <Tabs defaultValue="template" className="space-y-6">
        <TabsList>
          <TabsTrigger value="template">Start with a Template</TabsTrigger>
          <TabsTrigger value="scratch">Start from Scratch</TabsTrigger>
          <TabsTrigger value="import">Import Existing Site</TabsTrigger>
        </TabsList>

        <TabsContent value="template">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TemplateCard
              id="business"
              title="Business"
              description="Professional template for businesses and services"
              image="/placeholder.svg?height=200&width=300"
              category="Business"
              onSelect={handleTemplateSelect}
            />
            <TemplateCard
              id="ecommerce"
              title="E-commerce"
              description="Complete online store with product catalog"
              image="/placeholder.svg?height=200&width=300"
              category="E-commerce"
              featured
              onSelect={handleTemplateSelect}
            />
            <TemplateCard
              id="portfolio"
              title="Portfolio"
              description="Showcase your work and skills"
              image="/placeholder.svg?height=200&width=300"
              category="Portfolio"
              onSelect={handleTemplateSelect}
            />
            <TemplateCard
              id="blog"
              title="Blog"
              description="Content-focused blog with categories"
              image="/placeholder.svg?height=200&width=300"
              category="Blog"
              onSelect={handleTemplateSelect}
            />
            <TemplateCard
              id="landing"
              title="Landing Page"
              description="High-conversion landing page for products"
              image="/placeholder.svg?height=200&width=300"
              category="Marketing"
              onSelect={handleTemplateSelect}
            />
            <TemplateCard
              id="restaurant"
              title="Restaurant"
              description="Restaurant site with menu and reservations"
              image="/placeholder.svg?height=200&width=300"
              category="Business"
              onSelect={handleTemplateSelect}
            />
          </div>
        </TabsContent>

        <TabsContent value="scratch">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Website Details</CardTitle>
                <CardDescription>Enter the basic information for your new website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Website Name</Label>
                  <Input
                    id="site-name"
                    name="site-name"
                    placeholder="My Awesome Website"
                    value={formData["site-name"]}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Description (optional)</Label>
                  <Input
                    id="site-description"
                    name="site-description"
                    placeholder="A brief description of your website"
                    value={formData["site-description"]}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-type">Website Type</Label>
                    <Select
                      value={formData["site-type"]}
                      onValueChange={(value) => handleSelectChange("site-type", value)}
                    >
                      <SelectTrigger id="site-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="portfolio">Portfolio</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-language">Primary Language</Label>
                    <Select
                      value={formData["site-language"]}
                      onValueChange={(value) => handleSelectChange("site-language", value)}
                    >
                      <SelectTrigger id="site-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Website"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import Existing Website</CardTitle>
              <CardDescription>Import content from an existing website or CMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="import-url">Website URL</Label>
                <Input id="import-url" placeholder="https://example.com" type="url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="import-type">Import From</Label>
                <Select defaultValue="wordpress">
                  <SelectTrigger id="import-type">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wordpress">WordPress</SelectItem>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="wix">Wix</SelectItem>
                    <SelectItem value="contentful">Contentful</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Start Import</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
