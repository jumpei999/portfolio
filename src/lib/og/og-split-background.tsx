import { OG_SIZE, OG_SPLIT, OG_THEME } from '@/lib/og/og-theme';

export default function OgSplitBackground() {
  return (
    <svg
      width={OG_SIZE.width}
      height={OG_SIZE.height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <polygon points={OG_SPLIT.darkPolygon} fill={OG_THEME.dark.background} />
      <polygon
        points={OG_SPLIT.lightPolygon}
        fill={OG_THEME.light.background}
      />
    </svg>
  );
}
