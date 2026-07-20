export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_THEME = {
  light: { background: '#f8fafc', foreground: '#334155' },
  dark: { background: '#1e293b', foreground: '#e2e8f0' },
} as const;

const SPLIT_BOTTOM_X = 448;
const SPLIT_TOP_X = 721;

export function buildOgSplit(width: number, height: number) {
  return {
    line: { x1: SPLIT_BOTTOM_X, y1: height, x2: SPLIT_TOP_X, y2: 0 },
    darkPolygon: `0,0 0,${height} ${SPLIT_BOTTOM_X},${height} ${SPLIT_TOP_X},0`,
    lightPolygon: `${SPLIT_TOP_X},0 ${width},0 ${width},${height} ${SPLIT_BOTTOM_X},${height}`,
  } as const;
}

export const OG_SPLIT = buildOgSplit(OG_SIZE.width, OG_SIZE.height);

export function toClipPathPolygon(points: string) {
  const pairs = points.split(' ').map((pair) => {
    const [x, y] = pair.split(',');
    return `${x}px ${y}px`;
  });

  return `polygon(${pairs.join(', ')})`;
}

export const OG_SPLIT_CLIP = {
  dark: toClipPathPolygon(OG_SPLIT.darkPolygon),
  light: toClipPathPolygon(OG_SPLIT.lightPolygon),
} as const;

export function toLocalClipPath(
  canvasPolygon: string,
  offsetX: number,
  offsetY: number,
) {
  const pairs = canvasPolygon.split(' ').map((pair) => {
    const [x, y] = pair.split(',').map(Number);
    return `${x - offsetX}px ${y - offsetY}px`;
  });

  return `polygon(${pairs.join(', ')})`;
}
