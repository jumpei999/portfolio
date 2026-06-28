import type { Locale } from "@/i18n/routing"

export function resolveLocaleFromAcceptLanguage(
  acceptLanguage: string | null,
): Locale {
  if (!acceptLanguage) {
    return "en"
  }

  const primary = acceptLanguage.split(",")[0]?.trim().split(";")[0]?.trim()
  if (!primary) {
    return "en"
  }

  const language = primary.toLowerCase().split("-")[0]
  return language === "ja" ? "ja" : "en"
}
