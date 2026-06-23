"use client"

import { useActionState, useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import ContactFloatingField from "@/components/contact/contact-floating-field"
import EntranceMotion from "@/components/entrance-motion"
import PrivacyPolicyTrigger from "@/components/privacy/privacy-policy-trigger"
import { Button } from "@/components/ui/button"
import { Field, FieldError } from "@/components/ui/field"
import { submitContact } from "@/lib/contact/submit-contact"
import {
  EMPTY_CONTACT_FIELDS,
  INITIAL_CONTACT_FORM_STATE,
  type ContactFormState,
} from "@/lib/contact/types"
import {
  getContactFieldErrors,
  HONEYPOT_FIELD_NAME,
  parseContactFields,
  type ContactFieldErrorKey,
  type ContactFieldName,
  type ContactFields,
} from "@/lib/contact/validate"

type FieldErrors = Partial<Record<ContactFieldName, ContactFieldErrorKey>>

async function contactFormAction(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
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

  return submitContact(prevState, formData)
}

export default function ContactSectionContent() {
  const t = useTranslations("contact")
  const [state, formAction, isPending] = useActionState(
    contactFormAction,
    INITIAL_CONTACT_FORM_STATE,
  )
  const [values, setValues] = useState<ContactFields>(EMPTY_CONTACT_FIELDS)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [syncedActionState, setSyncedActionState] = useState(state)

  if (state !== syncedActionState) {
    setSyncedActionState(state)

    if (state.status === "success") {
      setValues(EMPTY_CONTACT_FIELDS)
      setFieldErrors({})
    } else {
      if (state.values) {
        setValues(state.values)
      }

      if (state.fieldErrors) {
        setFieldErrors(state.fieldErrors)
      } else if (state.errorKey) {
        setFieldErrors({})
      }
    }
  }

  useEffect(() => {
    if (state.status === "success") {
      toast.success(t("success"))
      return
    }

    if (state.status === "error" && state.errorKey) {
      toast.error(t(state.errorKey))
    }
  }, [state, t])

  function clearFieldError(field: ContactFieldName) {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]
      return next
    })
  }

  function updateField(field: ContactFieldName) {
    return (value: string) => {
      setValues((current) => ({ ...current, [field]: value }))
      clearFieldError(field)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const fields = parseContactFields(new FormData(event.currentTarget))
    setValues(fields)

    const errors = getContactFieldErrors(fields)
    if (Object.keys(errors).length > 0) {
      event.preventDefault()
      setFieldErrors(errors)
    }
  }

  function fieldErrorMessage(key: ContactFieldErrorKey | undefined) {
    return key ? t(`errors.${key}`) : null
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <EntranceMotion
        as="h2"
        delayIndex={0}
        className="text-4xl font-bold tracking-tight sm:text-5xl sm:pb-6 sm:text-center"
      >
        {t("heading")}
      </EntranceMotion>

      <EntranceMotion
        as="p"
        delayIndex={1}
        className="text-base sm:text-lg sm:leading-relaxed max-sm:text-sm max-sm:leading-relaxed"
      >
        {t("intro")}
      </EntranceMotion>

      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="space-y-10 pt-6"
        noValidate
      >
        <input
          type="text"
          name={HONEYPOT_FIELD_NAME}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          readOnly
          onFocus={(event) => event.currentTarget.removeAttribute("readOnly")}
          className="pointer-events-none absolute left-[-9999px] h-px w-px opacity-0"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <EntranceMotion delayIndex={2}>
            <Field data-invalid={!!fieldErrors.name}>
              <ContactFloatingField
                id="name"
                name="name"
                label={t("name")}
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={updateField("name")}
                disabled={isPending}
                invalid={!!fieldErrors.name}
              />
              <FieldError>{fieldErrorMessage(fieldErrors.name)}</FieldError>
            </Field>
          </EntranceMotion>
          <EntranceMotion delayIndex={3}>
            <Field data-invalid={!!fieldErrors.email}>
              <ContactFloatingField
                id="email"
                name="email"
                label={t("email")}
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={updateField("email")}
                disabled={isPending}
                invalid={!!fieldErrors.email}
              />
              <FieldError>{fieldErrorMessage(fieldErrors.email)}</FieldError>
            </Field>
          </EntranceMotion>
        </div>

        <EntranceMotion delayIndex={4}>
          <Field data-invalid={!!fieldErrors.message}>
            <ContactFloatingField
              id="message"
              name="message"
              label={t("message")}
              multiline
              rows={4}
              value={values.message}
              onChange={updateField("message")}
              disabled={isPending}
              invalid={!!fieldErrors.message}
            />
            <FieldError>{fieldErrorMessage(fieldErrors.message)}</FieldError>
          </Field>
        </EntranceMotion>

        <EntranceMotion
          className="flex flex-col items-center gap-4"
          delayIndex={5}
        >
          <p className="max-w-xl text-center text-sm text-muted-foreground">
            {t("privacyConsentBefore")}
            <PrivacyPolicyTrigger className="underline underline-offset-4 hover:text-foreground">
              {t("privacyConsentLink")}
            </PrivacyPolicyTrigger>
            {t("privacyConsentAfter")}
          </p>

          <Button type="submit" size="lg" className="px-8" disabled={isPending}>
            {isPending ? t("sending") : t("send")}
          </Button>
        </EntranceMotion>
      </form>
    </div>
  )
}
