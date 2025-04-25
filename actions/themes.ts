"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"

// Available themes
export const availableThemes = [
  {
    id: "default",
    name: "Default",
    description: "A clean, modern theme suitable for most websites",
    thumbnail: "/themes/default.png",
  },
  {
    id: "business",
    name: "Business",
    description: "Professional theme for corporate and business websites",
    thumbnail: "/themes/business.png",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Optimized for online stores with product showcases",
    thumbnail: "/themes/ecommerce.png",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work with this visually focused theme",
    thumbnail: "/themes/portfolio.png",
  },
  {
    id: "blog",
    name: "Blog",
    description: "Perfect for content-focused websites and blogs",
    thumbnail: "/themes/blog.png",
  },
]

export async function getAvailableThemes() {
  return availableThemes
}

export async function getWebsiteTheme(websiteId: string) {
  try {
    const website = await prisma.website.findUnique({
      where: {
        id: websiteId,
      },
      select: {
        theme: true,
      },
    })

    if (!website) {
      return null
    }

    const theme = availableThemes.find((t) => t.id === website.theme) || availableThemes[0]
    return theme
  } catch (error) {
    console.error(`Error fetching theme for website ${websiteId}:`, error)
    return availableThemes[0]
  }
}

export async function updateWebsiteTheme(websiteId: string, themeId: string) {
  try {
    // Validate that the theme exists
    const themeExists = availableThemes.some((t) => t.id === themeId)

    if (!themeExists) {
      return {
        success: false,
        error: "Invalid theme selected.",
      }
    }

    await prisma.website.update({
      where: {
        id: websiteId,
      },
      data: {
        theme: themeId,
      },
    })

    revalidatePath(`/dashboard/sites/${websiteId}/settings`)
    return { success: true }
  } catch (error) {
    console.error(`Error updating theme for website ${websiteId}:`, error)
    return {
      success: false,
      error: "Failed to update theme. Please try again.",
    }
  }
}
