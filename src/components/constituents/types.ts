import type { Tag } from '@/data/constituent-tags';

export type PlacedTag = Tag & {
  left: number;
  top: number;
  driftX: number;
  driftY: number;
  duration: number;
  popDelay: number;
};
