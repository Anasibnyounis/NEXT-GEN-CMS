import type React from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Layout, Type, ImageIcon, Box, ShoppingCart, MessageSquare, BarChart3, Menu } from "lucide-react"

export function ComponentLibrary() {
  return (
    <div className="w-64 border-l flex flex-col h-full">
      <div className="p-3 border-b">
        <h3 className="font-medium mb-2">Components</h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search components..." className="pl-8" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">LAYOUT</h4>
            <div className="grid grid-cols-2 gap-2">
              <ComponentItem icon={<Layout />} label="Section" />
              <ComponentItem icon={<Box />} label="Container" />
              <ComponentItem icon={<Layout />} label="Grid" />
              <ComponentItem icon={<Layout />} label="Columns" />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">BASIC</h4>
            <div className="grid grid-cols-2 gap-2">
              <ComponentItem icon={<Type />} label="Heading" />
              <ComponentItem icon={<Type />} label="Text" />
              <ComponentItem icon={<Box />} label="Button" />
              <ComponentItem icon={<ImageIcon />} label="Image" />
              <ComponentItem icon={<Box />} label="Divider" />
              <ComponentItem icon={<Box />} label="Spacer" />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">SECTIONS</h4>
            <div className="grid grid-cols-2 gap-2">
              <ComponentItem icon={<Menu />} label="Header" />
              <ComponentItem icon={<Layout />} label="Hero" />
              <ComponentItem icon={<Layout />} label="Features" />
              <ComponentItem icon={<MessageSquare />} label="Testimonials" />
              <ComponentItem icon={<ShoppingCart />} label="Products" />
              <ComponentItem icon={<Box />} label="CTA" />
              <ComponentItem icon={<Menu />} label="Footer" />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">ADVANCED</h4>
            <div className="grid grid-cols-2 gap-2">
              <ComponentItem icon={<Box />} label="Form" />
              <ComponentItem icon={<Box />} label="Tabs" />
              <ComponentItem icon={<Box />} label="Accordion" />
              <ComponentItem icon={<BarChart3 />} label="Chart" />
              <ComponentItem icon={<Box />} label="Carousel" />
              <ComponentItem icon={<Box />} label="Modal" />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

function ComponentItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center p-2 border rounded-md hover:bg-muted cursor-move"
      draggable="true"
    >
      <div className="h-8 w-8 flex items-center justify-center text-muted-foreground mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </div>
  )
}
