import Section from "@/components/section"
import HistoryTimeline from "@/components/history/history-timeline"
import { getTranslations } from "next-intl/server"

export default async function HistorySection() {
  const t = await getTranslations("history")

  return (
    <Section
      id="history"
      className="min-h-0 items-stretch justify-start px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10 sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </h2>
        </header>

        <HistoryTimeline />
      </div>
    </Section>
  )
}
