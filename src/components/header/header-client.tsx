"use client"

import { useTranslations } from "next-intl"
import { LogoTextLg } from "@/components/brand/logo-text-lg"
import SiteNavLinks from "@/components/header/site-nav-links"
import LocaleSwitcher from "@/components/locale-switcher"
import { Link } from "@/i18n/navigation"
import { NAV_ITEMS } from "@/data/nav-items"
import { scrollToHome } from "@/lib/scroll-to-home"
import { cn } from "@/lib/utils"

function LogoHomeLink({ className }: Readonly<{ className?: string }>) {
  const t = useTranslations("nav")

  return (
    <Link
      href="#home"
      onClick={scrollToHome}
      className={cn("flex items-center py-2", className)}
      aria-label={t("logoAria")}
    >
      <LogoTextLg className="h-8 w-auto md:h-12" aria-hidden />
    </Link>
  )
}

export default function HeaderClient() {
  const t = useTranslations("nav")

  return (
    <>
      <nav
        className="mx-auto grid w-full grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 md:hidden"
        aria-label={t("siteAria")}
      >
        <div aria-hidden />
        <LogoHomeLink className="justify-self-center" />
        <div className="flex justify-end">
          <LocaleSwitcher />
        </div>
      </nav>

      <nav
        className="mx-auto hidden w-3/4 items-center justify-between md:flex"
        aria-label={t("siteAria")}
      >
        <LogoHomeLink />
        <div className="flex items-center gap-3">
          <SiteNavLinks items={NAV_ITEMS} orientation="horizontal" />
          <LocaleSwitcher />
        </div>
      </nav>
    </>
  )
}
