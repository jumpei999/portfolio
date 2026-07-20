'use client';

import dynamic from 'next/dynamic';
import { SECTION_VIEWPORT_HEIGHT } from '@/lib/section-shell';
import { cn } from '@/lib/utils';

const Constituents = dynamic(
  () => import('@/components/constituents/constituents-section'),
  {
    ssr: false,
    loading: () => (
      <div className={cn(SECTION_VIEWPORT_HEIGHT, 'w-full')} aria-hidden />
    ),
  },
);

export default function ConstituentsClient() {
  return <Constituents />;
}
