export function scheduleLayoutMeasure(fn: () => void): () => void {
  fn()
  const frameId = requestAnimationFrame(fn)
  return () => cancelAnimationFrame(frameId)
}
