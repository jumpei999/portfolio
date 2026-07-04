/** Runs fn synchronously, then again on the next animation frame. Returns cancel. */
export function scheduleLayoutMeasure(fn: () => void): () => void {
  fn()
  const frameId = requestAnimationFrame(fn)
  return () => cancelAnimationFrame(frameId)
}
