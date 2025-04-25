"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, ImageIcon, Search, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MediaLibraryProps {
  onSelect: (url: string) => void
  buttonLabel?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

// Sample media items
const sampleMedia = [
  { id: "1", name: "Image 1", url: "/placeholder.svg?height=200&width=300", type: "image" },
  { id: "2", name: "Image 2", url: "/placeholder.svg?height=200&width=300", type: "image" },
  { id: "3", name: "Image 3", url: "/placeholder.svg?height=200&width=300", type: "image" },
  { id: "4", name: "Image 4", url: "/placeholder.svg?height=200&width=300", type: "image" },
  { id: "5", name: "Image 5", url: "/placeholder.svg?height=200&width=300", type: "image" },
  { id: "6", name: "Image 6", url: "/placeholder.svg?height=200&width=300", type: "image" },
]

export function MediaLibrary({ onSelect, buttonLabel = "Select Image", buttonVariant = "outline" }: MediaLibraryProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadingFile, setUploadingFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const filteredMedia = sampleMedia.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!uploadingFile) return

    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      setUploadingFile(null)
      // In a real app, you would upload the file and get the URL back
    }, 1500)
  }

  const handleSelect = (url: string) => {
    onSelect(url)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <ImageIcon className="h-4 w-4 mr-2" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
          <DialogDescription>Select an image from your media library or upload a new one.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="library" className="mt-4">
          <TabsList>
            <TabsTrigger value="library">Media Library</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-3 gap-4">
                {filteredMedia.map((item) => (
                  <Card
                    key={item.id}
                    className="cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-primary"
                    onClick={() => handleSelect(item.url)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-video relative">
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-2 text-sm truncate">{item.name}</div>
                    </CardContent>
                  </Card>
                ))}

                {filteredMedia.length === 0 && (
                  <div className="col-span-3 flex flex-col items-center justify-center py-8 text-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium">No media found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchQuery ? "Try a different search term" : "Upload some media to get started"}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="upload">
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Drag and drop your files here</h3>
                <p className="text-sm text-muted-foreground mb-4">or click to browse your computer</p>
                <Input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept="image/*" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" type="button">
                    <Plus className="h-4 w-4 mr-2" />
                    Select File
                  </Button>
                </Label>
              </div>

              {uploadingFile && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{uploadingFile.name}</span>
                    <span className="text-xs text-muted-foreground">{Math.round(uploadingFile.size / 1024)} KB</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-pulse" style={{ width: isUploading ? "100%" : "0%" }} />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {uploadingFile && (
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
