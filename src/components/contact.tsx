"use client"

import { motion, type Variants } from "motion/react"
import { useTranslations } from "next-intl"
import Section from "@/components/section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.24, 1, 0.32, 1],
    },
  },
}

const underlineInputClass =
  "peer h-auto min-h-0 w-full rounded-none border-0 border-b-2 border-input bg-transparent px-0 py-2 shadow-none placeholder-transparent focus-visible:border-foreground focus-visible:ring-0 md:text-base"

const underlineTextareaClass =
  "peer field-sizing-fixed min-h-0 w-full resize-none rounded-none border-0 border-b-2 border-input bg-transparent px-0 py-2 shadow-none placeholder-transparent focus-visible:border-foreground focus-visible:ring-0 md:text-base"

const floatingLabelClass =
  "absolute left-0 top-2 pointer-events-none font-normal transition-all duration-400 peer-focus:-top-6 peer-focus:text-sm peer-valid:-top-6 peer-valid:text-sm"

const floatingMessageLabelClass =
  "absolute left-0 top-20 pointer-events-none font-normal transition-all duration-400 peer-focus:-top-6 peer-focus:text-sm peer-valid:-top-6 peer-valid:text-sm"

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

  return (
    <Section id="contact">
      <div className="mx-auto w-full max-w-2xl px-6 md:w-1/2 md:max-w-none md:px-0">
        <h2 className="mb-12 text-center text-4xl font-bold">{t("heading")}</h2>
        <div className="mb-12">{t("intro")}</div>
        <motion.form
          className="space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-240px" }}
          variants={containerVariants}
        >
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            variants={itemVariants}
          >
            <FloatingField
              id="name"
              name="name"
              label={t("name")}
              type="text"
              autoComplete="name"
            />
            <FloatingField
              id="email"
              name="email"
              label={t("email")}
              type="email"
              autoComplete="email"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FloatingField
              id="message"
              name="message"
              label={t("message")}
              multiline
              rows={4}
            />
          </motion.div>
          <motion.div className="flex justify-center" variants={itemVariants}>
            <Button type="submit" className={submitButtonClass}>
              {t("send")}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </Section>
  )
}
