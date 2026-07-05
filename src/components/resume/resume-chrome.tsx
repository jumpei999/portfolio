import type { Metadata } from "next"
import Link from "next/link"

export const resumeRobots: Metadata["robots"] = {
  index: false,
  follow: false,
}

export const resumeMetadata: Metadata = {
  title: "Resume",
  robots: resumeRobots,
}

type ResumeChromeProps = {
  children: React.ReactNode
}

export default function ResumeChrome({ children }: Readonly<ResumeChromeProps>) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="site-chrome-surface sticky top-0 z-10 border-b border-border">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-6 sm:px-10">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Portfolio
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
