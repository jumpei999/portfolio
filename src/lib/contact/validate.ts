const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactFields = {
  name: string
  email: string
  message: string
}

export type ContactFieldName = keyof ContactFields

export type ContactFieldErrorKey =
  | "nameRequired"
  | "emailRequired"
  | "emailInvalid"
  | "messageRequired"

export const HONEYPOT_FIELD_NAME = "website"

export function parseContactFields(formData: FormData): ContactFields {
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  }
}

export function isHoneypotFilled(formData: FormData): boolean {
  return String(formData.get(HONEYPOT_FIELD_NAME) ?? "").trim().length > 0
}

export function getContactFieldErrors(
  fields: ContactFields,
): Partial<Record<ContactFieldName, ContactFieldErrorKey>> {
  const errors: Partial<Record<ContactFieldName, ContactFieldErrorKey>> = {}

  if (!fields.name) {
    errors.name = "nameRequired"
  }

  if (!fields.email) {
    errors.email = "emailRequired"
  } else if (!EMAIL_PATTERN.test(fields.email)) {
    errors.email = "emailInvalid"
  }

  if (!fields.message) {
    errors.message = "messageRequired"
  }

  return errors
}

export function validateContactFields(fields: ContactFields): boolean {
  return Object.keys(getContactFieldErrors(fields)).length === 0
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}
