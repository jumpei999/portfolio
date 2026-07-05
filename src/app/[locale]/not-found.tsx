import { LogoTextLg } from "@/components/brand/logo-text-lg"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

export default async function NotFound() {
  const t = await getTranslations("errors")

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex w-full max-w-lg flex-col items-center gap-5">
        <LogoTextLg className="h-10 w-auto sm:h-12" aria-hidden />
        <h1 className="text-xl font-bold sm:text-2xl">
          {t("notFoundTitle")}
        </h1>
        <p className="text-base text-muted-foreground text-pretty">
          {t("notFoundDescription")}
        </p>
        <Link
          href="/"
          className="text-sm font-normal underline underline-offset-4 hover:text-foreground"
        >
          {t("notFoundHome")}
        </Link>
      </div>
    </main>
  )
}
