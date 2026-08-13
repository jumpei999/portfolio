'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type PointerEvent, useRef, useState } from 'react';
import {
  PROFILE_IMAGE_ALTERNATE,
  PROFILE_IMAGE_DEFAULT,
} from '@/data/profile-images';
import { useCanHover } from '@/hooks/use-can-hover';
import { cn } from '@/lib/utils';

export default function ProfileImageSwitcher() {
  const t = useTranslations('about');
  const canHover = useCanHover();
  const rootRef = useRef<HTMLButtonElement>(null);
  const [revealed, setRevealed] = useState(false);

  const hideReveal = () => {
    setRevealed(false);
  };

  const handlePointerEnter = () => {
    if (canHover) {
      setRevealed(true);
    }
  };

  const handlePointerLeave = () => {
    hideReveal();
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (canHover) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    setRevealed(true);
  };

  const handlePointerUp = () => {
    if (!canHover) {
      hideReveal();
    }
  };

  const handleFocus = () => {
    // Touch/mouse focus must not stick the alternate after press-and-hold.
    if (rootRef.current?.matches(':focus-visible')) {
      setRevealed(true);
    }
  };

  return (
    <button
      ref={rootRef}
      type="button"
      aria-label={t('profileImages.revealAria')}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={hideReveal}
      onFocus={handleFocus}
      onBlur={hideReveal}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
      className={cn(
        'relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl',
        'cursor-pointer touch-manipulation',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      )}
    >
      <Image
        src={PROFILE_IMAGE_ALTERNATE}
        alt=""
        fill
        sizes="(max-width: 768px) 80vw, 384px"
        className="object-cover"
        loading="lazy"
        aria-hidden
      />

      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-200',
          revealed ? 'opacity-0' : 'opacity-100',
        )}
      >
        <Image
          src={PROFILE_IMAGE_DEFAULT}
          alt={t('profileImages.alt')}
          fill
          sizes="(max-width: 768px) 80vw, 384px"
          className="object-cover"
          priority
        />
      </div>
    </button>
  );
}
