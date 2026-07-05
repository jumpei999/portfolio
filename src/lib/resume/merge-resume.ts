import type { ResumeData, ResumePartial } from "@/data/resume/types"

type IdKeyed = { id: string }

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function mergeIdArrays<T extends IdKeyed>(
  base: T[],
  override: T[] | undefined,
  mergeItem: (baseItem: T, overrideItem: T) => T,
): T[] {
  if (!override || override.length === 0) {
    return base
  }

  const result = base.map((item) => {
    const overrideItem = override.find((entry) => entry.id === item.id)
    return overrideItem ? mergeItem(item, overrideItem) : item
  })

  for (const overrideItem of override) {
    if (!result.some((item) => item.id === overrideItem.id)) {
      result.push(overrideItem)
    }
  }

  return result
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown>,
): T {
  const result = { ...base }

  for (const [key, value] of Object.entries(override)) {
    const baseValue = result[key]

    if (key === "experience" && Array.isArray(baseValue) && Array.isArray(value)) {
      result[key as keyof T] = mergeIdArrays(
        baseValue as IdKeyed[],
        value as IdKeyed[],
        (baseItem, overrideItem) =>
          mergeExperienceSection(
            baseItem as ResumeData["experience"][number],
            overrideItem as ResumePartial["experience"] extends (infer U)[]
              ? U
              : never,
          ),
      ) as T[keyof T]
      continue
    }

    if (
      value &&
      isPlainObject(value) &&
      baseValue &&
      isPlainObject(baseValue) &&
      !Array.isArray(baseValue)
    ) {
      result[key as keyof T] = deepMerge(baseValue, value) as T[keyof T]
    } else if (value !== undefined) {
      result[key as keyof T] = value as T[keyof T]
    }
  }

  return result
}

function mergeExperienceSection(
  base: ResumeData["experience"][number],
  override: NonNullable<ResumePartial["experience"]>[number],
): ResumeData["experience"][number] {
  const { projects: overrideProjects, ...sectionOverride } = override

  const merged = deepMerge(
    base as unknown as Record<string, unknown>,
    sectionOverride as Record<string, unknown>,
  ) as ResumeData["experience"][number]

  if (overrideProjects && overrideProjects.length > 0) {
    merged.projects = mergeIdArrays<
      ResumeData["experience"][number]["projects"][number]
    >(
      base.projects,
      overrideProjects as ResumeData["experience"][number]["projects"][number][],
      (baseProject, overrideProject) => {
        const { achievements, ...projectOverride } = overrideProject

        const mergedProject = deepMerge(
          baseProject as unknown as Record<string, unknown>,
          projectOverride as Record<string, unknown>,
        ) as ResumeData["experience"][number]["projects"][number]

        if (achievements) {
          mergedProject.achievements = achievements
        }

        return mergedProject
      },
    )
  }

  return merged
}

export function resolveResume(
  shared: ResumePartial,
  overrides: ResumePartial,
): ResumeData {
  return deepMerge(
    shared as unknown as Record<string, unknown>,
    overrides as Record<string, unknown>,
  ) as ResumeData
}
