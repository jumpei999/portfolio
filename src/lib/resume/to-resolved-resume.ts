import type {
  PublicResumeData,
  Redactable,
  ResumeData,
} from "@/data/resume/types"

function resolveRedactable<T>(value: Redactable<T>, mode: "public" | "private"): T {
  return mode === "private" ? value.private : value.public
}

export function toResolvedResume(
  data: ResumeData,
  mode: "public" | "private",
): PublicResumeData {
  return {
    meta: data.meta,
    links: data.links,
    basicInfo: {
      name: resolveRedactable(data.basicInfo.name, mode),
      address: resolveRedactable(data.basicInfo.address, mode),
      phone: resolveRedactable(data.basicInfo.phone, mode),
      email: resolveRedactable(data.basicInfo.email, mode),
      employmentType: data.basicInfo.employmentType,
    },
    summary: data.summary,
    skills: data.skills,
    experience: data.experience.map((section) => ({
      id: section.id,
      heading: resolveRedactable(section.heading, mode),
      period: section.period,
      department: section.department,
      position: section.position,
      introBullets: section.introBullets,
      awards: section.awards,
      managementBullets: section.managementBullets,
      seBullets: section.seBullets,
      projects: section.projects.map((project) => ({
        id: project.id,
        title: project.title,
        period: project.period,
        role: project.role,
        teamSize: project.teamSize,
        techStack: project.techStack,
        achievements: project.achievements.map((achievement) =>
          resolveRedactable(achievement, mode),
        ),
      })),
    })),
  }
}
