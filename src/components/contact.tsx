"use client"
import { motion, Variants } from "motion/react"
import { useTranslations } from "next-intl"
import Section from "@/components/section"

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

export default function Contact() {
  const t = useTranslations("contact")

  return (
    <Section id="contact">
      <div className="w-1/2 mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">{t("heading")}</h2>
        <div className="mb-12">{t("intro")}</div>
        <motion.form
          className="space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-240px" }}
          variants={containerVariants}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={itemVariants}
          >
            <InputGroup
              label={t("name")}
              type="text"
              placeholder={t("namePlaceholder")}
            />
            <InputGroup
              label={t("email")}
              type="email"
              placeholder={t("emailPlaceholder")}
            />
          </motion.div>
          <motion.div className="relative group" variants={itemVariants}>
            <textarea
              id="message"
              required
              rows={4}
              className="peer w-full bg-transparent border-b-2 border-slate-500 py-2 outline-none focus:border-slate-700 transition-colors resize-none"
            />
            <label
              htmlFor="message"
              className="absolute left-0 top-20 pointer-events-none transition-all duration-400 peer-focus:-top-6 peer-focus:text-sm peer-valid:-top-6 peer-valid:text-sm"
            >
              {t("message")}
            </label>
          </motion.div>
          <motion.div className="flex justify-center" variants={itemVariants}>
            <button className="group relative py-3 overflow-hidden bg-slate-700 font-bold text-slate-50 shadow-xs shadow-slate-700 transition-all duration-400 hover:brightness-120 hover:shadow-md hover:scale-105 active:scale-100">
              <span className="relative z-8 px-8">{t("send")}</span>
            </button>
          </motion.div>
        </motion.form>
      </div>
    </Section>
  )
}

function InputGroup({
  label,
  type,
  placeholder,
}: Readonly<{
  label: string
  type: string
  placeholder: string
}>) {
  return (
    <div className="relative group">
      <input
        type={type}
        required
        className="peer w-full border-b-2 border-slate-500 py-2 outline-none focus:border-slate-700 transition-colors placeholder-transparent"
        placeholder={placeholder}
      />
      <label className="absolute left-0 top-2 pointer-events-none transition-all duration-400 peer-focus:-top-6 peer-focus:text-sm peer-valid:-top-6 peer-valid:text-sm">
        {label}
      </label>
    </div>
  )
}
