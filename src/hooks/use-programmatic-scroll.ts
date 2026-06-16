"use client"

import { useSyncExternalStore } from "react"
import {
  getProgrammaticScrollingServerSnapshot,
  getProgrammaticScrollingSnapshot,
  subscribeProgrammaticScrolling,
} from "@/lib/programmatic-scroll"

export function useProgrammaticScrolling(): boolean {
  return useSyncExternalStore(
    subscribeProgrammaticScrolling,
    getProgrammaticScrollingSnapshot,
    getProgrammaticScrollingServerSnapshot,
  )
}
