"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import Section from "@/components/section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEntranceAnimation } from "@/hooks/use-entrance-animation"
import { cn } from "@/lib/utils"

const underlineInputClass =
  "peer h-auto min-h-0 w-full rounded-none border-0 border-b-2 border-input bg-transparent px-0 py-2 shadow-none placeholder-transparent focus-visible:border-foreground focus-visible:ring-0 md:text-base"

const underlineTextareaClass =
  "peer field-sizing-fixed min-h-0 w-full resize-none rounded-none border-0 border-b-2 border-input bg-transparent px-0 py-2 shadow-none placeholder-transparent focus-visible:border-foreground focus-visible:ring-0 md:text-base"

const floatingLabelClass =
  "absolute left-0 top-2 pointer-events-none font-normal transition-all duration-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:-translate-x-0.5 peer-valid:-top-6 peer-valid:text-sm"

const floatingMessageLabelClass =
  "absolute left-0 top-20 pointer-events-none font-normal transition-all duration-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:-translate-x-0.5 peer-valid:-top-6 peer-valid:text-sm"

const submitButtonClass =
  "group relative overflow-hidden rounded-none bg-primary px-8 py-3 font-bold text-primary-foreground shadow-xs shadow-primary/30 transition-all duration-400 hover:scale-105 hover:brightness-110 hover:shadow-md active:scale-100 focus-visible:ring-ring border-primary hover:border-primary hover:bg-primary ring-0 hover:ring-0"

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
          className={underlineTextareaClass}
        />
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          required
          autoComplete={autoComplete}
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
  const { sectionRef, entranceProps } = useEntranceAnimation()

  return (
    <Section id="contact">
      <div
        ref={sectionRef}
        className="mx-auto w-full max-w-2xl px-6 md:w-1/2 md:max-w-none md:px-0"
      >
        <motion.h2
          className="mb-12 text-center text-4xl font-bold"
          {...entranceProps(0)}
        >
          {t("heading")}
        </motion.h2>

        <motion.div className="mb-12" {...entranceProps(1)}>
          {t("intro")}
        </motion.div>

        <form className="space-y-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div {...entranceProps(2)}>
              <FloatingField
                id="name"
                name="name"
                label={t("name")}
                type="text"
                autoComplete="name"
              />
            </motion.div>
            <motion.div {...entranceProps(3)}>
              <FloatingField
                id="email"
                name="email"
                label={t("email")}
                type="email"
                autoComplete="email"
              />
            </motion.div>
          </div>

          <motion.div {...entranceProps(4)}>
            <FloatingField
              id="message"
              name="message"
              label={t("message")}
              multiline
              rows={4}
            />
          </motion.div>

          <motion.div className="flex justify-center" {...entranceProps(5)}>
            <Button type="submit" className={submitButtonClass}>
              {t("send")}
            </Button>
          </motion.div>
        </form>
      </div>
    </Section>
  )
}
