import { getPublicResume } from "@/lib/resume/load-resume"
import ResumeView from "@/components/resume/resume-view"

export default async function PublicResumePage() {
  const data = await getPublicResume()

  return <ResumeView data={data} />
}
