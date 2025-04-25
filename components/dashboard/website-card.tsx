import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ExternalLink, Edit, Copy, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface WebsiteCardProps {
  title: string
  description: string
  image: string
  status: "published" | "draft"
  url?: string
  lastEdited: string
}

export function WebsiteCard({ title, description, image, status, url, lastEdited }: WebsiteCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={status === "published" ? "default" : "secondary"}>
            {status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {status === "published" && (
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit site
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="text-xs text-muted-foreground">Edited {lastEdited}</div>
        <Link href="/dashboard/editor">
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
