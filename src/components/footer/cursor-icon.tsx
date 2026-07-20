import { siCursor } from 'simple-icons';
import { cn } from '@/lib/utils';

type CursorIconProps = Readonly<{
  className?: string;
}>;

export default function CursorIcon({ className }: CursorIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('size-4', className)}
      aria-hidden
    >
      <path d={siCursor.path} />
    </svg>
  );
}
