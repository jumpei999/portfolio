export const MOBILE_MAX_WIDTH_PX = 767
export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_MAX_WIDTH_PX}px)`
export const DESKTOP_MIN_MEDIA_QUERY = `(min-width: ${MOBILE_MAX_WIDTH_PX + 1}px)`

export function prefersReducedMotion(): boolean {
  if (typeof globalThis.matchMedia !== "function") {
    return false
  }

  return globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function matchesMobileViewport(): boolean {
  if (typeof globalThis.matchMedia !== "function") {
    return false
  }

  return globalThis.matchMedia(MOBILE_MEDIA_QUERY).matches
}
