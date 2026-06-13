"use client"

import { useTranslations } from "next-intl"
import { LogoTextLg } from "@/components/brand/logo-text-lg"
import LocaleSwitcher from "@/components/locale-switcher"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { NAV_ITEMS } from "@/data/nav-items"
import { scrollToHome } from "@/lib/scroll-to-home"

export default function Header() {
  const t = useTranslations("nav")

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex w-3/4 items-center justify-between">
        <Link
          href="#home"
          onClick={scrollToHome}
          className="flex items-center py-2"
          aria-label={t("logoAria")}
        >
          <LogoTextLg className="h-12 w-auto" aria-hidden />
        </Link>
        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.key} className="py-3">
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href={item.href}
                    {...(item.key === "home"
                      ? { onClick: scrollToHome }
                      : {})}
                  >
                    {t(item.key)}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  )
}
