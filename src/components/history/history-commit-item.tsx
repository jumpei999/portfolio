'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { HistoryItem } from '@/data/history';
import {
  ENTRANCE_DOT_SCALE_DURATION_SEC,
  ENTRANCE_EASE,
  ENTRANCE_ITEM_HIDDEN,
  ENTRANCE_ITEM_VISIBLE,
  entranceItemTransition,
} from '@/hooks/use-entrance-animation';
import { formatHistoryCommitLabel } from '@/lib/history-commit-label';
import { cn } from '@/lib/utils';

function getItemAnimateTarget(
  reduceMotion: boolean | null,
  animationStarted: boolean,
) {
  if (reduceMotion) return undefined;
  if (animationStarted) return ENTRANCE_ITEM_VISIBLE;
  return ENTRANCE_ITEM_HIDDEN;
}

type HistoryCommitItemProps = {
  item: HistoryItem;
  index: number;
  animationStarted: boolean;
  isActive: boolean;
  isLast: boolean;
  itemRef?: (element: HTMLLIElement | null) => void;
  onSelect: (id: string) => void;
};

export default function HistoryCommitItem({
  item,
  index,
  animationStarted,
  isActive,
  isLast,
  itemRef,
  onSelect,
}: Readonly<HistoryCommitItemProps>) {
  const reduceMotion = useReducedMotion();
  const label = formatHistoryCommitLabel(item);
  const transition = entranceItemTransition(index, animationStarted);
  const itemAnimate = getItemAnimateTarget(reduceMotion, animationStarted);

  return (
    <motion.li
      ref={itemRef}
      className={cn('relative flex gap-4', !isLast && 'max-lg:pb-6 lg:pb-10')}
      data-active={isActive ? '' : undefined}
      initial={reduceMotion ? false : ENTRANCE_ITEM_HIDDEN}
      animate={itemAnimate}
      transition={transition}
    >
      <div className="relative flex w-6 shrink-0 justify-center">
        <motion.button
          type="button"
          aria-current={isActive ? 'step' : undefined}
          aria-label={label}
          onClick={() => onSelect(item.id)}
          className="relative z-10 mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          animate={reduceMotion ? undefined : { scale: isActive ? 1.2 : 1 }}
          transition={{
            duration: ENTRANCE_DOT_SCALE_DURATION_SEC,
            ease: ENTRANCE_EASE,
          }}
        >
          <span
            data-commit-dot
            className={cn(
              'block h-3 w-3 rounded-full border-2 transition-colors',
              isActive
                ? 'border-foreground bg-foreground shadow-lg ring-4 ring-foreground/20'
                : 'border-muted-foreground bg-background',
            )}
            aria-hidden
          />
        </motion.button>
      </div>

      <button
        type="button"
        onClick={() => onSelect(item.id)}
        className={cn(
          'min-w-0 pt-0 text-left font-mono text-sm transition-colors truncate',
          isActive
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        {label}
      </button>
    </motion.li>
  );
}
