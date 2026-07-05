import type { PublicResumeData, ResumeData } from "@/data/resume/types"
import { toResolvedResume } from "@/lib/resume/to-resolved-resume"

export function toPublicResume(data: ResumeData): PublicResumeData {
  return toResolvedResume(data, "public")
}
