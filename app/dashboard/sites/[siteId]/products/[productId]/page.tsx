"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaLibrary } from "@/components/editor/media-library"
import { RichTextEditor } from "@/components/editor/rich-text-editor"
import { getProduct, createProduct, updateProduct } from "@/actions/products"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Plus, X } from "lucide-react"

export default function ProductEditorPage() {
  const params = useParams<{ siteId: string; productId: string }>()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    price: "0",
    inventory: "0",
    published: false,
    images: [] as string[],
    categories: [] as string[],
  })
  const isNewProduct = params.productId === "new"

  useEffect(() => {
    const fetchProduct = async () => {
      if (isNewProduct) return

      try {
        const data = await getProduct(params.siteId, params.productId)
        if (data) {
          setProduct({
            name: data.name,
            slug: data.slug,
            description: data.description || "",
            price: String(data.price),
            inventory: String(data.inventory),
            published: data.published,
            images: data.images || [],
            categories: data.categories?.map((cat: any) => cat.id) || [],
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchProduct()
  }, [params.siteId, params.productId, isNewProduct, toast])

  const handleChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }))
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
      if (!product.name || !product.slug) {
        toast({
          title: "Validation Error",
          description: "Product name and slug are required.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const productData = {
        ...product,
        price: Number.parseFloat(product.price),
        inventory: Number.parseInt(product.inventory, 10),
      }

      let result
      if (isNewProduct) {
        result = await createProduct(params.siteId, productData)
      } else {
        result = await updateProduct(params.siteId, params.productId, productData)
      }

      if (result.success) {
        toast({
          title: isNewProduct ? "Product created" : "Product updated",
          description: isNewProduct
            ? "Your new product has been created successfully."
            : "Your product has been updated successfully.",
        })

        if (isNewProduct && result.productId) {
          router.push(`/dashboard/sites/${params.siteId}/products/${result.productId}`)
        }
      } else {
        toast({
          title: "Error",
          description:
            typeof result.error === "string"
              ? result.error
              : "Failed to save product. Please check the form and try again.",
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
    router.push(`/dashboard/sites/${params.siteId}/products`)
  }

  const handleAddImage = (url: string) => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }))
  }

  const handleRemoveImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isNewProduct ? "Add Product" : "Edit Product"}</h1>
            <p className="text-muted-foreground mt-2">
              {isNewProduct ? "Add a new product to your catalog" : "Edit your product details"}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Product"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="inventory">Inventory & Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Basic information about your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={product.name}
                  onChange={(e) => {
                    handleChange("name", e.target.value)
                    if (isNewProduct) {
                      handleSlugChange(e.target.value)
                    }
                  }}
                  placeholder="Premium Widget"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-slug">Slug</Label>
                <Input
                  id="product-slug"
                  value={product.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="premium-widget"
                />
                <p className="text-xs text-muted-foreground">
                  This will be used in the URL: /products/{product.slug || "example-slug"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="product-published"
                  checked={product.published}
                  onCheckedChange={(checked) => handleChange("published", checked)}
                />
                <Label htmlFor="product-published">
                  {product.published ? "Published" : "Draft"} -{" "}
                  <span className="text-muted-foreground">
                    {product.published
                      ? "This product is visible to customers"
                      : "This product is hidden from customers"}
                  </span>
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Upload and manage product images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="relative border rounded-md overflow-hidden aspect-square">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="border border-dashed rounded-md flex items-center justify-center aspect-square">
                  <MediaLibrary
                    onSelect={handleAddImage}
                    buttonLabel={
                      <>
                        <Plus className="h-4 w-4 mr-1" /> Add Image
                      </>
                    }
                    buttonVariant="ghost"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="description">
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
              <CardDescription>Detailed description of your product</CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                content={product.description}
                onChange={(content) => handleChange("description", content)}
                placeholder="Describe your product..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory & Pricing</CardTitle>
              <CardDescription>Manage product inventory and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-price">Price ($)</Label>
                <Input
                  id="product-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-inventory">Inventory</Label>
                <Input
                  id="product-inventory"
                  type="number"
                  min="0"
                  value={product.inventory}
                  onChange={(e) => handleChange("inventory", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Set to 0 if the product is out of stock</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Product"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
