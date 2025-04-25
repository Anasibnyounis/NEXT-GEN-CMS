"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  fields: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Field name is required"),
      label: z.string().min(1, "Field label is required"),
      type: z.enum(["text", "email", "number", "textarea", "select", "checkbox", "radio"]),
      required: z.boolean().default(false),
      placeholder: z.string().optional(),
      options: z.array(z.string()).optional(),
    }),
  ),
})

export async function getForms(websiteId: string) {
  try {
    const forms = await prisma.form.findMany({
      where: {
        websiteId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
    return forms
  } catch (error) {
    console.error(`Error fetching forms for website ${websiteId}:`, error)
    return []
  }
}

// Add this function to fix the missing export
export async function getForm(websiteId: string, formId: string) {
  try {
    const form = await prisma.form.findFirst({
      where: {
        id: formId,
        websiteId,
      },
    })
    return form
  } catch (error) {
    console.error(`Error fetching form with ID ${formId}:`, error)
    return null
  }
}

export async function getFormById(id: string) {
  try {
    const form = await prisma.form.findUnique({
      where: {
        id,
      },
    })
    return form
  } catch (error) {
    console.error(`Error fetching form with ID ${id}:`, error)
    return null
  }
}

export async function getFormSubmissions(formId: string) {
  try {
    const submissions = await prisma.formSubmission.findMany({
      where: {
        formId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return submissions
  } catch (error) {
    console.error(`Error fetching submissions for form ${formId}:`, error)
    return []
  }
}

export async function createForm(websiteId: string, formData: FormData) {
  const fieldsJson = formData.get("fields") as string
  const fields = JSON.parse(fieldsJson || "[]")

  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    fields,
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, fields: validatedFormFields } = validatedFields.data

  try {
    const form = await prisma.form.create({
      data: {
        name,
        fields: validatedFormFields,
        websiteId,
      },
    })

    revalidatePath(`/dashboard/sites/${websiteId}/forms`)
    return { success: true, formId: form.id }
  } catch (error) {
    console.error("Error creating form:", error)
    return {
      success: false,
      error: "Failed to create form. Please try again.",
    }
  }
}

export async function updateForm(id: string, formData: FormData) {
  const fieldsJson = formData.get("fields") as string
  const fields = JSON.parse(fieldsJson || "[]")

  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    fields,
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, fields: validatedFormFields } = validatedFields.data

  try {
    const form = await prisma.form.findUnique({
      where: {
        id,
      },
      select: {
        websiteId: true,
      },
    })

    if (!form) {
      return {
        success: false,
        error: "Form not found.",
      }
    }

    await prisma.form.update({
      where: {
        id,
      },
      data: {
        name,
        fields: validatedFormFields,
      },
    })

    revalidatePath(`/dashboard/sites/${form.websiteId}/forms`)
    revalidatePath(`/dashboard/sites/${form.websiteId}/forms/${id}`)
    return { success: true }
  } catch (error) {
    console.error(`Error updating form with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to update form. Please try again.",
    }
  }
}

export async function deleteForm(id: string) {
  try {
    const form = await prisma.form.findUnique({
      where: {
        id,
      },
      select: {
        websiteId: true,
      },
    })

    if (!form) {
      return {
        success: false,
        error: "Form not found.",
      }
    }

    // Delete all submissions first
    await prisma.formSubmission.deleteMany({
      where: {
        formId: id,
      },
    })

    await prisma.form.delete({
      where: {
        id,
      },
    })

    revalidatePath(`/dashboard/sites/${form.websiteId}/forms`)
    return { success: true }
  } catch (error) {
    console.error(`Error deleting form with ID ${id}:`, error)
    return {
      success: false,
      error: "Failed to delete form. Please try again.",
    }
  }
}

export async function submitFormData(formId: string, data: Record<string, any>) {
  try {
    await prisma.formSubmission.create({
      data: {
        formId,
        data,
      },
    })

    return { success: true }
  } catch (error) {
    console.error(`Error submitting form data for form ${formId}:`, error)
    return {
      success: false,
      error: "Failed to submit form. Please try again.",
    }
  }
}
