"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormBuilder } from "@/components/editor/form-builder"
import { getForm, updateForm, createForm } from "@/actions/forms"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

export default function FormEditorPage() {
  const params = useParams<{ siteId: string; formId: string }>()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formName, setFormName] = useState("")
  const [formFields, setFormFields] = useState<any[]>([])
  const isNewForm = params.formId === "new"

  useEffect(() => {
    const fetchForm = async () => {
      if (isNewForm) {
        setFormName("New Form")
        setFormFields([
          {
            id: uuidv4(),
            name: "name",
            label: "Full Name",
            type: "text",
            required: true,
            placeholder: "Enter your full name",
          },
          {
            id: uuidv4(),
            name: "email",
            label: "Email Address",
            type: "email",
            required: true,
            placeholder: "Enter your email address",
          },
          {
            id: uuidv4(),
            name: "message",
            label: "Message",
            type: "textarea",
            required: true,
            placeholder: "Your message here...",
          },
        ])
        return
      }

      try {
        const form = await getForm(params.siteId, params.formId)
        if (form) {
          setFormName(form.name)
          setFormFields(Array.isArray(form.fields) ? form.fields : JSON.parse(form.fields as string))
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load form. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchForm()
  }, [params.siteId, params.formId, isNewForm, toast])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const formData = {
        name: formName,
        fields: formFields,
      }

      let result
      if (isNewForm) {
        result = await createForm(params.siteId, formData)
      } else {
        result = await updateForm(params.siteId, params.formId, formData)
      }

      if (result.success) {
        toast({
          title: isNewForm ? "Form created" : "Form updated",
          description: isNewForm
            ? "Your new form has been created successfully."
            : "Your form has been updated successfully.",
        })

        if (isNewForm && result.formId) {
          router.push(`/dashboard/sites/${params.siteId}/forms/${result.formId}`)
        }
      } else {
        toast({
          title: "Error",
          description:
            typeof result.error === "string"
              ? result.error
              : "Failed to save form. Please check the form and try again.",
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
    router.push(`/dashboard/sites/${params.siteId}/forms`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isNewForm ? "Create Form" : "Edit Form"}</h1>
            <p className="text-muted-foreground mt-2">
              {isNewForm ? "Create a new form for your website" : "Edit your form and its fields"}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Form"}
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr,300px]">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Form Fields</CardTitle>
              <CardDescription>Add and arrange fields for your form</CardDescription>
            </CardHeader>
            <CardContent>
              <FormBuilder fields={formFields} onChange={setFormFields} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>This is how your form will appear to users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 space-y-4">
                {formFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={`preview-${field.name}`}>
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>

                    {field.type === "text" || field.type === "email" ? (
                      <Input id={`preview-${field.name}`} type={field.type} placeholder={field.placeholder} disabled />
                    ) : field.type === "textarea" ? (
                      <textarea
                        id={`preview-${field.name}`}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={field.placeholder}
                        disabled
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={`preview-${field.name}`}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option: string, i: number) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "checkbox" ? (
                      <div className="flex items-center space-x-2">
                        <input
                          id={`preview-${field.name}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          disabled
                        />
                        <label htmlFor={`preview-${field.name}`} className="text-sm text-gray-700">
                          {field.placeholder || "Checkbox option"}
                        </label>
                      </div>
                    ) : field.type === "radio" ? (
                      <div className="space-y-2">
                        {field.options?.map((option: string, i: number) => (
                          <div key={i} className="flex items-center space-x-2">
                            <input
                              id={`preview-${field.name}-${i}`}
                              name={`preview-${field.name}`}
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              disabled
                            />
                            <label htmlFor={`preview-${field.name}-${i}`} className="text-sm text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}

                <Button className="w-full" disabled>
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
              <CardDescription>Configure your form settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="form-name">Form Name</Label>
                <Input
                  id="form-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contact Form"
                />
                <p className="text-xs text-muted-foreground">
                  This name is for your reference only and won't be shown to users
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading} className="w-full">
                {isLoading ? "Saving..." : "Save Form"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
