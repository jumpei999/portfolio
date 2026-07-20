import ResumeView from '@/components/resume/resume-view';
import { getPrivateResume } from '@/lib/resume/load-resume';

export default async function PrivateResumePage() {
  const data = await getPrivateResume();

  return <ResumeView data={data} />;
}
