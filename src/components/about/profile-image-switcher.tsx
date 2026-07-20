'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type KeyboardEvent, useState } from 'react';
import {
  clampProfileImageIndex,
  PROFILE_IMAGES,
  pickRandomProfileIndex,
} from '@/data/profile-images';
import { cn } from '@/lib/utils';

type ProfileImageSwitcherProps = {
  initialIndex: number;
};

export default function ProfileImageSwitcher({
  initialIndex,
}: Readonly<ProfileImageSwitcherProps>) {
  const t = useTranslations('about');
  const [currentIndex, setCurrentIndex] = useState(() =>
    clampProfileImageIndex(initialIndex),
  );

  const currentImage = PROFILE_IMAGES[currentIndex];

  const randomizeImage = () => {
    setCurrentIndex((current) => pickRandomProfileIndex(current));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      randomizeImage();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={randomizeImage}
        onKeyDown={handleKeyDown}
        aria-label={t('profileImages.randomizeAria')}
        className={cn(
          'relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        )}
      >
        <Image
          src={currentImage.src}
          alt={t(`profileImages.${currentImage.imageKey}.alt`)}
          fill
          sizes="(max-width: 768px) 80vw, 384px"
          className="object-cover"
        />
      </button>
      <p className="w-full text-right text-sm text-muted-foreground px-2">
        {t(`profileImages.${currentImage.imageKey}.label`)}
      </p>
    </div>
  );
}
