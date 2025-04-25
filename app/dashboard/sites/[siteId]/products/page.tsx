import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts } from "@/actions/products"
import { getWebsiteById } from "@/actions/websites"
import Link from "next/link"
import { Plus, ShoppingCart, ExternalLink, MoreHorizontal } from "lucide-react"
import { EmptyState } from "@/components/dashboard/empty-state"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { formatCurrency } from "@/lib/utils"

export default async function ProductsPage({ params }: { params: { siteId: string } }) {
  const { siteId } = params
  const website = await getWebsiteById(siteId)
  const products = await getProducts(siteId)

  if (!website) {
    return <div>Website not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{website.name}</h1>
          <p className="text-muted-foreground">Manage your products</p>
        </div>
        <Link href={`/dashboard/sites/${siteId}/products/new`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Product
          </Button>
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>{product.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/sites/${siteId}/products/${product.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/preview/${siteId}/products/${product.slug}`} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="truncate">{product.description || "No description"}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{formatCurrency(product.price)}</span>
                    <Badge variant={product.published ? "default" : "secondary"}>
                      {product.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Inventory: {product.inventory} {product.inventory === 1 ? "item" : "items"}
                  </div>
                  {product.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.categories.map((category) => (
                        <Badge key={category.id} variant="outline">
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Updated {format(new Date(product.updatedAt), "MMM d, yyyy")}
                </div>
                <Link href={`/dashboard/sites/${siteId}/products/${product.id}`}>
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
          icon={ShoppingCart}
          title="No products yet"
          description="Create your first product to get started."
          action={
            <Link href={`/dashboard/sites/${siteId}/products/new`}>
              <Button>Create Product</Button>
            </Link>
          }
        />
      )}
    </div>
  )
}
