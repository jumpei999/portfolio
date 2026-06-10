"use client"

import { useTranslations } from "next-intl"
import { BsLightningFill } from "react-icons/bs"
import SocialIconLinks from "@/components/social-icon-links"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <div className="relative overflow-x-clip">
      <Link
        href="/"
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
            "mx-auto flex w-full max-w-6xl flex-col items-center gap-1 px-6 py-4 sm:px-10",
            "min-h-12 sm:min-h-14",
            "md:min-h-14 md:flex-row md:items-center md:justify-between",
          )}
        >
          <p className="text-xs text-background sm:text-sm">
            {t("brand")}
          </p>
          <SocialIconLinks
            iconClassName="size-4 text-background/90 transition-opacity hover:opacity-100"
            buttonClassName="hover:bg-background/10 hover:text-background"
          />
        </div>
      </footer>
    </div>
  )
}
