"use client"

import Image from "next/image"
import { motion, type Variants } from "motion/react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import type { HistoryEntryMeta } from "@/data/history"

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.24, 1, 0.32, 1] },
  },
}

type HistoryTimelineItemProps = {
  entry: HistoryEntryMeta
  index: number
}

function ContentBlock({
  entry,
  index,
}: Readonly<{ entry: HistoryEntryMeta; index: number }>) {
  const t = useTranslations("history")
  const headingId = `history-item-${index}`

  return (
    <article
      aria-labelledby={headingId}
      className="flex w-full max-w-md flex-col gap-2"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={entry.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover grayscale contrast-[1.12] brightness-[0.95]"
          aria-hidden
        />
      </div>
      <p className="text-sm leading-6">
        {t(`entries.${entry.id}.description`)}
      </p>
      <p
        id={headingId}
        className="text-[2rem] font-bold leading-none tracking-tight sm:text-[2.25rem]"
      >
        {entry.year}
      </p>
      <p className="text-sm text-muted-foreground">
        {t(`entries.${entry.id}.eraDate`)}
      </p>
    </article>
  )
}

export default function HistoryTimelineItem({
  entry,
  index,
}: Readonly<HistoryTimelineItemProps>) {
  const isLeft = index % 2 === 0

  return (
    <motion.li
      className="relative grid grid-cols-[auto_1fr] gap-x-5 pb-14 last:pb-0 md:grid-cols-[1fr_auto_1fr] md:gap-x-0 md:pb-20 md:last:pb-0"
      variants={itemVariants}
    >
      <div className="col-start-1 row-start-1 flex w-6 shrink-0 justify-center pt-1 md:col-start-2 md:w-auto md:pt-0">
        <span
          className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-red-600 ring-[3px] ring-background"
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "col-start-2 row-start-1 min-w-0",
          isLeft
            ? "md:col-start-1 md:justify-self-end md:pr-10"
            : "md:col-start-3 md:pl-10",
        )}
      >
        <ContentBlock entry={entry} index={index} />
      </div>
    </motion.li>
  )
}
