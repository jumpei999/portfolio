import Image from "next/image"
import type { PublicResumeData } from "@/data/resume/types"
import { renderInlineMarkdown } from "@/components/resume/render-inline-markdown"

type ResumeViewProps = {
  data: PublicResumeData
}

export default function ResumeView({ data }: ResumeViewProps) {
  return (
    <article className="mx-auto w-full max-w-4xl space-y-10 px-6 py-10 sm:px-10 sm:py-14">
      <header className="space-y-2 border-b border-border pb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {data.meta.documentTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          最終更新日: {data.meta.lastUpdated}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Links &amp; QR Codes</h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {data.links.intro}
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {[data.links.github, data.links.portfolio].map((link) => (
            <div
              key={link.url}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center"
            >
              <p className="text-sm font-medium">{link.label}</p>
              <Image
                src={link.qrSrc}
                alt={`${link.label} QR`}
                width={120}
                height={120}
                className="rounded-md"
              />
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                LINK
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">基本情報</h2>
        <ul className="space-y-2 text-sm sm:text-base">
          <li>
            <strong>氏名</strong>: {data.basicInfo.name}
          </li>
          <li>
            <strong>居住地</strong>: {data.basicInfo.address}
          </li>
          <li>
            <strong>連絡先</strong>:
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>電話番号: {data.basicInfo.phone}</li>
              <li>メール: {data.basicInfo.email}</li>
            </ul>
          </li>
          <li>
            <strong>稼働形態</strong>: {data.basicInfo.employmentType}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">経歴要約</h2>
        {data.summary.split("\n\n").map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="text-sm leading-relaxed sm:text-base sm:leading-7"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">技術スタック</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
          {data.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="text-xl font-semibold">職務経歴詳細</h2>
        {data.experience.map((section) => (
          <div key={section.id} className="space-y-5 border-t border-border pt-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                {section.heading} ({section.period})
              </h3>
              {section.department ? (
                <p className="text-sm text-muted-foreground">
                  <strong>部署</strong>: {section.department}
                  {section.position ? (
                    <>
                      {" "}
                      / <strong>役職</strong>: {section.position}
                    </>
                  ) : null}
                </p>
              ) : null}
              {section.position && !section.department ? (
                <p className="text-sm text-muted-foreground">
                  <strong>役職</strong>: {section.position}
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
              <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
                <li>
                  <strong>表彰歴</strong>: {section.awards.join("、")}
                </li>
              </ul>
            ) : null}

            {section.projects.map((project) => (
              <div key={project.id} className="space-y-3 rounded-lg bg-muted/30 p-4">
                <h4 className="font-medium">{project.title}</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <strong>期間</strong>: {project.period}
                  </li>
                  <li>
                    <strong>役割</strong>: {project.role}
                  </li>
                  {project.teamSize ? (
                    <li>
                      <strong>規模</strong>: {project.teamSize}
                    </li>
                  ) : null}
                  <li>
                    <strong>開発環境</strong>: {project.techStack}
                  </li>
                </ul>
                <div>
                  <p className="mb-2 text-sm font-medium">業務内容・成果</p>
                  <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
                    {project.achievements.map((achievement) => (
                      <li key={achievement}>
                        {renderInlineMarkdown(achievement)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {section.managementBullets ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">経営・マネジメント実績</p>
                <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
                  {section.managementBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {section.seBullets ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">SE実績（主な担当プロジェクト）</p>
                <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
                  {section.seBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ))}
      </section>
    </article>
  )
}
