"use client"

import Image from "next/image"
import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  clampProfileImageIndex,
  pickRandomProfileIndex,
  PROFILE_IMAGES,
} from "@/data/profile-images"

type ProfileImageSwitcherProps = {
  initialIndex: number
}

export default function ProfileImageSwitcher({
  initialIndex,
}: Readonly<ProfileImageSwitcherProps>) {
  const t = useTranslations("about")
  const [currentIndex, setCurrentIndex] = useState(() =>
    clampProfileImageIndex(initialIndex),
  )

  const currentImage = PROFILE_IMAGES[currentIndex]

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl">
        <Image
          src={currentImage.src}
          alt={t(`profileImages.${currentImage.imageKey}.alt`)}
          fill
          sizes="(max-width: 768px) 80vw, 384px"
          className="object-cover cursor-pointer"
          onClick={() =>
            setCurrentIndex((current) => pickRandomProfileIndex(current))
          }
        />
      </div>
      <p className="w-full text-right text-sm text-slate-500 px-2">
        {t(`profileImages.${currentImage.imageKey}.label`)}
      </p>
    </div>
  )
}
