import type { HistoryCommitType, HistoryItem } from '@/data/history';

export function formatHistoryCommitPrefix(
  type: HistoryCommitType,
  breaking?: boolean,
): string {
  return breaking ? `${type}!` : type;
}

export function formatHistoryCommitLabel(
  item: Pick<HistoryItem, 'type' | 'breaking' | 'title'>,
): string {
  return `${formatHistoryCommitPrefix(item.type, item.breaking)}: ${item.title}`;
}

export function findHistoryItemById(
  items: HistoryItem[],
  id: string,
): HistoryItem | undefined {
  return items.find((item) => item.id === id);
}
