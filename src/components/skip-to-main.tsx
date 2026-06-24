"use client"

import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

export default function SkipToMain() {
  const t = useTranslations("nav")

  return (
    <a
      href="#main"
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50",
        "focus:rounded-none focus:border focus:border-border focus:bg-background",
        "focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:outline-none",
        "focus-visible:ring-1 focus-visible:ring-ring",
      )}
    >
      {t("skipToMain")}
    </a>
  )
}
