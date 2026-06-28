"use client"

import dynamic from "next/dynamic"
import { scrollTrackHeight } from "@/components/history/constants"
import { HISTORY_ITEM_IDS } from "@/data/history"

const HistoryTimeline = dynamic(
  () => import("@/components/history/history-timeline"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full"
        style={{ height: scrollTrackHeight(HISTORY_ITEM_IDS.length) }}
        aria-hidden
      />
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
