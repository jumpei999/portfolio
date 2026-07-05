import { getPrivateResume } from "@/lib/resume/load-resume"
import { toResolvedResume } from "@/lib/resume/to-resolved-resume"
import ResumeView from "@/components/resume/resume-view"

export default async function PrivateResumePage() {
  const data = await getPrivateResume()
  const resolved = toResolvedResume(data, "private")

  return <ResumeView data={resolved} />
}
