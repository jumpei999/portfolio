import type { ResumeSkillGroup } from '@/data/resume/types';

type ResumeSkillsSectionProps = {
  skills: ResumeSkillGroup[];
};

export default function ResumeSkillsSection({
  skills,
}: Readonly<ResumeSkillsSectionProps>) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">技術スタック</h2>
      <dl className="space-y-3 sm:space-y-4">
        {skills.map((group) => (
          <div key={group.category} className="min-w-0 space-y-1">
            <dt className="text-sm font-normal text-muted-foreground print:text-black/70">
              {group.category}
            </dt>
            <dd className="min-w-0 text-sm leading-relaxed text-foreground sm:text-base print:text-black">
              {group.items.map((item, index) => (
                <span key={item} className="inline">
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="mx-0.5 text-muted-foreground print:text-black/50"
                    >
                      ・
                    </span>
                  ) : null}
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
