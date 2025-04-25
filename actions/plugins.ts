"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { z } from "zod"

const pluginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  enabled: z.boolean().default(false),
  config: z.record(z.any()).optional(),
})

export async function getPlugins(websiteId: string) {
  try {
    const plugins = await prisma.plugin.findMany({
      where: {
        websiteId,
      },
      orderBy: {
        name: "asc",
      },
    })
    return plugins
  } catch (error) {
    console.error(`Error fetching plugins for website ${websiteId}:`, error)
    return []
  }
}

export async function getPluginById(id: string) {
  try {
    const plugin = await prisma.plugin.findUnique({
      where: {
        id,
      },
    })
    return plugin
  } catch (error) {
    console.error(`Error fetching plugin with ID ${id}:`, error)
    return null
  }
}

export async function createPlugin(websiteId: string, formData: FormData) {
  const configJson = formData.get("config") as string
  const config = JSON.parse(configJson || "{}")

  const validatedFields = pluginSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    enabled: formData.get("enabled") === "true",
    config,
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, description, enabled, config: validatedConfig } = validatedFields.data

  try {
    const plugin = await prisma.plugin.create({
      data: {
        name,
        description: description || "",
        enabled,
        config: validatedConfig || {},
        websiteId,
      },
    })

    revalidatePath(`/dashboard/sites/${websiteId}/plugins`)
    return { success: true, pluginId: plugin.id }
  } catch (error) {
    console.error("Error creating plugin:", error)
    return {
      success: false,
      error: "Failed to create plugin. Please try again.",
    }
  }
}

export async function updatePlugin(id: string, formData: FormData) {
  const configJson = formData.get("config") as string
  const config = JSON.parse(configJson || "{}")

  const validatedFields = pluginSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    enabled: formData.get("enabled") === "true",
    config,
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, description, enabled, config: validatedConfig } = validatedFields.data

  try {
    const plugin = await prisma.plugin.findUnique({
      where: {
        id,
      },
      select: {
        websiteId: true,
      },
    })

    if (!plugin) {
      return {
        success: false,
        error: "Plugin not found.",
      }
    }

    await prisma.plugin.update({
      where: {
        id,
      },
      data: {
        name,
        description: description || "",
        enabled,
        config: validatedConfig || {},
      },
    })

    revalidatePath(`/dashboard/sites/${plugin.websiteId}/plugins`)
    return { success: true }
  } catch (error) {
    console.error(`Error updating plugin with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to update plugin. Please try again.",
    }
  }
}

export async function togglePluginStatus(id: string, enabled: boolean) {
  try {
    const plugin = await prisma.plugin.findUnique({
      where: {
        id,
      },
      select: {
        websiteId: true,
      },
    })

    if (!plugin) {
      return {
        success: false,
        error: "Plugin not found.",
      }
    }

    await prisma.plugin.update({
      where: {
        id,
      },
      data: {
        enabled,
      },
    })

    revalidatePath(`/dashboard/sites/${plugin.websiteId}/plugins`)
    return { success: true }
  } catch (error) {
    console.error(`Error toggling status for plugin with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to update plugin status. Please try again.",
    }
  }
}

export async function deletePlugin(id: string) {
  try {
    const plugin = await prisma.plugin.findUnique({
      where: {
        id,
      },
      select: {
        websiteId: true,
      },
    })

    if (!plugin) {
      return {
        success: false,
        error: "Plugin not found.",
      }
    }

    await prisma.plugin.delete({
      where: {
        id,
      },
    })

    revalidatePath(`/dashboard/sites/${plugin.websiteId}/plugins`)
    return { success: true }
  } catch (error) {
    console.error(`Error deleting plugin with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to delete plugin. Please try again.",
    }
  }
}
