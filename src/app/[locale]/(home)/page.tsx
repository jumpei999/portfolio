import About from "@/components/about/about-section"
import ConstituentsClient from "@/components/constituents/constituents-client"
import ConstituentsSeo from "@/components/constituents/constituents-seo"
import ContactSection from "@/components/contact/contact-section"
import Footer from "@/components/footer"
import History from "@/components/history/history-section"
import Hero from "@/components/hero"
import Section from "@/components/section"
import { routing } from "@/i18n/routing"
import {
  MOBILE_BOTTOM_CLEARANCE,
  SECTION_VIEWPORT_HEIGHT,
} from "@/lib/section-shell"
import { cn } from "@/lib/utils"
import { setRequestLocale } from "next-intl/server"

type PageProps = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function Home({ params }: Readonly<PageProps>) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main id="main" tabIndex={-1} className="flex flex-col outline-none">
      <div className={cn(MOBILE_BOTTOM_CLEARANCE, "flex flex-col md:pb-0")}>
        <Hero />
        <About />
        <History />
        <Section
          id="constituents"
          className={cn(
            "relative min-h-0 items-stretch justify-stretch overflow-hidden p-0",
            SECTION_VIEWPORT_HEIGHT,
          )}
        >
          <ConstituentsSeo />
          <ConstituentsClient />
        </Section>
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
