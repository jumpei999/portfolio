import type { MouseEvent } from "react"
import {
  HOME_SECTION_ID,
  scrollToSection,
} from "@/lib/scroll-to-section"

export { HOME_SECTION_ID }

export function scrollToHome(event: MouseEvent<HTMLAnchorElement>) {
  scrollToSection(event, `#${HOME_SECTION_ID}`)
}
