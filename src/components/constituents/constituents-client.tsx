"use client"

import dynamic from "next/dynamic"

const Constituents = dynamic(
  () => import("@/components/constituents/constituents-section"),
  {
    ssr: false,
    loading: () => <div className="min-h-screen w-full" aria-hidden />,
  },
)

export default function ConstituentsClient() {
  return <Constituents />
}
