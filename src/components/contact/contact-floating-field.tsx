"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const underlineInputClass =
  "peer h-auto min-h-0 w-full rounded-none border-0 border-b-2 border-input bg-transparent px-0 py-2 text-sm shadow-none placeholder-transparent focus-visible:border-foreground focus-visible:ring-0 sm:text-base"

const underlineTextareaClass =
  "peer field-sizing-fixed min-h-0 w-full resize-none rounded-none border-0 border-b-2 border-input bg-transparent px-0 py-2 text-sm shadow-none placeholder-transparent focus-visible:border-foreground focus-visible:ring-0 sm:text-base"

const floatingLabelClass =
  "absolute left-0 top-2 pointer-events-none font-normal text-muted-foreground transition-all duration-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:-translate-x-0.5 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-translate-x-0.5"

const floatingMessageLabelClass = cn(
  floatingLabelClass,
  "peer-not-focus:peer-placeholder-shown:top-[calc(100%-30px)]",
  "md:peer-not-focus:peer-placeholder-shown:top-[calc(100%-26px)]",
)

type ContactFloatingFieldProps = Readonly<{
  id: string
  label: string
  name: string
  type?: string
  autoComplete?: string
  multiline?: boolean
  rows?: number
}>

export default function ContactFloatingField({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  multiline = false,
  rows = 4,
}: ContactFloatingFieldProps) {
  const labelClass = multiline ? floatingMessageLabelClass : floatingLabelClass

  return (
    <div className="relative group">
      {multiline ? (
        <Textarea
          id={id}
          name={name}
          required
          rows={rows}
          placeholder=" "
          className={underlineTextareaClass}
        />
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          required
          autoComplete={autoComplete}
          placeholder=" "
          className={underlineInputClass}
        />
      )}
      <Label htmlFor={id} className={cn(labelClass)}>
        {label}
      </Label>
    </div>
  )
}
