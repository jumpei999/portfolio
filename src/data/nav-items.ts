export const NAV_ITEMS = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "history", href: "#history" },
  { key: "constituents", href: "#constituents" },
  { key: "contact", href: "#contact" },
] as const

export type NavItemKey = (typeof NAV_ITEMS)[number]["key"]

export type NavItem = (typeof NAV_ITEMS)[number]

export const MOBILE_NAV_ITEMS = NAV_ITEMS.filter(
  (item) => item.key !== "home",
) as Exclude<NavItem, { key: "home" }>[]
