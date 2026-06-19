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
    id: "launch-website",
    date: "2026",
    type: "feat",
    title: "Launched this website",
    tags: ["Next.js", "React", "Tailwind", "Shadcn", "Motion"],
  },
  {
    id: "vue-spring-boot-project",
    date: "2026",
    type: "feat",
    title: "Vue.js + Spring Boot Project",
    tags: ["Vue.js", "Spring Boot"],
  },
  {
    id: "start-freelancing",
    date: "2026",
    type: "refactor",
    breaking: true,
    title: "Started Freelancing",
    tags: ["Tax savings", "e-Tax"],
  },
  {
    id: "moved-to-matsumoto",
    date: "2025",
    type: "perf",
    title: "Moved to Matsumoto",
    tags: ["Japan Alps", "Clear Water", "Extreme Seasons"],
  },
  {
    id: "start-skiing",
    date: "2022",
    type: "feat",
    breaking: true,
    title: "Started Skiing",
    tags: ["Skiing", "Snowy Mountains", "Deep Powder"],
  },
  {
    id: "join-consulting-firm",
    date: "2022",
    type: "feat",
    title: "Joined a Consulting Firm",
    tags: ["Management", "Large-Scale Projects", "Spirit and Guts Approach"],
  },
  {
    id: "join-salesforce-partner-firm",
    date: "2017",
    type: "feat",
    title: "Joined a Salesforce Partner Firm",
    tags: ["Salesforce", "CRM", "SaaS"],
  },
  {
    id: "programming-instructor",
    date: "2015",
    type: "feat",
    title: "Programming Instructor for Kids & Rookies",
    tags: ["Education", "Marketing"],
  },
  {
    id: "long-term-on-site-in-ishigaki-island",
    date: "2014",
    type: "feat",
    breaking: true,
    title: "Long-Term On-Site in Ishigaki Island",
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
    title: "Started Golfing",
    tags: ["Golf", "Full Swing"],
  },
  {
    id: "start-career",
    date: "2007",
    type: "feat",
    breaking: true,
    title: "Started Career as a Software Engineer",
    tags: ["Java", "PHP", "JavaScript", "Open Systems"],
  },
] as const satisfies readonly HistoryItemConfig[]

export type HistoryItemId = (typeof HISTORY_ITEM_CONFIGS)[number]["id"]

export const HISTORY_ITEM_IDS = HISTORY_ITEM_CONFIGS.map((item) => item.id)
