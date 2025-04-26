import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getWebsiteById } from "@/actions/websites"
import { getAvailableThemes, getWebsiteTheme, updateWebsiteTheme } from "@/actions/themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateWebsite } from "@/actions/websites"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

// Define server actions separately
async function updateWebsiteAction(siteId: string, formData: FormData) {
  "use server"
  return await updateWebsite(siteId, formData)
}

async function updateThemeAction(siteId: string, formData: FormData) {
  "use server"
  const themeId = formData.get("themeId") as string
  return await updateWebsiteTheme(siteId, themeId)
}

export default async function SettingsPage({ params }: { params: { siteId: string } }) {
  const { siteId } = params
  const website = await getWebsiteById(siteId)
  const currentTheme = await getWebsiteTheme(siteId)
  const availableThemes = await getAvailableThemes()

  if (!website) {
    return <div>Website not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{website.name}</h1>
        <p className="text-muted-foreground">Configure your website settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure the basic settings for your website</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action={async (formData) => {
                  await updateWebsiteAction(siteId, formData)
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Website Name</Label>
                  <Input id="name" name="name" defaultValue={website.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={website.description || ""}
                    placeholder="Enter a description for your website"
                  />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="theme" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Choose a theme for your website</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action={async (formData) => {
                  await updateThemeAction(siteId, formData)
                }}
                className="space-y-4"
              >
                <RadioGroup
                  defaultValue={currentTheme?.id || "default"}
                  name="themeId"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {availableThemes.map((theme) => (
                    <div key={theme.id} className="relative">
                      <RadioGroupItem value={theme.id} id={`theme-${theme.id}`} className="sr-only" />
                      <Label
                        htmlFor={`theme-${theme.id}`}
                        className="flex flex-col items-center space-y-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="w-full aspect-video rounded-md overflow-hidden border">
                          <Image
                            src={theme.thumbnail || "/placeholder.svg?height=100&width=200"}
                            alt={theme.name}
                            width={200}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-medium">{theme.name}</div>
                        <div className="text-xs text-muted-foreground">{theme.description}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button type="submit">Apply Theme</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced settings for your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">Advanced settings coming soon...</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
