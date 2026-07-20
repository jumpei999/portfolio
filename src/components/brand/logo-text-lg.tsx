import { type SVGProps, useId } from 'react';
import { cn } from '@/lib/utils';

// Circle mask id uses useId — svg-to-tsx regen would drop it; re-apply after regenerate.
export function LogoTextLg({
  className,
  ...props
}: Readonly<SVGProps<SVGSVGElement>>) {
  const circleMaskId = useId();

  return (
    <svg
      viewBox="0 0 1536 512"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-foreground', className)}
      {...props}
    >
      <defs id="defs1">
        <filter
          id="mask-powermask-path-effect17_inverse"
          style={{ colorInterpolationFilters: 'sRGB' }}
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
        <mask maskUnits="userSpaceOnUse" id={circleMaskId}>
          <g
            id="g30"
            transform="matrix(0.92384309,0,0,0.92384309,-456.14378,35.866845)"
          >
            <rect
              style={{
                display: 'inline',
                fill: '#ffffff',
                fillOpacity: '1',
                stroke: 'none',
                strokeWidth: '10.6841',
                strokeLinecap: 'square',
                paintOrder: 'stroke fill markers',
              }}
              id="rect29"
              width="1024"
              height="228.3"
              x="261.69858"
              y="365.75961"
            />
            <rect
              style={{
                display: 'inline',
                fill: '#ffffff',
                fillOpacity: '1',
                stroke: 'none',
                strokeWidth: '10.3875',
                strokeLinecap: 'square',
                paintOrder: 'stroke fill markers',
              }}
              id="rect30"
              width="1024"
              height="215.8"
              x="256"
              y="-45.5"
            />
          </g>
        </mask>
      </defs>
      <ellipse
        style={{
          display: 'inline',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '21.409',
          strokeDasharray: 'none',
          strokeOpacity: '1',
        }}
        id="path3"
        ry="225.29549"
        rx="224.29549"
        cy="256"
        cx="256"
        mask={`url(#${circleMaskId})`}
        transform="matrix(1.0824349,0,0,1.0824349,490.89666,-21.103333)"
      />
      <g id="layer1" transform="translate(511.99999)">
        <g id="g1">
          <g
            id="g13"
            transform="matrix(0.80798211,0.21649815,-0.21649815,0.80798211,-113.88222,-195.01202)"
          >
            <path
              id="rect13"
              style={{
                fill: 'currentColor',
                stroke: 'none',
                strokeWidth: '0',
                paintOrder: 'stroke fill markers',
              }}
              d="m 634.3007,137.3986 h 75.76778 l -58.68283,94.33435 -59.55039,0.0433 z"
            />
            <path
              id="rect13-0"
              style={{
                fill: 'currentColor',
                stroke: 'none',
                strokeWidth: '0',
                paintOrder: 'stroke fill markers',
              }}
              d="M 641.02971,205.38614 H 702.8911 L 591.35644,316.24753 Z"
            />
          </g>
          <g
            id="g13-0"
            transform="matrix(-0.80798211,-0.21649815,0.21649815,-0.80798211,625.71758,706.91795)"
          >
            <path
              id="rect13-06"
              style={{
                fill: 'currentColor',
                stroke: 'none',
                strokeWidth: '0',
                paintOrder: 'stroke fill markers',
              }}
              d="m 634.3007,137.3986 h 75.76778 l -58.68283,94.33435 -59.55039,0.0433 z"
            />
            <path
              id="rect13-0-1"
              style={{
                fill: 'currentColor',
                stroke: 'none',
                strokeWidth: '0',
                paintOrder: 'stroke fill markers',
              }}
              d="M 641.02971,205.38614 H 702.8911 L 591.35644,316.24753 Z"
            />
          </g>
        </g>
        <g
          id="g12"
          transform="matrix(3.1838435,0,0,3.1838435,-525.65247,-538.63647)"
        >
          <path
            style={{ fill: 'currentColor', stroke: 'currentColor' }}
            d="m 439.92985,280.24997 h 23.83332 v -32.92665 l 21.26666,-16.42666 h -17.52666 l -59.32664,45.53998 h 17.81999 l 13.93333,-10.78 z"
            id="path17"
          />
          <path
            style={{ fill: 'currentColor', stroke: 'currentColor' }}
            d="m 340.88328,270.12997 h 22.95332 l 4.4,-24.34665 h 12.39333 l -5.72,34.46665 h 22.95332 l 6.38,-34.46665 h 11.87999 v -11.07333 h -46.41998 l 0.73334,-5.20666 h -22.95332 z"
            id="path16"
          />
          <path
            style={{ fill: 'currentColor', stroke: 'currentColor' }}
            d="m 292.84995,261.91664 h 43.92664 v -11.07332 h -43.92664 z"
            id="path15"
          />
          <path
            style={{ fill: 'currentColor', stroke: 'currentColor' }}
            d="m 286.90993,247.46998 v -10.48666 h -39.37998 v -7.47999 h -22.73333 v 42.38664 c 0.14667,5.57333 3.59334,8.28667 10.41333,8.36 h 51.62664 v -10.12 h -39.08664 v -22.65999 z"
            id="path14"
          />
          <path
            style={{ fill: 'currentColor', stroke: 'currentColor' }}
            d="m 174.56336,280.24997 h 23.83332 v -32.92665 l 21.26666,-16.42666 h -17.52666 l -59.32663,45.53998 h 17.81999 l 13.93332,-10.78 z"
            id="path13"
          />
          <path
            style={{ fill: 'currentColor', stroke: 'currentColor' }}
            d="m 84.950087,246.88332 h 16.426663 v 24.05332 H 84.950087 v 9.31333 h 54.926643 v -9.31333 h -16.49999 v -24.05332 h 16.49999 v -9.68 H 84.950087 Z"
            id="path12"
          />
          <path
            style={{ fill: 'currentColor', stroke: 'currentColor' }}
            d="M 28.630105,280.24997 H 53.490093 L 79.523414,244.60999 H 53.41676 Z"
            id="path11"
          />
          <path
            style={{ fill: 'currentColor', stroke: 'currentColor' }}
            d="M 5.0167838,258.10331 H 34.276769 V 247.90998 H 5.0167835 Z"
            id="path10"
          />
          <path
            style={{ fill: 'currentColor', stroke: 'currentColor' }}
            d="M 5.0901168,241.23665 H 34.203436 V 230.89666 H 5.0901168 Z"
            id="text3"
          />
          <g id="g11">
            <rect
              style={{
                fill: 'currentColor',
                fillOpacity: '1',
                stroke: 'none',
                strokeWidth: '0',
                strokeDasharray: 'none',
                strokeOpacity: '1',
                paintOrder: 'stroke fill markers',
              }}
              id="rect7-3"
              width="10"
              height="17.6"
              x="61.184383"
              y="219.23209"
            />
            <rect
              style={{
                fill: 'currentColor',
                fillOpacity: '1',
                stroke: 'none',
                strokeWidth: '0',
                strokeDasharray: 'none',
                strokeOpacity: '1',
                paintOrder: 'stroke fill markers',
              }}
              id="rect7"
              width="10"
              height="17.6"
              x="73.026443"
              y="219.23209"
            />
          </g>
          <circle
            style={{
              fill: 'none',
              fillOpacity: '1',
              stroke: 'currentColor',
              strokeWidth: '8',
              strokeDasharray: 'none',
              strokeOpacity: '1',
              paintOrder: 'stroke fill markers',
            }}
            id="path8"
            cx="291.09863"
            cy="230.41808"
            r="8"
          />
        </g>
      </g>
    </svg>
  );
}
