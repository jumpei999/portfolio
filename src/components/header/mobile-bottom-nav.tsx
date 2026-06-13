"use client"

import SiteNavLinks from "@/components/header/site-nav-links"
import { MOBILE_NAV_ITEMS } from "@/data/nav-items"

export default function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Sections"
    >
      <SiteNavLinks items={MOBILE_NAV_ITEMS} orientation="bottom" />
    </nav>
  )
}
