import { getSectionIdFromHref } from "@/lib/scroll-to-section"

const STABLE_FRAMES = 3
const MAX_WAIT_MS = 3000

export function initManualScrollRestoration(): void {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"
  }
}

export function restoreHashScroll(): () => void {
  const hash = globalThis.location.hash
  if (!hash) {
    return () => {}
  }

  const sectionId = getSectionIdFromHref(hash)
  if (!sectionId) {
    return () => {}
  }

  globalThis.scrollTo({ top: 0, left: 0, behavior: "instant" })

  const target = document.getElementById(sectionId)
  if (!target) {
    return () => {}
  }

  let done = false
  let rafId = 0
  let lastTop = target.offsetTop
  let stableFrames = 0

  const finish = () => {
    if (done) {
      return
    }

    done = true
    cancelAnimationFrame(rafId)
    observer.disconnect()
    clearTimeout(timeoutId)

    target.scrollIntoView({ behavior: "instant", block: "start" })
  }

  const check = () => {
    if (done) {
      return
    }

    const top = target.offsetTop

    if (top === lastTop) {
      stableFrames += 1
      if (stableFrames >= STABLE_FRAMES) {
        finish()
        return
      }
    } else {
      stableFrames = 0
      lastTop = top
    }

    rafId = requestAnimationFrame(check)
  }

  const observer = new ResizeObserver(() => {
    stableFrames = 0
    rafId = requestAnimationFrame(check)
  })

  observer.observe(document.documentElement)

  const timeoutId = globalThis.setTimeout(finish, MAX_WAIT_MS)
  rafId = requestAnimationFrame(check)

  return finish
}
