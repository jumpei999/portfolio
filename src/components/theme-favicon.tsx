"use client"

import { useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

const FAVICON_BY_THEME = {
  light: "/favicon-light.svg",
  dark: "/favicon-dark.svg",
} as const

function getOrCreateFaviconLink(): HTMLLinkElement {
  const existing = document.querySelector<HTMLLinkElement>(
    "link[data-theme-favicon]",
  )
  if (existing) {
    return existing
  }

  const link = document.createElement("link")
  link.rel = "icon"
  link.type = "image/svg+xml"
  link.dataset.themeFavicon = "true"
  document.head.appendChild(link)
  return link
}

export default function ThemeFavicon() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const link = getOrCreateFaviconLink()
    link.href = FAVICON_BY_THEME[resolvedTheme]
  }, [resolvedTheme])

  return null
}
