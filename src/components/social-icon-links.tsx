"use client"

import { useTranslations } from "next-intl"
import type { IconType } from "react-icons"
import { SiBluesky, SiGithub, SiInstagram, SiGmail } from "react-icons/si"
import { SOCIAL_LINKS, type SocialLinkKey } from "@/data/social-links"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

function getIcon(key: SocialLinkKey): IconType {
  switch (key) {
    case "github":
      return SiGithub
    case "bluesky":
      return SiBluesky
    case "instagram":
      return SiInstagram
    case "email":
      return SiGmail
  }
}

type SocialIconLinksProps = Readonly<{
  showLabel?: boolean
  className?: string
  iconClassName?: string
  buttonClassName?: string
  buttonSize?: "icon-sm" | "icon"
  tooltipSide?: "top" | "right" | "bottom" | "left"
  tooltipSideOffset?: number
}>

const defaultIconClassName =
  "size-4 text-muted-foreground transition-colors group-hover/button:text-foreground"

export default function SocialIconLinks({
  showLabel = false,
  className,
  iconClassName = defaultIconClassName,
  buttonClassName,
  buttonSize = "icon-sm",
  tooltipSide = "bottom",
  tooltipSideOffset = 0,
}: SocialIconLinksProps) {
  const t = useTranslations("about")

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {showLabel && (
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          {t("links.label")}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-1">
        {SOCIAL_LINKS.map((link) => {
          const Icon = getIcon(link.key)
          const title = t(`links.${link.key}`)

          return (
            <Tooltip key={link.key}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size={buttonSize}
                  className={buttonClassName}
                >
                  <a
                    href={link.href}
                    target={
                      link.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      link.href.startsWith("mailto:") ? undefined : "noreferrer"
                    }
                    aria-label={title}
                  >
                    <Icon className={iconClassName} aria-hidden />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side={tooltipSide} sideOffset={tooltipSideOffset}>
                {title}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}
