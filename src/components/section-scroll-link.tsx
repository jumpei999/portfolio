"use client"

import { motion, useReducedMotion } from "motion/react"
import { BsLightningFill } from "react-icons/bs"
import { cn } from "@/lib/utils"

type SectionScrollLinkProps = {
  href: string
  label: string
  ariaLabel: string
  direction?: "up" | "down"
  className?: string
}

export default function SectionScrollLink({
  href,
  label,
  ariaLabel,
  direction = "down",
  className,
}: Readonly<SectionScrollLinkProps>) {
  const reduceMotion = useReducedMotion()
  const isUp = direction === "up"

  const icon = (
    <BsLightningFill
      className={cn("h-5 w-5", isUp && "rotate-180")}
      aria-hidden
    />
  )

  const labelEl = (
    <span className="text-xs tracking-widest uppercase">{label}</span>
  )

  return (
    <motion.a
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 transition-colors text-muted-foreground hover:text-foreground",
        className,
      )}
      aria-label={ariaLabel}
      animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {isUp ? (
        <>
          {icon}
          {labelEl}
        </>
      ) : (
        <>
          {labelEl}
          {icon}
        </>
      )}
    </motion.a>
  )
}
