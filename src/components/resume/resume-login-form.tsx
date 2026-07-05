"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginToPrivateResume } from "@/lib/resume/login-action"

type LoginFormState = {
  error?: string
}

const initialState: LoginFormState = {}

export default function ResumeLoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginToPrivateResume,
    initialState,
  )

  return (
    <form action={formAction} className="mx-auto w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "確認中..." : "ログイン"}
      </Button>
    </form>
  )
}
