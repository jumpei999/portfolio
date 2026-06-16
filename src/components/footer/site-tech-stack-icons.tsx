"use client"

import { useTranslations } from "next-intl"
import SiteTechStackIconItem from "@/components/footer/site-tech-stack-icon-item"
import { SITE_TECH_STACK } from "@/data/site-tech-stack"
import { cn } from "@/lib/utils"

type SiteTechStackIconsProps = Readonly<{
  className?: string
}>

export default function SiteTechStackIcons({
  className,
}: SiteTechStackIconsProps) {
  const t = useTranslations("footer")

  return (
    <ul
      className={cn("flex flex-wrap items-center gap-1", className)}
      aria-label={t("techStackAria")}
    >
      {SITE_TECH_STACK.map((item) => (
        <SiteTechStackIconItem key={item.slug} item={item} />
      ))}
    </ul>
  )
}
