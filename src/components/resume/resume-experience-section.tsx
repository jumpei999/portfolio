import type { ResumeExperienceSection } from "@/data/resume/types"
import ResumeProjectCard from "@/components/resume/resume-project-card"
import ResumeSeEntries from "@/components/resume/resume-se-entries"

type ResumeExperienceSectionProps = {
  section: ResumeExperienceSection
}

export default function ResumeExperienceSection({
  section,
}: Readonly<ResumeExperienceSectionProps>) {
  return (
    <div className="resume-experience space-y-5 border-t border-border pt-6 print:break-inside-avoid">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">
          {section.heading} ({section.period})
        </h3>
        {section.department ? (
          <p className="text-sm text-muted-foreground print:text-black/80">
            <span className="font-normal text-foreground print:text-black">
              部署
            </span>
            : {section.department}
            {section.position ? (
              <>
                {" "}
                /{" "}
                <span className="font-normal text-foreground print:text-black">
                  役職
                </span>
                : {section.position}
              </>
            ) : null}
          </p>
        ) : null}
        {section.position && !section.department ? (
          <p className="text-sm text-muted-foreground print:text-black/80">
            <span className="font-normal text-foreground print:text-black">
              役職
            </span>
            : {section.position}
          </p>
        ) : null}
      </div>

      {section.introBullets ? (
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
          {section.introBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {section.awards ? (
        <div className="space-y-2">
          <p className="text-sm font-normal">表彰歴</p>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            {section.awards.map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {section.projects.map((project) => (
        <ResumeProjectCard key={project.id} project={project} />
      ))}

      {section.managementBullets ? (
        <div className="space-y-2">
          <p className="text-sm font-normal">経営・マネジメント実績</p>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            {section.managementBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {section.seBullets ? (
        <ResumeSeEntries entries={section.seBullets} />
      ) : null}
    </div>
  )
}
