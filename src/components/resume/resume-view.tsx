import ResumeBasicInfoSection from '@/components/resume/resume-basic-info-section';
import ResumeExperienceSection from '@/components/resume/resume-experience-section';
import ResumeLinksSection from '@/components/resume/resume-links-section';
import ResumeSkillsSection from '@/components/resume/resume-skills-section';
import ResumeSummarySection from '@/components/resume/resume-summary-section';
import type { ResumeData } from '@/data/resume/types';

type ResumeViewProps = {
  data: ResumeData;
};

export default function ResumeView({ data }: Readonly<ResumeViewProps>) {
  return (
    <article className="resume-document mx-auto w-full max-w-4xl space-y-10 px-6 py-10 sm:px-10 sm:py-14 print:max-w-none print:space-y-8 print:px-0 print:py-0">
      <header className="space-y-2 border-b border-border pb-8 print:border-neutral-400 print:pb-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl print:text-2xl">
          {data.meta.documentTitle}
        </h1>
        <p className="text-sm text-muted-foreground print:text-black/70">
          最終更新日: {data.meta.lastUpdated}
        </p>
      </header>

      <ResumeLinksSection links={data.links} />
      <ResumeBasicInfoSection basicInfo={data.basicInfo} />
      <ResumeSummarySection summary={data.summary} />
      <ResumeSkillsSection skills={data.skills} />
      <section className="space-y-8">
        <h2 className="text-xl font-bold">職務経歴詳細</h2>
        {data.experience.map((section) => (
          <ResumeExperienceSection key={section.id} section={section} />
        ))}
      </section>
    </article>
  );
}
