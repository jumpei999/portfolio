import { prefersReducedMotion } from "@/lib/media-queries"
import { createStableValuePoller } from "@/lib/wait-for-stable-value"

type Listener = () => void

let programmaticScrolling = false
const listeners = new Set<Listener>()

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

function runScrollEndWaiter(onEnd?: () => void): () => void {
  let finished = false

  const finish = () => {
    if (finished) {
      return
    }

    finished = true
    document.removeEventListener("scrollend", finish)
    clearTimeout(timeoutId)
    poller.cancel()
    onEnd?.()
  }

  document.addEventListener("scrollend", finish, { once: true })
  const timeoutId = globalThis.setTimeout(finish, SCROLL_END_FALLBACK_MS)

  const poller = createStableValuePoller({
    readValue: () => globalThis.scrollY,
    stableFrames: SCROLL_STABLE_FRAMES,
    onStable: finish,
    isDone: () => finished,
  })

  poller.start()

  return finish
}

export function waitForScrollEnd(onScrollEnd?: () => void): void {
  if (prefersReducedMotion()) {
    onScrollEnd?.()
    return
  }

  activeScrollCleanup?.()

  const cleanup = runScrollEndWaiter(() => {
    if (activeScrollCleanup === cleanup) {
      activeScrollCleanup = null
    }
    onScrollEnd?.()
  })

  activeScrollCleanup = cleanup
}

export function beginProgrammaticScroll(onScrollEnd?: () => void): void {
  if (prefersReducedMotion()) {
    onScrollEnd?.()
    return
  }

  activeScrollCleanup?.()
  setProgrammaticScrolling(true)

  const cleanup = runScrollEndWaiter(() => {
    if (activeScrollCleanup === cleanup) {
      activeScrollCleanup = null
    }

    setProgrammaticScrolling(false)
    onScrollEnd?.()
  })

  activeScrollCleanup = cleanup
}
