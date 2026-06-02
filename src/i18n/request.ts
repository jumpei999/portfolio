import { getRequestConfig } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const sharedMessages = (await import("../messages/shared.json")).default
  const localizedMessages = (await import(`../messages/${locale}.json`)).default

  return {
    locale,
    messages: deepMerge(sharedMessages, localizedMessages),
  }
})

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown>,
): T {
  const result = { ...base }

  for (const [key, value] of Object.entries(override)) {
    const baseValue = result[key]

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue)
    ) {
      result[key as keyof T] = deepMerge(
        baseValue as Record<string, unknown>,
        value as Record<string, unknown>,
      ) as T[keyof T]
    } else {
      result[key as keyof T] = value as T[keyof T]
    }
  }

  return result
}
