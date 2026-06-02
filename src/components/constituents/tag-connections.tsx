"use client"

import { useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"
import type { Category } from "@/data/category-config"
import { buildTagEdges, type Edge } from "@/components/constituents/edges"
import { isTagHighlighted } from "@/components/constituents/highlight"
import type { PlacedTag } from "@/components/constituents/types"

const LINE_FADE_START = 0.08
const LINE_FADE_END = 0.92

type TagConnectionsProps = {
  tags: PlacedTag[]
  selectedCategories: ReadonlySet<Category>
  started: boolean
}

function isEdgeActive(
  edge: Edge,
  tagByLabel: Map<string, PlacedTag>,
  selected: ReadonlySet<Category>,
): boolean {
  if (edge.kind === "radial") {
    const tag = tagByLabel.get(edge.toLabel)
    return tag ? isTagHighlighted(tag, selected) : false
  }

  const from = tagByLabel.get(edge.fromLabel)
  const to = tagByLabel.get(edge.toLabel)
  if (!from || !to) return false
  return isTagHighlighted(from, selected) && isTagHighlighted(to, selected)
}

function edgePopDelay(edge: Edge, tagByLabel: Map<string, PlacedTag>) {
  if (edge.kind === "radial") {
    return tagByLabel.get(edge.toLabel)?.popDelay ?? 0
  }
  const from = tagByLabel.get(edge.fromLabel)?.popDelay ?? 0
  const to = tagByLabel.get(edge.toLabel)?.popDelay ?? 0
  return Math.max(from, to)
}

function edgeOpacity(edge: Edge, active: boolean) {
  if (active) {
    return edge.kind === "radial" ? 0.28 : 0.22
  }
  return edge.kind === "radial" ? 0.07 : 0.05
}

function gradientId(edge: Edge) {
  return `${edge.kind}-${edge.fromLabel}-${edge.toLabel}`.replaceAll(
    /[^a-zA-Z0-9_-]/g,
    "_",
  )
}

function lineTransition(
  started: boolean,
  reduceMotion: boolean | null,
  delay: number,
) {
  if (!started) return { duration: 0 }
  if (reduceMotion) return { duration: 0.2, delay }
  return {
    opacity: { duration: 0.35, delay, ease: "easeOut" as const },
  }
}

function EndpointFadeGradient({ edge }: Readonly<{ edge: Edge }>) {
  const fadeIn = `${LINE_FADE_START * 100}%`
  const fadeOut = `${LINE_FADE_END * 100}%`

  return (
    <linearGradient
      id={gradientId(edge)}
      gradientUnits="userSpaceOnUse"
      x1={edge.x1}
      y1={edge.y1}
      x2={edge.x2}
      y2={edge.y2}
    >
      <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
      <stop offset={fadeIn} stopColor="currentColor" stopOpacity="1" />
      <stop offset={fadeOut} stopColor="currentColor" stopOpacity="1" />
      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
    </linearGradient>
  )
}

export default function TagConnections({
  tags,
  selectedCategories,
  started,
}: Readonly<TagConnectionsProps>) {
  const reduceMotion = useReducedMotion()
  const edges = useMemo(() => buildTagEdges(tags), [tags])
  const tagByLabel = useMemo(
    () => new Map(tags.map((tag) => [tag.label, tag])),
    [tags],
  )

  if (edges.length === 0) return null

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-foreground"
      aria-hidden
    >
      <defs>
        {edges.map((edge) => (
          <EndpointFadeGradient key={gradientId(edge)} edge={edge} />
        ))}
      </defs>

      {edges.map((edge) => {
        const active = isEdgeActive(edge, tagByLabel, selectedCategories)
        const delay = edgePopDelay(edge, tagByLabel)
        const id = `${edge.kind}-${edge.fromLabel}-${edge.toLabel}`

        return (
          <motion.line
            key={id}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke={`url(#${gradientId(edge)})`}
            strokeWidth={edge.kind === "radial" ? 1 : 0.75}
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{
              opacity: started ? edgeOpacity(edge, active) : 0,
            }}
            transition={lineTransition(started, reduceMotion, delay)}
          />
        )
      })}
    </svg>
  )
}
