import type { PlacedTag } from '@/components/constituents/types';

export type EdgeKind = 'radial' | 'proximity';

export type Edge = {
  kind: EdgeKind;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fromLabel: string;
  toLabel: string;
};

const CENTER = { x: 50, y: 50 };
const MAJOR_LEVEL_MIN = 4;
const PROXIMITY_MAX_DISTANCE = 48;
const MAX_PROXIMITY_PER_TAG = 2;

function edgeKey(a: string, b: string) {
  return [a, b].sort((x, y) => x.localeCompare(y)).join('|');
}

function sharesCategory(a: PlacedTag, b: PlacedTag) {
  return a.categories.some((c) => b.categories.includes(c));
}

function buildRadialEdges(tags: PlacedTag[]): Edge[] {
  return tags
    .filter((tag) => tag.level >= MAJOR_LEVEL_MIN)
    .map((tag) => ({
      kind: 'radial' as const,
      x1: CENTER.x,
      y1: CENTER.y,
      x2: tag.left,
      y2: tag.top,
      fromLabel: '__center__',
      toLabel: tag.label,
    }));
}

function buildProximityEdges(tags: PlacedTag[]): Edge[] {
  const edges: Edge[] = [];
  const seen = new Set<string>();

  for (const tag of tags) {
    const neighbors = tags
      .filter((other) => other.label !== tag.label)
      .filter((other) => sharesCategory(tag, other))
      .map((other) => ({
        other,
        distance: Math.hypot(tag.left - other.left, tag.top - other.top),
      }))
      .filter(({ distance }) => distance < PROXIMITY_MAX_DISTANCE)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, MAX_PROXIMITY_PER_TAG);

    for (const { other } of neighbors) {
      const key = edgeKey(tag.label, other.label);
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({
        kind: 'proximity',
        x1: tag.left,
        y1: tag.top,
        x2: other.left,
        y2: other.top,
        fromLabel: tag.label,
        toLabel: other.label,
      });
    }
  }

  return edges;
}

export function buildTagEdges(tags: PlacedTag[]): Edge[] {
  return [...buildRadialEdges(tags), ...buildProximityEdges(tags)];
}
