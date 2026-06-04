"use client"

import { useLocale, useTranslations } from "next-intl"
import { LogoTextLg } from "@/components/brand/logo-text-lg"
import { useSyncExternalStore } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/i18n/routing"

const NAV_ITEMS = [
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "history", href: "#history" },
  { key: "constituents", href: "#constituents" },
  { key: "contact", href: "#contact" },
] as const

function useHash() {
  return useSyncExternalStore(
    (onStoreChange) => {
      globalThis.addEventListener("hashchange", onStoreChange)
      return () => globalThis.removeEventListener("hashchange", onStoreChange)
    },
    () => globalThis.location.hash,
    () => "",
  )
}

function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const t = useTranslations("nav")
  const pathname = usePathname()
  const hash = useHash()

  const locales: { code: Locale; label: string }[] = [
    { code: "ja", label: t("localeJa") },
    { code: "en", label: t("localeEn") },
  ]

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map(({ code, label }, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && (
            <span className="text-muted-foreground" aria-hidden>
              |
            </span>
          )}
          <Button
            asChild
            variant={locale === code ? "secondary" : "ghost"}
            size="xs"
            className={cn(
              "h-6 px-2 text-xs",
              locale === code && "font-semibold",
            )}
          >
            <Link
              href={`${pathname}${hash}`}
              locale={code}
              aria-current={locale === code ? "true" : undefined}
              hrefLang={code}
            >
              {label}
            </Link>
          </Button>
        </span>
      ))}
    </div>
  )
}

export default function Header() {
  const t = useTranslations("nav")

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex w-3/4 items-center justify-between">
        <Link
          href="/"
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
                  <Link href={item.href}>{t(item.key)}</Link>
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
