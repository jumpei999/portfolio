import { getTranslations, setRequestLocale } from "next-intl/server"
import { ImageResponse } from "next/og"
import { routing } from "@/i18n/routing"

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
  const t = await getTranslations({ locale, namespace: "metadata" })

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          backgroundColor: "#f8fafc",
          color: "#334155",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          {t("title")}
        </div>
        <div
          style={{
            fontSize: 36,
            lineHeight: 1.4,
            maxWidth: 900,
            color: "#64748b",
          }}
        >
          {t("description")}
        </div>
      </div>
    ),
    { ...size },
  )
}
