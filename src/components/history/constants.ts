export const SCROLL_VH_PER_COMMIT = 50
export const HISTORY_PREV_SECTION_ID = "about"
export const HISTORY_NEXT_SECTION_ID = "constituents"
export const MOBILE_DOCK_MIN_HEIGHT_PX = 180
export const MOBILE_DOCK_MAX_HEIGHT_PX = 240

export function scrollTrackHeight(commitCount: number): string {
  return `${commitCount * SCROLL_VH_PER_COMMIT}vh`
}
