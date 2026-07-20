import ResumeView from '@/components/resume/resume-view';
import { getPublicResume } from '@/lib/resume/load-resume';

export default async function PublicResumePage() {
  const data = await getPublicResume();

  return <ResumeView data={data} />;
}
