export type SocialLinkKey =
  | "github"
  | "bluesky"
  | "discord"
  | "googleLocalGuides"
  | "yukiyama"

export type SocialLink = Readonly<{
  key: SocialLinkKey
  href: string
}>

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { key: "github", href: "https://github.com/jumpei999/" },
  { key: "bluesky", href: "https://bsky.app/profile/jumpei999.bsky.social" },
  {
    key: "discord",
    href: "https://discord.com/users/802407652343939123",
  },
  {
    key: "googleLocalGuides",
    href: "https://www.google.co.jp/maps/contrib/114625111954146376736",
  },
  {
    key: "yukiyama",
    href: "https://app-api.yukiyama.biz/app/user?id=Z8brqMg6jGR",
  },
] as const
