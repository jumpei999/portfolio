import { computeOgLayout, OG_LAYOUT } from "@/lib/og/og-layout"
import OgLogoSvg from "@/lib/og/og-logo-svg"
import { OG_SPLIT, OG_THEME, toLocalClipPath } from "@/lib/og/og-theme"

export default function OgSplitLogo() {
  const layout = computeOgLayout()
  const lightClip = toLocalClipPath(OG_SPLIT.lightPolygon, layout.logoX, layout.logoY)
  const darkClip = toLocalClipPath(OG_SPLIT.darkPolygon, layout.logoX, layout.logoY)

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left: layout.logoX,
        top: layout.logoY,
        width: OG_LAYOUT.logo.width,
        height: OG_LAYOUT.logo.height,
      }}
    >
      <OgLogoSvg
        color={OG_THEME.dark.foreground}
        idSuffix="logo-dark"
        width={OG_LAYOUT.logo.width}
        height={OG_LAYOUT.logo.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          clipPath: darkClip,
        }}
      />
      <OgLogoSvg
        color={OG_THEME.light.foreground}
        idSuffix="logo-light"
        width={OG_LAYOUT.logo.width}
        height={OG_LAYOUT.logo.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          clipPath: lightClip,
        }}
      />
    </div>
  )
}
