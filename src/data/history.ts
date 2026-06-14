export type HistoryCommitType = "feat" | "major"

export type HistoryItem = {
  id: string
  date: string
  type: HistoryCommitType
  title: string
  description: string
  tags: string[]
}

export const historyItems: HistoryItem[] = [
  {
    id: "freelancing",
    date: "2025",
    type: "feat",
    title: "Started Freelancing",
    description:
      "Began working as a freelance software engineer focusing on web and AI development.",
    tags: ["Next.js", "AWS", "OpenAI", "TypeScript"],
  },
  {
    id: "ai-development",
    date: "2024",
    type: "feat",
    title: "AI Development",
    description:
      "Built production AI features including LLM integrations, RAG pipelines, and agent workflows for client products.",
    tags: ["OpenAI", "Python", "LangChain", "Vector DB"],
  },
  {
    id: "saas-projects",
    date: "2022",
    type: "feat",
    title: "SaaS Projects",
    description:
      "Shipped multiple SaaS products end-to-end — from architecture and backend APIs to polished frontend experiences.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "software-engineer",
    date: "2019",
    type: "major",
    title: "Independent Career",
    description:
      "Transitioned into professional software engineering, building scalable web applications and internal tools.",
    tags: ["JavaScript", "TypeScript", "Git", "CI/CD"],
  },
  {
    id: "saas-projects1",
    date: "2022",
    type: "feat",
    title: "SaaS Projects",
    description:
      "Shipped multiple SaaS products end-to-end — from architecture and backend APIs to polished frontend experiences.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "saas-projects2",
    date: "2022",
    type: "feat",
    title: "SaaS Projects",
    description:
      "Shipped multiple SaaS products end-to-end — from architecture and backend APIs to polished frontend experiences.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "saas-projects3",
    date: "2022",
    type: "feat",
    title: "SaaS Projects",
    description:
      "Shipped multiple SaaS products end-to-end — from architecture and backend APIs to polished frontend experiences.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "saas-projects4",
    date: "2022",
    type: "feat",
    title: "SaaS Projects",
    description:
      "Shipped multiple SaaS products end-to-end — from architecture and backend APIs to polished frontend experiences.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "saas-projects5",
    date: "2022",
    type: "feat",
    title: "SaaS Projects",
    description:
      "Shipped multiple SaaS products end-to-end — from architecture and backend APIs to polished frontend experiences.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "saas-projects6",
    date: "2022",
    type: "feat",
    title: "SaaS Projects",
    description:
      "Shipped multiple SaaS products end-to-end — from architecture and backend APIs to polished frontend experiences.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "saas-projects7",
    date: "2022",
    type: "feat",
    title: "SaaS Projects",
    description:
      "Shipped multiple SaaS products end-to-end — from architecture and backend APIs to polished frontend experiences.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "saas-projects8",
    date: "2022",
    type: "feat",
    title: "SaaS Projects",
    description:
      "Shipped multiple SaaS products end-to-end — from architecture and backend APIs to polished frontend experiences.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
]

export const historyItemById = new Map(
  historyItems.map((item) => [item.id, item]),
)
