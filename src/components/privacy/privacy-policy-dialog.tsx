"use client"

import { useTranslations } from "next-intl"
import PrivacyPolicyContent from "@/components/privacy/privacy-policy-content"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type PrivacyPolicyDialogProps = Readonly<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>

export default function PrivacyPolicyDialog({
  open,
  onOpenChange,
}: PrivacyPolicyDialogProps) {
  const t = useTranslations("privacy")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "flex max-h-[85svh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl",
        )}
      >
        <DialogHeader className="shrink-0 border-b border-border px-6 py-4 pr-12">
          <DialogTitle className="text-lg font-bold tracking-tight sm:text-xl">
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("lastUpdated")}</DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <PrivacyPolicyContent />
        </div>

        <DialogFooter className="shrink-0 border-t border-border px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              {t("close")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
