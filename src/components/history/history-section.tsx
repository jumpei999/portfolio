import Section from "@/components/section"
import HistoryTimeline from "@/components/history/history-timeline"
import { SECTION_PB, SECTION_PX } from "@/lib/section-shell"
import { cn } from "@/lib/utils"

export default function HistorySection() {
  return (
    <Section
      id="history"
      className={cn(
        "min-h-0 items-stretch justify-start",
        SECTION_PX,
        SECTION_PB,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <HistoryTimeline />
      </div>
    </Section>
  )
}
