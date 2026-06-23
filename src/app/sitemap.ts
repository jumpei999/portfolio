import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { getAbsoluteLocalizedUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routing.locales.map((locale) => ({
    url: getAbsoluteLocalizedUrl(locale),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((alternateLocale) => [
          alternateLocale,
          getAbsoluteLocalizedUrl(alternateLocale),
        ]),
      ),
    },
  }))
}
