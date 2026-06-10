"use client"

import dynamic from "next/dynamic"

const Constituents = dynamic(
  () => import("@/components/constituents/constituents-section"),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[calc(100svh-var(--site-header-height))] w-full"
        aria-hidden
      />
    ),
  },
)

export default function ConstituentsClient() {
  return <Constituents />
}
