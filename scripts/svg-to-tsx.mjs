import fs from "node:fs"
import path from "node:path"

function svgToTsx(svgPath, componentName, viewBox) {
  let svg = fs.readFileSync(svgPath, "utf8")
  svg = svg.replace(/<\?xml[^>]*\?>/g, "").replace(/<!--[\s\S]*?-->/g, "")
  const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i)
  if (!match) throw new Error(`no svg: ${svgPath}`)
  let inner = match[1]
  inner = inner.replace(/<sodipodi:namedview[\s\S]*?\/>/g, "")
  inner = inner
    .replaceAll("stroke-width", "strokeWidth")
    .replaceAll("stroke-opacity", "strokeOpacity")
    .replaceAll("stroke-dasharray", "strokeDasharray")
    .replaceAll("stroke-linecap", "strokeLinecap")
    .replaceAll("fill-opacity", "fillOpacity")
    .replaceAll("color-interpolation-filters", "colorInterpolationFilters")
    .replaceAll("font-weight", "fontWeight")
    .replaceAll("font-size", "fontSize")
    .replaceAll("font-family", "fontFamily")
    .replace(/(\s)class=/g, "$1className=")
  inner = inner.replace(/\s+(inkscape|sodipodi):[^\s=]+="[^"]*"/g, "")

  const styleKeep = new Set([
    "display",
    "fill",
    "fillOpacity",
    "stroke",
    "strokeWidth",
    "strokeDasharray",
    "strokeOpacity",
    "strokeLinecap",
    "paintOrder",
    "colorInterpolationFilters",
  ])

  inner = inner.replace(/style="([^"]*)"/g, (_, styleStr) => {
    const obj = {}
    for (const part of styleStr.split(";")) {
      const colon = part.indexOf(":")
      if (colon === -1) continue
      const key = part.slice(0, colon).trim()
      const value = part.slice(colon + 1).trim()
      if (!key) continue
      const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      if (!styleKeep.has(camel)) continue
      obj[camel] = value
    }
    if (Object.keys(obj).length === 0) return ""
    return `style={${JSON.stringify(obj)}}`
  })

  return `import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

export function ${componentName}({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="${viewBox}"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground", className)}
      {...props}
    >
${inner}
    </svg>
  )
}
`
}

const dir = path.join("src", "components", "brand")
fs.mkdirSync(dir, { recursive: true })
fs.writeFileSync(
  path.join(dir, "logo.tsx"),
  svgToTsx("public/logo.svg", "Logo", "0 0 512 512"),
)
fs.writeFileSync(
  path.join(dir, "logo-text-lg.tsx"),
  svgToTsx("public/logo-text-lg.svg", "LogoTextLg", "0 0 1536 512"),
)
fs.writeFileSync(
  path.join(dir, "lightning-up.tsx"),
  svgToTsx("public/lightning-up.svg", "LightningUp", "0 0 512 512"),
)
console.log("Generated logo components")
