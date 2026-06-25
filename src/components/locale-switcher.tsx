"use client"

import { useCallback } from "react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import type { Locale } from "@/i18n/routing"

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const t = useTranslations("nav")
  const pathname = usePathname()
  const router = useRouter()

  const handleSwitch = useCallback(
    (targetLocale: Locale) => {
      router.replace(pathname, { locale: targetLocale })
      globalThis.scrollTo({ top: 0, behavior: "auto" })
    },
    [pathname, router],
  )

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
          {locale === code ? (
            <span
              aria-current="true"
              className={cn(
                buttonVariants({ variant: "secondary", size: "xs" }),
                "inline-flex h-6 px-2 text-xs font-semibold",
              )}
            >
              {label}
            </span>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              className="h-6 px-2 text-xs"
              onClick={() => handleSwitch(code)}
            >
              {label}
            </Button>
          )}
        </span>
      ))}
    </div>
  )
}
