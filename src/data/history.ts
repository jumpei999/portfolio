export const HISTORY_COMMIT_TYPES = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "build",
  "ci",
  "chore",
  "revert",
] as const

export type HistoryCommitType = (typeof HISTORY_COMMIT_TYPES)[number]

export type HistoryItemConfig = {
  id: string
  date: string
  type: HistoryCommitType
  breaking?: boolean
  title: string
  tags: string[]
}

export type HistoryItem = HistoryItemConfig & {
  description: string
}

export const HISTORY_ITEM_CONFIGS = [
  {
    id: "develop-vue-spring-boot",
    date: "2026",
    type: "feat",
    title: "enhance full-stack features using Vue.js and Spring Boot",
    tags: ["Vue.js", "Spring Boot"],
  },
  {
    id: "start-freelancing",
    date: "2026",
    type: "refactor",
    breaking: true,
    title: "decouple kernel from organization and migrate to freelance runtime",
    tags: ["Tax savings", "e-Tax"],
  },
  {
    id: "move-to-matsumoto",
    date: "2025",
    type: "perf",
    title: "optimize performance by migrating infrastructure to Matsumoto",
    tags: ["Japan Alps", "Clear Water", "Extreme Seasons"],
  },
  {
    id: "adopt-a-dog",
    date: "2023",
    type: "feat",
    title:
      "import Dog.js sub-module to intercept and handle brain-overheat exceptions",
    tags: ["Dog", "Mutt"],
  },
  {
    id: "start-skiing",
    date: "2022",
    type: "feat",
    breaking: true,
    title: "implement module to slide down snowy mountains on narrow planks",
    tags: ["Skiing", "Snowy Mountains", "Deep Powder"],
  },
  {
    id: "join-consulting-firm",
    date: "2022",
    type: "feat",
    title: "integrate enterprise management layer into core architecture",
    tags: ["Management", "Large-Scale Projects", "Spirit and Guts Approach"],
  },
  {
    id: "join-salesforce-partner-firm",
    date: "2017",
    type: "feat",
    title:
      "load cloud CRM plugin to expand multi-scale business development capabilities",
    tags: ["Salesforce", "CRM"],
  },
  {
    id: "work-as-a-programming-instructor",
    date: "2015",
    type: "feat",
    title: "expose public teaching API for rookies and kids",
    tags: ["Education", "Marketing"],
  },
  {
    id: "assignment-to-ishigaki",
    date: "2014",
    type: "feat",
    breaking: true,
    title: "deploy physical architecture and operations handler",
    tags: [
      "Construction",
      "Super Typhoon",
      "Starry Sky",
      "Blue Sea",
      "White Sand Beach",
      "Warmhearted People",
    ],
  },
  {
    id: "start-golfing",
    date: "2010",
    type: "feat",
    breaking: true,
    title:
      "implement module to swing a stick in greenery and drop a ball into a small hole",
    tags: ["Golf", "Full Swing"],
  },
  {
    id: "start-career",
    date: "2007",
    type: "feat",
    breaking: true,
    title: "init: boot software engineer lifecycle",
    tags: ["Java", "PHP", "JavaScript", "Open Systems"],
  },
] as const satisfies readonly HistoryItemConfig[]

export type HistoryItemId = (typeof HISTORY_ITEM_CONFIGS)[number]["id"]

export const HISTORY_ITEM_IDS = HISTORY_ITEM_CONFIGS.map((item) => item.id)
