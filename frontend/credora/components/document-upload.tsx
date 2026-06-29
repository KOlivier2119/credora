"use client"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X } from "lucide-react"
import type { DocumentUpload } from "@/lib/api"

interface DocumentUploadFieldProps {
  label: string
  documentType: string
  value?: DocumentUpload
  onChange: (doc: DocumentUpload | undefined) => void
  required?: boolean
}

export default function DocumentUploadField({
  label,
  documentType,
  value,
  onChange,
  required,
}: DocumentUploadFieldProps) {
  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      if (file.size > 5 * 1024 * 1024) {
        alert("File must be under 5MB")
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1]
        onChange({
          documentType,
          fileName: file.name,
          contentType: file.type || "application/octet-stream",
          contentBase64: base64,
        })
      }
      reader.readAsDataURL(file)
    },
    [documentType, onChange]
  )

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </div>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(undefined)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {value ? (
        <p className="text-sm text-green-600">Uploaded: {value.fileName}</p>
      ) : (
        <label className="flex items-center gap-2 cursor-pointer text-sm text-blue-600 hover:text-blue-800">
          <Upload className="h-4 w-4" />
          Choose file (PDF, JPG, PNG — max 5MB)
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} />
        </label>
      )}
    </div>
  )
}
