import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

export function LightningUp({
  className,
  ...props
}: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground", className)}
      {...props}
    >
      <defs id="defs1">
        <filter
          id="mask-powermask-path-effect17_inverse"
          style={{ colorInterpolationFilters: "sRGB" }}
          height="100"
          width="100"
          x="-50"
          y="-50"
        >
          <feColorMatrix
            id="mask-powermask-path-effect17_primitive1"
            values="1"
            type="saturate"
            result="fbSourceGraphic"
          />
          <feColorMatrix
            id="mask-powermask-path-effect17_primitive2"
            values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0 "
            in="fbSourceGraphic"
          />
        </filter>
      </defs>
      <g id="layer1">
        <ellipse
          style={{
            display: "none",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "48",
            strokeDasharray: "none",
            strokeOpacity: "1",
          }}
          id="path3"
          ry="225.29549"
          rx="224.29549"
          cy="256"
          cx="256"
          mask="none"
        />
        <g
          id="g13"
          transform="matrix(-2.4304829,0.65124592,-0.65124592,-2.4304829,1971.7553,383.51575)"
          style={{
            fill: "currentColor",
            fillOpacity: "1",
            stroke: "currentColor",
            strokeOpacity: "1",
          }}
        >
          <path
            id="rect13"
            style={{
              fill: "currentColor",
              fillOpacity: "1",
              stroke: "currentColor",
              strokeWidth: "0",
              strokeOpacity: "1",
              paintOrder: "stroke fill markers",
            }}
            d="m 634.3007,137.3986 h 75.76778 l -58.68283,94.33435 -59.55039,0.0433 z"
          />
          <path
            id="rect13-0"
            style={{
              fill: "currentColor",
              fillOpacity: "1",
              stroke: "currentColor",
              strokeWidth: "0",
              strokeOpacity: "1",
              paintOrder: "stroke fill markers",
            }}
            d="M 641.02971,205.38614 H 702.8911 L 591.35644,316.24753 Z"
          />
        </g>
      </g>
    </svg>
  )
}
