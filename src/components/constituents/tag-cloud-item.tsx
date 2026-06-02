"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import {
  getTagAnimate,
  getTagClassName,
  getTagTransition,
} from "./tag-cloud-motion"
import type { PlacedTag } from "./types"

type TagCloudItemProps = {
  tag: PlacedTag
  highlighted: boolean
  reduceMotion: boolean
  started: boolean
}

export default function TagCloudItem({
  tag,
  highlighted,
  reduceMotion,
  started,
}: Readonly<TagCloudItemProps>) {
  const t = useTranslations("constituents")
  const description = tag.descriptionKey
    ? t(`tagDescriptions.${tag.descriptionKey}`)
    : undefined
  const hasDescription = Boolean(description)

  return (
    <motion.span
      className={getTagClassName(tag, highlighted, hasDescription)}
      style={{ left: `${tag.left}%`, top: `${tag.top}%` }}
      initial={{ opacity: 0, scale: 0.35 }}
      animate={getTagAnimate(tag, highlighted, reduceMotion, started)}
      transition={getTagTransition(tag, highlighted, reduceMotion, started)}
    >
      <span className="group relative inline-block">
        {tag.label}
        {description && (
          <span
            role="tooltip"
            className={cn(
              "pointer-events-none absolute top-[calc(100%+0.5rem)] left-1/2 z-30 w-max max-w-56",
              "-translate-x-1/2 rounded-md border border-foreground/15 bg-background px-2.5 py-1.5",
              "text-xs font-normal text-foreground/80 shadow-lg",
              "opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
            )}
          >
            {description}
          </span>
        )}
      </span>
    </motion.span>
  )
}
