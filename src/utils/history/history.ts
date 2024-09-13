import { HistoryItem, HistoryUser } from '@components/historyList/types.ts';

export function saveToHistory(
  user: string,
  data: HistoryItem,
  history: HistoryUser
) {
  if (history[user]) history[user].push(data);
  else {
    history[user] = [data];
  }
  return history;
}

export function getHistoryList(user: string, history: HistoryUser) {
  return history[user] ? history[user] : [];
}
