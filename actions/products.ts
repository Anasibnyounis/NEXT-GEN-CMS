"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  inventory: z.coerce.number().int().min(0, "Inventory must be a non-negative integer"),
  published: z.boolean().default(false),
  categoryIds: z.array(z.string()).optional(),
})

export async function getProducts(websiteId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        websiteId,
      },
      include: {
        categories: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
    return products
  } catch (error) {
    console.error(`Error fetching products for website ${websiteId}:`, error)
    return []
  }
}

// Add this function to fix the missing export
export async function getProduct(websiteId: string, productId: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        websiteId,
      },
      include: {
        categories: true,
      },
    })
    return product
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error)
    return null
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    })
    return product
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function createProduct(websiteId: string, formData: FormData) {
  const categoryIds = formData.getAll("categoryIds") as string[]

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    inventory: formData.get("inventory"),
    published: formData.get("published") === "true",
    categoryIds,
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {
    name,
    slug,
    description,
    price,
    inventory,
    published,
    categoryIds: validatedCategoryIds,
  } = validatedFields.data

  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || "",
        price,
        inventory,
        published,
        websiteId,
        categories: {
          connect: validatedCategoryIds?.map((id) => ({ id })) || [],
        },
      },
    })

    revalidatePath(`/dashboard/sites/${websiteId}/products`)
    return { success: true, productId: product.id }
  } catch (error) {
    console.error("Error creating product:", error)
    return {
      success: false,
      error: "Failed to create product. Please try again.",
    }
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const categoryIds = formData.getAll("categoryIds") as string[]

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    inventory: formData.get("inventory"),
    published: formData.get("published") === "true",
    categoryIds,
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {
    name,
    slug,
    description,
    price,
    inventory,
    published,
    categoryIds: validatedCategoryIds,
  } = validatedFields.data

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        websiteId: true,
      },
    })

    if (!product) {
      return {
        success: false,
        error: "Product not found.",
      }
    }

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
        description: description || "",
        price,
        inventory,
        published,
        categories: {
          set: validatedCategoryIds?.map((id) => ({ id })) || [],
        },
      },
    })

    revalidatePath(`/dashboard/sites/${product.websiteId}/products`)
    revalidatePath(`/dashboard/sites/${product.websiteId}/products/${id}`)
    return { success: true }
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to update product. Please try again.",
    }
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        websiteId: true,
      },
    })

    if (!product) {
      return {
        success: false,
        error: "Product not found.",
      }
    }

    await prisma.product.delete({
      where: {
        id,
      },
    })

    revalidatePath(`/dashboard/sites/${product.websiteId}/products`)
    return { success: true }
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to delete product. Please try again.",
    }
  }
}
