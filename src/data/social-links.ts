export type SocialLinkKey = "github" | "bluesky" | "instagram" | "email"

export type SocialLink = Readonly<{
  key: SocialLinkKey
  href: string
}>

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { key: "github", href: "https://github.com/jumpei999/" },
  { key: "bluesky", href: "https://bsky.app/profile/jumpei999.bsky.social" },
  { key: "instagram", href: "https://www.instagram.com/jumpei9999/" },
  { key: "email", href: "mailto:jumpei.kato.999@gmail.com" },
] as const
