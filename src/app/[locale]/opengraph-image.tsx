import { getTranslations, setRequestLocale } from "next-intl/server"
import { ImageResponse } from "next/og"
import { routing } from "@/i18n/routing"
import OgLogoMark from "@/lib/og/og-logo-mark"
import { loadOgFonts } from "@/lib/og/load-og-fonts"

export const alt = "JPK Engineering"
export const size = { width: 1200, height: 630 }
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
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          color: "#334155",
        }}
      >
        <OgLogoMark width={448} height={448} />
        <div
          style={{
            fontFamily: "Montserrat",
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: "6px",
            marginTop: 24,
          }}
        >
          {primaryMessage}
        </div>
        <div
          style={{
            fontFamily: "Montserrat",
            fontSize: 16,
            fontWeight: 300,
            letterSpacing: "1.6px",
            marginTop: "8px",
          }}
        >
          {secondaryMessage}
        </div>
      </div>
    </div>,
    { ...size, fonts },
  )
}
