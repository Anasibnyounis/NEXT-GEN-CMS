"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Grip, Trash2, Plus, Settings } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FormField {
  id: string
  name: string
  label: string
  type: string
  required: boolean
  placeholder?: string
  options?: string[]
}

interface FormBuilderProps {
  fields: FormField[]
  onChange: (fields: FormField[]) => void
}

export function FormBuilder({ fields, onChange }: FormBuilderProps) {
  const [editingField, setEditingField] = useState<FormField | null>(null)
  const [showFieldDialog, setShowFieldDialog] = useState(false)
  const [newOption, setNewOption] = useState("")

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(fields)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onChange(items)
  }

  const addField = (type: string) => {
    const newField: FormField = {
      id: uuidv4(),
      name: `field_${uuidv4().slice(0, 8)}`,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      required: false,
      placeholder: "",
      options: type === "select" || type === "radio" ? ["Option 1"] : undefined,
    }

    setEditingField(newField)
    setShowFieldDialog(true)
  }

  const saveField = () => {
    if (!editingField) return

    const isNew = !fields.some((field) => field.id === editingField.id)

    if (isNew) {
      onChange([...fields, editingField])
    } else {
      onChange(fields.map((field) => (field.id === editingField.id ? editingField : field)))
    }

    setEditingField(null)
    setShowFieldDialog(false)
  }

  const editField = (field: FormField) => {
    setEditingField({ ...field })
    setShowFieldDialog(true)
  }

  const deleteField = (id: string) => {
    onChange(fields.filter((field) => field.id !== id))
  }

  const addOption = () => {
    if (!editingField || !newOption) return

    setEditingField({
      ...editingField,
      options: [...(editingField.options || []), newOption],
    })
    setNewOption("")
  }

  const removeOption = (index: number) => {
    if (!editingField || !editingField.options) return

    const newOptions = [...editingField.options]
    newOptions.splice(index, 1)

    setEditingField({
      ...editingField,
      options: newOptions,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => addField("text")}>
          <Plus className="h-4 w-4 mr-1" /> Text
        </Button>
        <Button variant="outline" size="sm" onClick={() => addField("email")}>
          <Plus className="h-4 w-4 mr-1" /> Email
        </Button>
        <Button variant="outline" size="sm" onClick={() => addField("textarea")}>
          <Plus className="h-4 w-4 mr-1" /> Textarea
        </Button>
        <Button variant="outline" size="sm" onClick={() => addField("select")}>
          <Plus className="h-4 w-4 mr-1" /> Select
        </Button>
        <Button variant="outline" size="sm" onClick={() => addField("checkbox")}>
          <Plus className="h-4 w-4 mr-1" /> Checkbox
        </Button>
        <Button variant="outline" size="sm" onClick={() => addField("radio")}>
          <Plus className="h-4 w-4 mr-1" /> Radio
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="form-fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {fields.length === 0 && (
                <div className="border border-dashed rounded-lg p-8 text-center">
                  <h3 className="font-medium mb-2">No form fields yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add some fields to your form using the buttons above
                  </p>
                </div>
              )}

              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border rounded-lg p-3 bg-background flex items-center gap-3"
                    >
                      <div {...provided.dragHandleProps} className="cursor-move">
                        <Grip className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{field.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {field.type} {field.required && "(required)"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => editField(field)}>
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteField(field.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={showFieldDialog} onOpenChange={setShowFieldDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingField && fields.some((f) => f.id === editingField.id) ? "Edit Field" : "Add Field"}
            </DialogTitle>
            <DialogDescription>Configure the properties for this form field.</DialogDescription>
          </DialogHeader>

          {editingField && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="field-label">Label</Label>
                  <Input
                    id="field-label"
                    value={editingField.label}
                    onChange={(e) => setEditingField({ ...editingField, label: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field-name">Name (ID)</Label>
                  <Input
                    id="field-name"
                    value={editingField.name}
                    onChange={(e) => setEditingField({ ...editingField, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field-placeholder">Placeholder</Label>
                <Input
                  id="field-placeholder"
                  value={editingField.placeholder || ""}
                  onChange={(e) => setEditingField({ ...editingField, placeholder: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="field-required"
                  checked={editingField.required}
                  onCheckedChange={(checked) => setEditingField({ ...editingField, required: checked as boolean })}
                />
                <Label htmlFor="field-required">Required field</Label>
              </div>

              {(editingField.type === "select" || editingField.type === "radio") && (
                <div className="space-y-2">
                  <Label>Options</Label>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Field Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {editingField.options?.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(editingField.options || [])]
                              newOptions[index] = e.target.value
                              setEditingField({
                                ...editingField,
                                options: newOptions,
                              })
                            }}
                          />
                          <Button variant="ghost" size="icon" onClick={() => removeOption(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Add new option"
                          value={newOption}
                          onChange={(e) => setNewOption(e.target.value)}
                        />
                        <Button variant="outline" size="sm" onClick={addOption} disabled={!newOption}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFieldDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveField}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
