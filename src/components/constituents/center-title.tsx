"use client"

import { motion } from "motion/react"

type CenterTitleProps = {
  title: string
  started: boolean
}

export default function CenterTitle({
  title,
  started,
}: Readonly<CenterTitleProps>) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <motion.h2
        className="text-center text-4xl font-bold tracking-tight drop-shadow-sm dark:drop-shadow-none dark:[text-shadow:0_0_20px_rgba(255,255,255,0.28),0_2px_16px_rgba(255,255,255,0.18)] md:text-6xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={
          started
            ? { type: "spring", stiffness: 280, damping: 22 }
            : { duration: 0 }
        }
      >
        {title}
      </motion.h2>
    </div>
  )
}
