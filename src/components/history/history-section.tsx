import Section from "@/components/section"
import HistoryTimeline from "@/components/history/history-timeline"

export default function HistorySection() {
  return (
    <Section
      id="history"
      className="min-h-0 items-stretch justify-start px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <HistoryTimeline />
      </div>
    </Section>
  )
}
