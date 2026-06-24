import { prefersReducedMotion } from "@/lib/media-queries"

type Listener = () => void

let programmaticScrolling = false
const listeners = new Set<Listener>()

function prefersReducedScroll(): boolean {
  return prefersReducedMotion()
}

function emit(): void {
  for (const listener of listeners) {
    listener()
  }
}

function setProgrammaticScrolling(next: boolean): void {
  if (programmaticScrolling === next) {
    return
  }

  programmaticScrolling = next
  emit()
}

export function subscribeProgrammaticScrolling(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getProgrammaticScrollingSnapshot(): boolean {
  return programmaticScrolling
}

export function getProgrammaticScrollingServerSnapshot(): boolean {
  return false
}

const SCROLL_END_FALLBACK_MS = 1000
const SCROLL_STABLE_FRAMES = 4

let activeScrollCleanup: (() => void) | null = null

export function beginProgrammaticScroll(): void {
  if (prefersReducedScroll()) {
    return
  }

  activeScrollCleanup?.()
  setProgrammaticScrolling(true)

  let finished = false
  let rafId = 0

  const finish = () => {
    if (finished) {
      return
    }

    finished = true
    document.removeEventListener("scrollend", finish)
    clearTimeout(timeoutId)
    cancelAnimationFrame(rafId)

    if (activeScrollCleanup === cleanup) {
      activeScrollCleanup = null
    }

    setProgrammaticScrolling(false)
  }

  const cleanup = () => {
    finish()
  }

  activeScrollCleanup = cleanup

  document.addEventListener("scrollend", finish, { once: true })
  const timeoutId = globalThis.setTimeout(finish, SCROLL_END_FALLBACK_MS)

  let lastY = globalThis.scrollY
  let stableFrames = 0

  const checkScrollSettled = () => {
    if (finished) {
      return
    }

    const nextY = globalThis.scrollY

    if (nextY === lastY) {
      stableFrames += 1
      if (stableFrames >= SCROLL_STABLE_FRAMES) {
        finish()
        return
      }
    } else {
      stableFrames = 0
      lastY = nextY
    }

    rafId = requestAnimationFrame(checkScrollSettled)
  }

  rafId = requestAnimationFrame(checkScrollSettled)
}
