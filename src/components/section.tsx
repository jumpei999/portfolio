import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  readonly id?: string
  readonly children: ReactNode
  readonly className?: string
}

export default function Section({
  id,
  children,
  className,
}: Readonly<SectionProps>) {
  return (
    <div
      {...(id ? { id } : {})}
      className={cn("min-h-svh flex items-center justify-center", className)}
    >
      {children}
    </div>
  )
}
