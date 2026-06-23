import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Montserrat, M_PLUS_Rounded_1c } from "next/font/google"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import "../globals.css"
import Header from "@/components/header"
import MobileBottomNav from "@/components/header/mobile-bottom-nav"
import ThemeScript from "@/components/theme-script"
import { Toaster } from "@/components/ui/sonner"
import { routing } from "@/i18n/routing"
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

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        ja: "/",
        en: "/en",
      },
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
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`flex min-h-full flex-col font-sans ${mPlusRounded1c.variable} ${montserrat.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <TooltipProvider delayDuration={150}>
            <Header />
            {children}
            <MobileBottomNav />
            <Toaster position="top-center" offset="calc(var(--site-header-height) + 0.5rem)" />
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
