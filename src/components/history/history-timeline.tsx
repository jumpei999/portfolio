"use client"

import { motion, type Variants } from "motion/react"
import { useTranslations } from "next-intl"
import { historyEntryMeta } from "@/data/history"
import HistoryTimelineItem from "@/components/history/history-timeline-item"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

export default function HistoryTimeline() {
  const t = useTranslations("history")

  return (
    <motion.ol
      className="relative mx-auto max-w-4xl"
      aria-label={t("timelineLabel")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
    >
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-3 w-px -translate-x-1/2 bg-border md:left-1/2"
        aria-hidden
      />

      {historyEntryMeta.map((entry, index) => (
        <HistoryTimelineItem key={entry.id} entry={entry} index={index} />
      ))}
    </motion.ol>
  )
}
