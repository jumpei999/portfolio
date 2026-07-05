import { redirect } from "next/navigation"
import { isResumeAuthenticated } from "@/lib/resume/auth"
import ResumeLoginForm from "@/components/resume/resume-login-form"

export default async function PrivateResumeLoginPage() {
  if (await isResumeAuthenticated()) {
    redirect("/resume/private")
  }

  return (
    <section className="mx-auto w-full max-w-md space-y-6 px-6 py-16 sm:px-10">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          プライベート版 Resume
        </h1>
        <p className="text-sm text-muted-foreground">
          当月のパスワードを入力してください。
        </p>
      </div>
      <ResumeLoginForm />
    </section>
  )
}
