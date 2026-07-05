import type { ResumeProject, ResumeRichText } from "@/data/resume/types"
import ResumeRichTextComponent from "@/components/resume/resume-rich-text"

const fieldRowClassName =
  "grid min-w-0 grid-cols-[minmax(4.5rem,6rem)_1fr] items-baseline gap-x-3 gap-y-0.5"
const labelClassName = "shrink-0 font-normal print:text-black"
const valueClassName = "min-w-0 print:text-black"

type ResumeProjectCardProps = {
  project: ResumeProject
}

function achievementKey(projectId: string, achievement: ResumeRichText) {
  const content = achievement
    .map((span) =>
      span.type === "text" ? span.value : `${span.label}:${span.href}`,
    )
    .join("|")

  return `${projectId}:${content}`
}

export default function ResumeProjectCard({
  project,
}: Readonly<ResumeProjectCardProps>) {
  return (
    <article className="resume-project space-y-3 rounded-lg bg-muted/30 p-4 print:rounded-none print:border-none print:bg-white print:p-3">
      <h4 className="font-normal">{project.title}</h4>
      <dl className="space-y-1 text-sm">
        <div className={fieldRowClassName}>
          <dt className={labelClassName}>期間</dt>
          <dd className={valueClassName}>{project.period}</dd>
        </div>
        <div className={fieldRowClassName}>
          <dt className={labelClassName}>役割</dt>
          <dd className={valueClassName}>{project.role}</dd>
        </div>
        {project.teamSize ? (
          <div className={fieldRowClassName}>
            <dt className={labelClassName}>規模</dt>
            <dd className={valueClassName}>{project.teamSize}</dd>
          </div>
        ) : null}
        <div className={fieldRowClassName}>
          <dt className={labelClassName}>開発環境</dt>
          <dd className={valueClassName}>
            {project.techStack.map((tech, index) => (
              <span key={tech} className="inline">
                {index > 0 ? (
                  <span
                    aria-hidden
                    className="mx-0.5 text-muted-foreground print:text-black/50"
                  >
                    ・
                  </span>
                ) : null}
                {tech}
              </span>
            ))}
          </dd>
        </div>
      </dl>
      <div>
        <p className="mb-2 text-sm font-normal">業務内容・成果</p>
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
          {project.achievements.map((achievement) => (
            <li key={achievementKey(project.id, achievement)}>
              <ResumeRichTextComponent content={achievement} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
