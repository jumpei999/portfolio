"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { useSyncExternalStore } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
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
            <span className="text-slate-400" aria-hidden>
              |
            </span>
          )}
          <Link
            href={`${pathname}${hash}`}
            locale={code}
            className={cn(
              "px-1.5 py-0.5 transition-colors",
              locale === code
                ? "font-bold"
                : "text-slate-500 hover:text-slate-700",
            )}
            aria-current={locale === code ? "true" : undefined}
            hrefLang={code}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  )
}

export default function Header() {
  const t = useTranslations("nav")

  return (
    <header className="fixed top-0 z-40 w-full">
      <nav className="mx-auto flex w-3/4 items-center justify-between">
        <Link
          href="/"
          className="flex items-center py-2"
          aria-label={t("logoAria")}
        >
          <Image
            src="/logo-text-lg.svg"
            alt={t("logoAlt")}
            width={512}
            height={512}
            priority
            className="h-12 w-auto"
            aria-hidden
          />
        </Link>
        <div className="flex items-center gap-2">
          <ul className="flex">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.key}
                className="px-4 py-4 transition-colors duration-400 ease-in-out hover:bg-slate-500 hover:text-slate-50"
              >
                <Link href={item.href}>{t(item.key)}</Link>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  )
}
