import type { MouseEvent } from 'react';
import { prefersReducedMotion } from '@/lib/media-queries';
import { beginProgrammaticScroll } from '@/lib/programmatic-scroll';

export const HOME_SECTION_ID = 'home';

function getScrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth';
}

export function getSectionIdFromHref(href: string): string | null {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) {
    return null;
  }

  const id = href.slice(hashIndex + 1);
  return id.length > 0 ? id : null;
}

export function scrollToSectionById(sectionId: string): void {
  beginProgrammaticScroll();

  document.getElementById(sectionId)?.scrollIntoView({
    behavior: getScrollBehavior(),
  });

  const url = `${globalThis.location.pathname}${globalThis.location.search}`;

  if (sectionId === HOME_SECTION_ID) {
    history.replaceState(null, '', url);
  } else {
    history.replaceState(null, '', `${url}#${sectionId}`);
  }
}

export function scrollToSection(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
): void {
  event.preventDefault();

  const sectionId = getSectionIdFromHref(href);
  if (!sectionId) {
    return;
  }

  scrollToSectionById(sectionId);
}
