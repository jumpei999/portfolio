"use client"

import { useTranslations } from "next-intl"
import { BsLightningFill } from "react-icons/bs"
import {
  FOOTER_ICON_BUTTON_CLASS,
  FOOTER_ICON_CLASS,
} from "@/components/footer/footer-icon-styles"
import {
  FOOTER_TOOLTIP_OFFSET,
  FOOTER_TOOLTIP_SIDE,
} from "@/components/footer/footer-tooltip"
import SiteTechStackIcons from "@/components/footer/site-tech-stack-icons"
import SocialIconLinks from "@/components/social-icon-links"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { scrollToHome } from "@/lib/scroll-to-home"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <div className="relative overflow-x-clip">
      <Link
        href="#home"
        onClick={scrollToHome}
        aria-label={t("backToTopAria")}
        className={cn(
          "peer/backToTop absolute left-1/2 top-0 z-30 -translate-x-1/2 translate-y-[-40%]",
          "inline-flex size-12 items-center justify-center rounded-full sm:size-14",
          "border-2 border-foreground bg-foreground text-background",
          "transition-transform duration-300 hover:scale-105",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background",
        )}
      >
        <BsLightningFill
          className="size-7 -translate-x-0.5 -translate-y-0.5 rotate-180 text-background sm:size-8"
          aria-hidden
        />
      </Link>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-full z-5 overflow-hidden",
          "peer-hover/backToTop:[&>div]:translate-y-0",
          "peer-focus-visible/backToTop:[&>div]:translate-y-0",
        )}
      >
        <div
          className={cn(
            "w-full translate-y-full bg-footer-elevated",
            "px-8 py-10 transition-transform duration-300 ease-out sm:px-12 sm:py-14",
            "motion-reduce:transition-none",
          )}
        >
          <p
            className={cn(
              "mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-background",
              "sm:text-4xl",
            )}
          >
            {t("backToTopHover")}
          </p>
        </div>
      </div>

      <footer className="relative z-10 bg-foreground text-background">
        <div
          className={cn(
            "mx-auto w-3/4 py-4",
            "min-h-12 sm:min-h-14",
          )}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <SiteTechStackIcons />
            <SocialIconLinks
              className="shrink-0"
              buttonSize="icon"
              iconClassName={FOOTER_ICON_CLASS}
              buttonClassName={FOOTER_ICON_BUTTON_CLASS}
              tooltipSide={FOOTER_TOOLTIP_SIDE}
              tooltipSideOffset={FOOTER_TOOLTIP_OFFSET}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
