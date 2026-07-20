import { cn } from '@/lib/utils';

type NextIntlIconProps = Readonly<{
  className?: string;
}>;

export default function NextIntlIcon({ className }: NextIntlIconProps) {
  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className={cn('size-4', className)}
      aria-hidden
    >
      <g
        fillRule="evenodd"
        strokeWidth={1.274}
        transform="matrix(2.27345 0 0 2.27345 -17.851 -55.851)"
      >
        <path d="M31.177 48.439a13 13 0 0 1-.934.806c-5.53 4.359-13.488 3.71-18.238-1.488s-4.684-13.181.153-18.299c4.838-5.117 12.805-5.633 18.261-1.182 5.457 4.45 6.563 12.241 2.522 18.008" />
        <path
          strokeLinecap="square"
          d="M10.573 31.994a93 93 0 0 1 11.373-.69q5.624.01 10.801.725"
        />
        <ellipse cx="22.031" cy="38.678" rx="6.613" ry="13.474" />
        <path
          strokeLinecap="square"
          d="M11.245 46.105q5.284.708 10.668.708t10.834-.708M8.724 39.138h26.534"
        />
      </g>
    </svg>
  );
}
