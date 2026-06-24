import Section from "@/components/section"
import HistoryClient from "@/components/history/history-client"
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
      <HistoryClient />
    </Section>
  )
}
