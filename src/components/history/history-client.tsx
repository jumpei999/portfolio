"use client"

import dynamic from "next/dynamic"
import { SECTION_VIEWPORT_HEIGHT } from "@/lib/section-shell"
import { cn } from "@/lib/utils"

const HistoryTimeline = dynamic(
  () => import("@/components/history/history-timeline"),
  {
    ssr: false,
    loading: () => (
      <div className={cn(SECTION_VIEWPORT_HEIGHT, "w-full")} aria-hidden />
    ),
  },
)

export default function HistoryClient() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <HistoryTimeline />
    </div>
  )
}
