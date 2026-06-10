/** Viewport heights of scroll distance per commit in the pinned track. Lower = faster commit switching (e.g. 40–50). */
export const SCROLL_VH_PER_COMMIT = 50

export const HISTORY_PREV_SECTION_ID = "about"

export const HISTORY_NEXT_SECTION_ID = "constituents"

export function scrollTrackHeight(commitCount: number): string {
  return `${commitCount * SCROLL_VH_PER_COMMIT}vh`
}
