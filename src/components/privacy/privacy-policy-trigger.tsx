"use client"

import { useState, type ReactNode } from "react"
import PrivacyPolicyDialog from "@/components/privacy/privacy-policy-dialog"
import { cn } from "@/lib/utils"

type PrivacyPolicyTriggerProps = Readonly<{
  children: ReactNode
  className?: string
}>

export default function PrivacyPolicyTrigger({
  children,
  className,
}: PrivacyPolicyTriggerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit",
          className,
        )}
      >
        {children}
      </button>
      <PrivacyPolicyDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
