import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { DialogFooter } from '@/components/ui/dialog'

export default function CategoryForm({ onSubmit, initialData = {}, onReset }) {
  const [formData, setFormData] = useState({
    name: '',
    attribute1: '',
    attribute2: '',
    attribute3: '',
    attribute4: '',
    attribute5: '',
    attribute6: '',
    status: 'active',
    ...initialData
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleReset = () => {
    setFormData(initialData)
    onReset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="space-y-2">
            <Label htmlFor={`attribute${num}`}>Attribute {num}</Label>
            <Input
              id={`attribute${num}`}
              name={`attribute${num}`}
              placeholder={`Enter attribute ${num}`}
              value={formData[`attribute${num}`]}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <Separator className="my-6" />
      <DialogFooter>
        <div className="flex justify-between w-full">
          <Button type="button" variant="outline" onClick={() => onReset()}>
            Cancel
          </Button>
          <div className="space-x-2">
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </DialogFooter>
    </form>
  )
}

