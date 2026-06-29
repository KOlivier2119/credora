"use client"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign } from "lucide-react"
import type { Control, FieldValues, Path } from "react-hook-form"
import { getLoanTypeConfig, type LoanFieldConfig } from "@/lib/loan-types"

interface LoanTypeFieldsProps<T extends FieldValues> {
  loanType: string
  control: Control<T>
  sectorPrefix?: string
}

function SectorField<T extends FieldValues>({
  field,
  control,
  name,
}: {
  field: LoanFieldConfig
  control: Control<T>
  name: Path<T>
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          {field.type === "select" ? (
            <Select onValueChange={formField.onChange} value={formField.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <FormControl>
              {field.type === "number" ? (
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    className="pl-10"
                    type="number"
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </div>
              ) : (
                <Input placeholder={field.placeholder} {...formField} />
              )}
            </FormControl>
          )}
          {field.description && <FormDescription>{field.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default function LoanTypeFields<T extends FieldValues>({
  loanType,
  control,
}: LoanTypeFieldsProps<T>) {
  const config = getLoanTypeConfig(loanType)
  if (!config) return null

  return (
    <div className="space-y-4 rounded-lg border border-blue-100 bg-blue-50/50 p-4">
      <h4 className="font-medium text-[#0a1525]">{config.name} — Additional Details</h4>
      <p className="text-sm text-gray-600">{config.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config.sectorFields.map((field) => (
          <SectorField
            key={field.name}
            field={field}
            control={control}
            name={`sectorDetails.${field.name}` as Path<T>}
          />
        ))}
      </div>
    </div>
  )
}
