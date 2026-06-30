"use client"

import { useLayoutEffect, useState, type RefObject } from "react"

function getVerticalPadding(element: HTMLElement): number {
  const style = getComputedStyle(element)
  return (
    Number.parseFloat(style.paddingTop) +
    Number.parseFloat(style.paddingBottom)
  )
}

export function useDockNeedsScroll(
  activeId: string,
  isDock: boolean,
  cardRef: RefObject<HTMLDivElement | null>,
  articleRef: RefObject<HTMLElement | null>,
) {
  const [needsScroll, setNeedsScroll] = useState(false)

  useLayoutEffect(() => {
    if (!isDock) return

    const measureNeedsScroll = () => {
      const card = cardRef.current
      const article = articleRef.current
      if (!card || !article) return

      const availableHeight = card.clientHeight - getVerticalPadding(card)
      setNeedsScroll(article.scrollHeight > availableHeight)
    }

    const frameId = requestAnimationFrame(measureNeedsScroll)

    const card = cardRef.current
    const article = articleRef.current
    const resizeObserver = new ResizeObserver(measureNeedsScroll)
    if (card) resizeObserver.observe(card)
    if (article) resizeObserver.observe(article)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [activeId, articleRef, cardRef, isDock])

  return isDock && needsScroll
}
