import type { Metadata } from "next"
import "./resume-print.css"

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
    <div className="min-h-svh bg-background text-foreground print:bg-white print:text-black">
      <main>{children}</main>
    </div>
  )
}
