import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImageIcon, Type, Box, Search, ChevronRight } from "lucide-react"

export function EditorSidebar() {
  return (
    <div className="w-64 border-r flex flex-col h-full">
      <Tabs defaultValue="pages" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mx-2 my-2">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="layers">Layers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="flex-1 flex flex-col p-0 m-0">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search pages..." className="pl-8" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              <Button variant="ghost" className="w-full justify-start font-medium">
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                About
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                Services
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                Portfolio
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                Contact
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                Blog
              </Button>
            </div>
          </ScrollArea>
          <div className="p-2 border-t">
            <Button variant="outline" className="w-full">
              Add New Page
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="layers" className="flex-1 flex flex-col p-0 m-0">
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">STRUCTURE</div>
              <Button variant="ghost" className="w-full justify-between text-sm h-8">
                <div className="flex items-center">
                  <Box className="h-4 w-4 mr-2" />
                  Header
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between text-sm h-8">
                <div className="flex items-center">
                  <Box className="h-4 w-4 mr-2" />
                  Hero Section
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between text-sm h-8">
                <div className="flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  Heading
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-between text-sm h-8">
                <div className="flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  Paragraph
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-between text-sm h-8">
                <div className="flex items-center">
                  <Box className="h-4 w-4 mr-2" />
                  Button
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-between text-sm h-8">
                <div className="flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Image
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-between text-sm h-8">
                <div className="flex items-center">
                  <Box className="h-4 w-4 mr-2" />
                  Features Section
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between text-sm h-8">
                <div className="flex items-center">
                  <Box className="h-4 w-4 mr-2" />
                  Footer
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 flex flex-col p-4 m-0">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Page Settings</h3>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-xs">Page Title</label>
                  <Input defaultValue="Home" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs">Slug</label>
                  <Input defaultValue="/" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs">Description</label>
                  <Input defaultValue="Welcome to our website" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">SEO</h3>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-xs">Meta Title</label>
                  <Input defaultValue="Home | My Website" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs">Meta Description</label>
                  <Input defaultValue="Welcome to our website. We provide amazing services." />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
