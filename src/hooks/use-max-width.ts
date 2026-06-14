"use client"

import { useSyncExternalStore } from "react"

function subscribeMaxWidth(maxWidthPx: number, onStoreChange: () => void) {
  const mediaQuery = globalThis.matchMedia(`(max-width: ${maxWidthPx}px)`)
  mediaQuery.addEventListener("change", onStoreChange)
  return () => mediaQuery.removeEventListener("change", onStoreChange)
}

function getMaxWidthSnapshot(maxWidthPx: number) {
  return globalThis.matchMedia(`(max-width: ${maxWidthPx}px)`).matches
}

function getMaxWidthServerSnapshot() {
  return false
}

export function useMaxWidth(maxWidthPx = 1023) {
  return useSyncExternalStore(
    (onStoreChange) => subscribeMaxWidth(maxWidthPx, onStoreChange),
    () => getMaxWidthSnapshot(maxWidthPx),
    getMaxWidthServerSnapshot,
  )
}
