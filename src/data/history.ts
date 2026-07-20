export const HISTORY_COMMIT_TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
] as const;

export type HistoryCommitType = (typeof HISTORY_COMMIT_TYPES)[number];

export type HistoryItemConfig = {
  id: string;
  date: string;
  type: HistoryCommitType;
  breaking?: boolean;
};

export type HistoryItem = HistoryItemConfig & {
  title: string;
  tags: string[];
  description: string;
};

export const HISTORY_ITEM_CONFIGS = [
  {
    id: 'develop-vue-spring-boot',
    date: '2026',
    type: 'feat',
  },
  {
    id: 'start-freelancing',
    date: '2026',
    type: 'refactor',
    breaking: true,
  },
  {
    id: 'move-to-matsumoto',
    date: '2025',
    type: 'perf',
  },
  {
    id: 'adopt-a-dog',
    date: '2023',
    type: 'feat',
  },
  {
    id: 'start-skiing',
    date: '2022',
    type: 'feat',
    breaking: true,
  },
  {
    id: 'join-consulting-firm',
    date: '2022',
    type: 'feat',
  },
  {
    id: 'join-salesforce-partner-firm',
    date: '2017',
    type: 'feat',
  },
  {
    id: 'work-as-a-programming-instructor',
    date: '2015',
    type: 'feat',
  },
  {
    id: 'assignment-to-ishigaki',
    date: '2014',
    type: 'feat',
    breaking: true,
  },
  {
    id: 'start-golfing',
    date: '2010',
    type: 'feat',
    breaking: true,
  },
  {
    id: 'start-career',
    date: '2007',
    type: 'feat',
    breaking: true,
  },
] as const satisfies readonly HistoryItemConfig[];

export type HistoryItemId = (typeof HISTORY_ITEM_CONFIGS)[number]['id'];

export const HISTORY_ITEM_IDS = HISTORY_ITEM_CONFIGS.map((item) => item.id);
