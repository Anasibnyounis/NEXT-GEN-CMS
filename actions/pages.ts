"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { z } from "zod"

const pageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  isHome: z.boolean().default(false),
  content: z.any(),
})

export async function getPages(websiteId: string) {
  try {
    const pages = await prisma.page.findMany({
      where: {
        websiteId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
    return pages
  } catch (error) {
    console.error(`Error fetching pages for website ${websiteId}:`, error)
    return []
  }
}

export async function getPageById(id: string) {
  try {
    const page = await prisma.page.findUnique({
      where: {
        id,
      },
    })
    return page
  } catch (error) {
    console.error(`Error fetching page with ID ${id}:`, error)
    return null
  }
}

export async function getPageBySlug(websiteId: string, slug: string) {
  try {
    const page = await prisma.page.findFirst({
      where: {
        websiteId,
        slug,
      },
    })
    return page
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error)
    return null
  }
}

export async function createPage(websiteId: string, formData: FormData) {
  const validatedFields = pageSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    isHome: formData.get("isHome") === "true",
    content: JSON.parse((formData.get("content") as string) || "{}"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { title, slug, description, isHome, content } = validatedFields.data

  try {
    // If this is set as home page, unset any existing home page
    if (isHome) {
      await prisma.page.updateMany({
        where: {
          websiteId,
          isHome: true,
        },
        data: {
          isHome: false,
        },
      })
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        description: description || "",
        isHome,
        content,
        websiteId,
      },
    })

    revalidatePath(`/dashboard/sites/${websiteId}/pages`)
    return { success: true, pageId: page.id }
  } catch (error) {
    console.error("Error creating page:", error)
    return {
      success: false,
      error: "Failed to create page. Please try again.",
    }
  }
}

export async function updatePage(id: string, formData: FormData) {
  const validatedFields = pageSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    isHome: formData.get("isHome") === "true",
    content: JSON.parse((formData.get("content") as string) || "{}"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { title, slug, description, isHome, content } = validatedFields.data

  try {
    const page = await prisma.page.findUnique({
      where: {
        id,
      },
      select: {
        websiteId: true,
      },
    })

    if (!page) {
      return {
        success: false,
        error: "Page not found.",
      }
    }

    // If this is set as home page, unset any existing home page
    if (isHome) {
      await prisma.page.updateMany({
        where: {
          websiteId: page.websiteId,
          isHome: true,
          id: {
            not: id,
          },
        },
        data: {
          isHome: false,
        },
      })
    }

    await prisma.page.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        description: description || "",
        isHome,
        content,
      },
    })

    revalidatePath(`/dashboard/sites/${page.websiteId}/pages`)
    revalidatePath(`/dashboard/sites/${page.websiteId}/pages/${id}`)
    return { success: true }
  } catch (error) {
    console.error(`Error updating page with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to update page. Please try again.",
    }
  }
}

export async function deletePage(id: string) {
  try {
    const page = await prisma.page.findUnique({
      where: {
        id,
      },
      select: {
        websiteId: true,
      },
    })

    if (!page) {
      return {
        success: false,
        error: "Page not found.",
      }
    }

    await prisma.page.delete({
      where: {
        id,
      },
    })

    revalidatePath(`/dashboard/sites/${page.websiteId}/pages`)
    return { success: true }
  } catch (error) {
    console.error(`Error deleting page with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to delete page. Please try again.",
    }
  }
}
