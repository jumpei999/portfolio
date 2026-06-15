"use client"

import { useTranslations } from "next-intl"
import Section from "@/components/section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import EntranceMotion from "@/components/entrance-motion"
import { cn } from "@/lib/utils"

const underlineInputClass =
  "peer h-auto min-h-0 w-full rounded-none border-0 border-b-2 border-input bg-transparent px-0 py-2 shadow-none placeholder-transparent focus-visible:border-foreground focus-visible:ring-0 md:text-base"

const underlineTextareaClass =
  "peer field-sizing-fixed min-h-0 w-full resize-none rounded-none border-0 border-b-2 border-input bg-transparent px-0 py-2 shadow-none placeholder-transparent focus-visible:border-foreground focus-visible:ring-0 md:text-base"

const floatingLabelClass =
  "absolute left-0 top-2 pointer-events-none font-normal text-muted-foreground transition-all duration-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:-translate-x-0.5 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-translate-x-0.5"

const floatingMessageLabelClass = cn(
  floatingLabelClass,
  "peer-not-focus:peer-placeholder-shown:top-[calc(100%-2rem)]",
  "md:peer-not-focus:peer-placeholder-shown:top-[calc(100%-2.25rem)]",
)

type FloatingFieldProps = Readonly<{
  id: string
  label: string
  name: string
  type?: string
  autoComplete?: string
  multiline?: boolean
  rows?: number
}>

function FloatingField({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  multiline = false,
  rows = 4,
}: FloatingFieldProps) {
  const labelClass = multiline ? floatingMessageLabelClass : floatingLabelClass

  return (
    <div className="relative group">
      {multiline ? (
        <Textarea
          id={id}
          name={name}
          required
          rows={rows}
          placeholder=" "
          className={underlineTextareaClass}
        />
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          required
          autoComplete={autoComplete}
          placeholder=" "
          className={underlineInputClass}
        />
      )}
      <Label htmlFor={id} className={cn(labelClass)}>
        {label}
      </Label>
    </div>
  )
}

export default function Contact() {
  const t = useTranslations("contact")

  return (
    <Section id="contact" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <EntranceMotion
          as="h2"
          className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {t("heading")}
        </EntranceMotion>

        <EntranceMotion
          as="p"
          className="mb-12 text-start text-base sm:text-lg sm:leading-relaxed sm:text-muted-foreground max-sm:text-sm max-sm:leading-relaxed"
        >
          {t("intro")}
        </EntranceMotion>

        <form className="space-y-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <EntranceMotion>
              <FloatingField
                id="name"
                name="name"
                label={t("name")}
                type="text"
                autoComplete="name"
              />
            </EntranceMotion>
            <EntranceMotion>
              <FloatingField
                id="email"
                name="email"
                label={t("email")}
                type="email"
                autoComplete="email"
              />
            </EntranceMotion>
          </div>

          <EntranceMotion>
            <FloatingField
              id="message"
              name="message"
              label={t("message")}
              multiline
              rows={4}
            />
          </EntranceMotion>

          <EntranceMotion className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className={cn(
                "px-8",
                "ease-[cubic-bezier(0.24,1,0.32,1)]",
                "transition-none hover:scale-105 hover:transition-transform hover:duration-300",
                "active:scale-100 active:transition-transform active:duration-150",
                "motion-reduce:transition-none motion-reduce:hover:scale-100",
              )}
            >
              {t("send")}
            </Button>
          </EntranceMotion>
        </form>
      </div>
    </Section>
  )
}
