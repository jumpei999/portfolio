"use server"

import * as Sentry from "@sentry/nextjs"
import { headers } from "next/headers"
import { Resend } from "resend"
import { type ContactFormState } from "@/lib/contact/types"
import {
  escapeHtml,
  getContactFieldErrors,
  isHoneypotFilled,
  parseContactFields,
} from "@/lib/contact/validate"

async function submitContactHandler(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (isHoneypotFilled(formData)) {
    return { status: "success", resetKey: Date.now() }
  }

  const fields = parseContactFields(formData)
  const fieldErrors = getContactFieldErrors(fields)

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      fieldErrors,
      values: fields,
      resetKey: prevState.resetKey,
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    return {
      status: "error",
      errorKey: "errorConfig",
      values: fields,
      resetKey: prevState.resetKey,
    }
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: fields.email,
    subject: `Contact from ${fields.name}`,
    text: `From: ${fields.name} <${fields.email}>\n\n${fields.message}`,
    html: `<p><strong>From:</strong> ${escapeHtml(fields.name)} &lt;${escapeHtml(fields.email)}&gt;</p><p>${escapeHtml(fields.message).replaceAll("\n", "<br>")}</p>`,
  })

  if (error) {
    console.error("Resend error:", error)
    return {
      status: "error",
      errorKey: "error",
      values: fields,
      resetKey: prevState.resetKey,
    }
  }

  return { status: "success", resetKey: Date.now() }
}

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  return Sentry.withServerActionInstrumentation(
    "submitContact",
    {
      recordResponse: true,
      headers: await headers(),
    },
    async () => submitContactHandler(prevState, formData),
  )
}
