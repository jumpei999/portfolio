import ResumeRichTextComponent from '@/components/resume/resume-rich-text';
import type { ResumeRichText } from '@/data/resume/types';

type ResumeSummarySectionProps = {
  summary: ResumeRichText[];
};

function paragraphKey(paragraph: ResumeRichText) {
  return paragraph
    .map((span) =>
      span.type === 'text' ? span.value : `${span.label}:${span.href}`,
    )
    .join('|');
}

export default function ResumeSummarySection({
  summary,
}: Readonly<ResumeSummarySectionProps>) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">経歴要約</h2>
      {summary.map((paragraph) => (
        <p
          key={paragraphKey(paragraph)}
          className="text-sm leading-relaxed sm:text-base sm:leading-7 print:text-black"
        >
          <ResumeRichTextComponent content={paragraph} />
        </p>
      ))}
    </section>
  );
}
