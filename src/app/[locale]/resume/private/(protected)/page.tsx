import { getPrivateResume } from "@/lib/resume/load-resume"
import ResumeView from "@/components/resume/resume-view"

export default async function PrivateResumePage() {
  const data = await getPrivateResume()

  return <ResumeView data={data} />
}
