export const NARROW_MAX_WIDTH_PX = 375;
export const NARROW_MEDIA_QUERY = `(max-width: ${NARROW_MAX_WIDTH_PX}px)`;

export const MOBILE_MAX_WIDTH_PX = 767;
export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_MAX_WIDTH_PX}px)`;
export const DESKTOP_MIN_MEDIA_QUERY = `(min-width: ${MOBILE_MAX_WIDTH_PX + 1}px)`;

/** Fine pointer with real hover (not touch-first devices). */
export const CAN_HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)';

export function prefersReducedMotion(): boolean {
  if (typeof globalThis.matchMedia !== 'function') {
    return false;
  }

  return globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
