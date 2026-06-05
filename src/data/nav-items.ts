export const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "#about" },
  { key: "history", href: "#history" },
  { key: "constituents", href: "#constituents" },
  { key: "contact", href: "#contact" },
] as const

export type NavItemKey = (typeof NAV_ITEMS)[number]["key"]
