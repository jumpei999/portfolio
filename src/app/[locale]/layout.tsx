import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Montserrat, M_PLUS_Rounded_1c } from "next/font/google"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"
import "../globals.css"
import Header from "@/components/header"
import SkipToMain from "@/components/skip-to-main"
import MobileBottomNav from "@/components/header/mobile-bottom-nav"
import SiteJsonLd from "@/components/seo/site-json-ld"
import { ThemeProvider } from "@/components/theme-provider"
import { routing } from "@/i18n/routing"
import {
  getAbsoluteLocalizedUrl,
  getLocalizedPath,
  getSiteUrl,
} from "@/lib/site-url"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
})

const mPlusRounded1c = M_PLUS_Rounded_1c({
  variable: "--font-m-plus-rounded-1c",
  subsets: ["latin"],
  weight: ["400", "700"],
})

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const siteUrl = getSiteUrl()
  const canonicalPath = getLocalizedPath(locale)
  const openGraphLocale = locale === "ja" ? "ja_JP" : "en_US"
  const alternateOpenGraphLocale = locale === "ja" ? "en_US" : "ja_JP"

  return {
    metadataBase: siteUrl,
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalPath,
      languages: {
        ja: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      type: "website",
      url: getAbsoluteLocalizedUrl(locale),
      siteName: t("title"),
      locale: openGraphLocale,
      alternateLocale: [alternateOpenGraphLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LayoutProps>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className="h-full"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={`flex min-h-full flex-col font-sans ${mPlusRounded1c.variable} ${montserrat.variable}`}
      >
        <ThemeProvider>
          <SiteJsonLd locale={locale} />
          <NextIntlClientProvider messages={messages}>
            <TooltipProvider delayDuration={150}>
              <SkipToMain />
              <Header />
              {children}
              <MobileBottomNav />
              <Toaster
                position="top-center"
                offset="calc(var(--site-header-height) + 0.5rem)"
              />
              <Analytics />
            </TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
