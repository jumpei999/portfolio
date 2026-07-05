import type { Metadata } from "next"
import ResumeChrome, { resumeMetadata } from "@/components/resume/resume-chrome"

export const metadata: Metadata = resumeMetadata

type ResumeLayoutProps = {
  children: React.ReactNode
}

export default function ResumeLayout({ children }: Readonly<ResumeLayoutProps>) {
  return <ResumeChrome>{children}</ResumeChrome>
}
