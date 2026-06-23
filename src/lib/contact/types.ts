import type {
  ContactFieldErrorKey,
  ContactFieldName,
  ContactFields,
} from "@/lib/contact/validate"

export type { ContactFieldErrorKey, ContactFieldName, ContactFields }

export type ContactFormErrorKey = "error" | "errorConfig"

export type ContactFormState = {
  status: "idle" | "success" | "error"
  errorKey?: ContactFormErrorKey
  fieldErrors?: Partial<Record<ContactFieldName, ContactFieldErrorKey>>
  values?: ContactFields
  resetKey: number
}

export const INITIAL_CONTACT_FORM_STATE: ContactFormState = {
  status: "idle",
  resetKey: 0,
}

export const EMPTY_CONTACT_FIELDS: ContactFields = {
  name: "",
  email: "",
  message: "",
}
