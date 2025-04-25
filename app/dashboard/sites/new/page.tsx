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

export default function NewSitePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate site creation
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/editor")
    }, 1000)
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
              title="Business"
              description="Professional template for businesses and services"
              image="/placeholder.svg?height=200&width=300"
              category="Business"
            />
            <TemplateCard
              title="E-commerce"
              description="Complete online store with product catalog"
              image="/placeholder.svg?height=200&width=300"
              category="E-commerce"
              featured
            />
            <TemplateCard
              title="Portfolio"
              description="Showcase your work and skills"
              image="/placeholder.svg?height=200&width=300"
              category="Portfolio"
            />
            <TemplateCard
              title="Blog"
              description="Content-focused blog with categories"
              image="/placeholder.svg?height=200&width=300"
              category="Blog"
            />
            <TemplateCard
              title="Landing Page"
              description="High-conversion landing page for products"
              image="/placeholder.svg?height=200&width=300"
              category="Marketing"
            />
            <TemplateCard
              title="Restaurant"
              description="Restaurant site with menu and reservations"
              image="/placeholder.svg?height=200&width=300"
              category="Business"
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
                  <Input id="site-name" placeholder="My Awesome Website" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Description (optional)</Label>
                  <Input id="site-description" placeholder="A brief description of your website" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-type">Website Type</Label>
                    <Select defaultValue="business">
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
                    <Select defaultValue="en">
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
