import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

export default async function NotFound() {
  const t = await getTranslations("errors")

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">{t("notFoundTitle")}</h1>
      <p className="max-w-md text-muted-foreground">{t("notFoundDescription")}</p>
      <Link
        href="/"
        className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
      >
        {t("notFoundHome")}
      </Link>
    </main>
  )
}
