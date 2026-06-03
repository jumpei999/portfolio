"use client"

import { useTranslations } from "next-intl"
import type { IconType } from "react-icons"
import { HiOutlineEnvelope } from "react-icons/hi2"
import { SiBluesky, SiGithub, SiInstagram } from "react-icons/si"
import { SOCIAL_LINKS, type SocialLinkKey } from "@/data/social-links"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function getIcon(key: SocialLinkKey): IconType {
  switch (key) {
    case "github":
      return SiGithub
    case "bluesky":
      return SiBluesky
    case "instagram":
      return SiInstagram
    case "email":
      return HiOutlineEnvelope
  }
}

export default function SocialLinks() {
  const t = useTranslations("about")

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        {t("links.label")}
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {SOCIAL_LINKS.map((link) => {
          const Icon = getIcon(link.key)
          const title = t(`links.${link.key}`)

          return (
            <Tooltip key={link.key}>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon-sm">
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
                    <Icon className="size-4" aria-hidden />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{title}</TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}
