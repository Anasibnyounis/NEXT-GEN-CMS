"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface TemplateCardProps {
  title: string
  description: string
  image: string
  category: string
  featured?: boolean
}

export function TemplateCard({ title, description, image, category, featured = false }: TemplateCardProps) {
  const router = useRouter()

  const handleSelect = () => {
    router.push("/dashboard/editor")
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={handleSelect}>
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        {featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="default" className="bg-primary">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">{category}</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3">{description}</p>
          <Button size="sm" className="w-full">
            Use This Template
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
