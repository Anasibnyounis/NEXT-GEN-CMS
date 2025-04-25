"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { z } from "zod"

const websiteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  theme: z.string().default("default"),
})

export async function getWebsites() {
  try {
    const websites = await prisma.website.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })
    return websites
  } catch (error) {
    console.error("Error fetching websites:", error)
    return []
  }
}

// Add this function to fix the missing export
export async function getWebsite(id: string) {
  try {
    const website = await prisma.website.findUnique({
      where: {
        id,
      },
      include: {
        pages: true,
      },
    })
    return website
  } catch (error) {
    console.error(`Error fetching website with ID ${id}:`, error)
    return null
  }
}

export async function getWebsiteById(id: string) {
  try {
    const website = await prisma.website.findUnique({
      where: {
        id,
      },
    })
    return website
  } catch (error) {
    console.error(`Error fetching website with ID ${id}:`, error)
    return null
  }
}

export async function createWebsite(formData: FormData) {
  const validatedFields = websiteSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    theme: formData.get("theme"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, description, theme } = validatedFields.data

  try {
    // Get the user ID from the session
    // For now, we'll use the admin user ID
    const userId = "usr_admin"

    const website = await prisma.website.create({
      data: {
        name,
        description: description || "",
        theme,
        status: "DRAFT",
        userId,
      },
    })

    revalidatePath("/dashboard")
    return { success: true, websiteId: website.id }
  } catch (error) {
    console.error("Error creating website:", error)
    return {
      success: false,
      error: "Failed to create website. Please try again.",
    }
  }
}

export async function updateWebsite(id: string, formData: FormData) {
  const validatedFields = websiteSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    theme: formData.get("theme"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, description, theme } = validatedFields.data

  try {
    await prisma.website.update({
      where: {
        id,
      },
      data: {
        name,
        description: description || "",
        theme,
      },
    })

    revalidatePath(`/dashboard/sites/${id}`)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error(`Error updating website with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to update website. Please try again.",
    }
  }
}

export async function updateWebsiteStatus(id: string, status: "PUBLISHED" | "DRAFT") {
  try {
    await prisma.website.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })

    revalidatePath(`/dashboard/sites/${id}`)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error(`Error updating status for website with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to update website status. Please try again.",
    }
  }
}

export async function deleteWebsite(id: string) {
  try {
    // Delete all related records first
    await prisma.$transaction([
      prisma.formSubmission.deleteMany({
        where: {
          form: {
            websiteId: id,
          },
        },
      }),
      prisma.form.deleteMany({
        where: {
          websiteId: id,
        },
      }),
      prisma.plugin.deleteMany({
        where: {
          websiteId: id,
        },
      }),
      prisma.page.deleteMany({
        where: {
          websiteId: id,
        },
      }),
      prisma.product.deleteMany({
        where: {
          websiteId: id,
        },
      }),
      prisma.website.delete({
        where: {
          id,
        },
      }),
    ])

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error(`Error deleting website with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to delete website. Please try again.",
    }
  }
}
