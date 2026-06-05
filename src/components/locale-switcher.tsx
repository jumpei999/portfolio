"use client"

import { useSyncExternalStore } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/i18n/routing"

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

export default function LocaleSwitcher() {
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
