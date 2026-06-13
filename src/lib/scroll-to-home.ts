import type { MouseEvent } from "react"

export const HOME_SECTION_ID = "home"

export function scrollToHome(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()

  document.getElementById(HOME_SECTION_ID)?.scrollIntoView({
    behavior: globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  })

  history.replaceState(
    null,
    "",
    `${globalThis.location.pathname}${globalThis.location.search}`,
  )
}
