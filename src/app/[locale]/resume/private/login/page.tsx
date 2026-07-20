import { redirect } from 'next/navigation';
import ResumeLoginForm from '@/components/resume/resume-login-form';
import { isResumeAuthenticated } from '@/lib/resume/auth';

export default async function PrivateResumeLoginPage() {
  if (await isResumeAuthenticated()) {
    redirect('/resume/private');
  }

  return (
    <section className="mx-auto w-full max-w-md space-y-6 px-6 py-16 sm:px-10">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          非公開版職務経歴書
        </h1>
        <p className="text-sm text-muted-foreground">
          パスワードは月初に更新されます。
        </p>
      </div>
      <ResumeLoginForm />
    </section>
  );
}
