import { redirect } from "next/navigation"
import { isResumeAuthenticated } from "@/lib/resume/auth"

type ProtectedResumeLayoutProps = {
  children: React.ReactNode
}

export default async function ProtectedResumeLayout({
  children,
}: ProtectedResumeLayoutProps) {
  const authenticated = await isResumeAuthenticated()
  if (!authenticated) {
    redirect("/resume/private/login")
  }

  return children
}
