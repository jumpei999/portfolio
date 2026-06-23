import { getTranslations, setRequestLocale } from "next-intl/server"
import { getAbsoluteLocalizedUrl } from "@/lib/site-url"

type SiteJsonLdProps = Readonly<{
  locale: string
}>

export default async function SiteJsonLd({ locale }: SiteJsonLdProps) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "metadata" })
  const siteUrl = getAbsoluteLocalizedUrl(locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: t("title"),
        url: siteUrl,
        description: t("description"),
        inLanguage: locale,
      },
      {
        "@type": "Person",
        name: "JPK",
        url: siteUrl,
        jobTitle: t("jsonLd.jobTitle"),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
