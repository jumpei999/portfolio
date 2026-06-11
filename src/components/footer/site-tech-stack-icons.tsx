"use client"

import { useTranslations } from "next-intl"
import type { IconType } from "react-icons"
import {
  SiFramer,
  SiNextdotjs,
  SiPnpm,
  SiRadixui,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import CursorIcon from "@/components/footer/cursor-icon"
import {
  FOOTER_ICON_BUTTON_CLASS,
  FOOTER_ICON_CLASS,
} from "@/components/footer/footer-icon-styles"
import {
  FOOTER_TOOLTIP_OFFSET,
  FOOTER_TOOLTIP_SIDE,
} from "@/components/footer/footer-tooltip"
import { SITE_TECH_STACK } from "@/data/site-tech-stack"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const CursorSiIcon: IconType = ({ className }) => (
  <CursorIcon className={className} />
)

const ICON_MAP: Record<string, IconType> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  shadcnui: SiShadcnui,
  radixui: SiRadixui,
  motion: SiFramer,
  pnpm: SiPnpm,
  cursor: CursorSiIcon,
}

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
      aria-label={t("techStackLabel")}
    >
      {SITE_TECH_STACK.map((item) => {
        const Icon = ICON_MAP[item.slug]

        if (!Icon) return null

        return (
          <li key={item.slug}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className={FOOTER_ICON_BUTTON_CLASS}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.name}
                  >
                    <Icon className={FOOTER_ICON_CLASS} aria-hidden />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side={FOOTER_TOOLTIP_SIDE}
                sideOffset={FOOTER_TOOLTIP_OFFSET}
              >
                {item.name}
              </TooltipContent>
            </Tooltip>
          </li>
        )
      })}
    </ul>
  )
}
