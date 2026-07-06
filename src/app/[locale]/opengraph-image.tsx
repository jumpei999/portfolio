import { getTranslations, setRequestLocale } from "next-intl/server"
import { ImageResponse } from "next/og"
import { routing } from "@/i18n/routing"
import { loadOgFonts } from "@/lib/og/load-og-fonts"
import OgSplitBackground from "@/lib/og/og-split-background"
import OgSplitLogo from "@/lib/og/og-split-logo"
import OgSplitText from "@/lib/og/og-split-text"
import { OG_SIZE } from "@/lib/og/og-theme"

export const alt = "JPK Engineering"
export const size = OG_SIZE
export const contentType = "image/png"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [tHero, fonts] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    loadOgFonts(),
  ])

  const primaryMessage = tHero("primaryMessage").toUpperCase()
  const secondaryMessage = tHero("secondaryMessage").toUpperCase()

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        width: OG_SIZE.width,
        height: OG_SIZE.height,
      }}
    >
      <OgSplitBackground />
      <OgSplitText
        primaryMessage={primaryMessage}
        secondaryMessage={secondaryMessage}
      />
      <OgSplitLogo />
    </div>,
    { ...size, fonts },
  )
}
