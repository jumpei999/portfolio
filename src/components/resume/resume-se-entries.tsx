import type { ResumeSeEntry } from '@/data/resume/types';

type ResumeSeEntriesProps = {
  entries: ResumeSeEntry[];
};

export default function ResumeSeEntries({
  entries,
}: Readonly<ResumeSeEntriesProps>) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-normal">SE実績（主な担当プロジェクト）</p>
      <dl className="space-y-4 text-sm sm:text-base">
        {entries.map((entry) => (
          <div
            key={`${entry.client}-${entry.title}`}
            className="resume-se-entry min-w-0 break-inside-avoid"
          >
            <dt className="font-normal">
              {entry.client} / {entry.title}
              {entry.period ? (
                <span className="font-normal text-muted-foreground print:text-black/70">
                  {' '}
                  ({entry.period})
                </span>
              ) : null}
            </dt>
            <dd className="mt-1 space-y-2">
              <p>{entry.description}</p>
              {entry.technologies && entry.technologies.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5">
                  {entry.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
