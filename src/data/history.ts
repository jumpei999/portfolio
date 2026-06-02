export type HistoryTag = "education" | "work" | "freelance"

export type HistoryEntryId = "kosen" | "maker" | "itCompany" | "freelance"

export type HistoryEntryMeta = {
  id: HistoryEntryId
  year: string
  image: string
  tag: HistoryTag
}

export const historyEntryMeta: HistoryEntryMeta[] = [
  {
    id: "kosen",
    year: "2010–2014",
    image: "/history/placeholder-01.svg",
    tag: "education",
  },
  {
    id: "maker",
    year: "2014–2019",
    image: "/history/placeholder-02.svg",
    tag: "work",
  },
  {
    id: "itCompany",
    year: "2019–2022",
    image: "/history/placeholder-03.svg",
    tag: "work",
  },
  {
    id: "freelance",
    year: "2022–",
    image: "/history/placeholder-04.svg",
    tag: "freelance",
  },
]
