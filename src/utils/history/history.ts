import { HistoryItem, HistoryUser } from '@components/historyList/types.ts';
import RESTful from '@components/restfulLayout/types.ts';
import { generateURL } from '@/utils/restful/restful.ts';
import { getCookie } from '@/utils/cookies/getCookie.ts';
import { ECookies } from '@/utils/cookies/types.ts';
import type { RESTful_METHODS } from '../constants/RESTfulMethods';

const UNKNOWN_USER = 'UnknownUser';

export function saveToHistory(data: RESTful, localStorage: string) {
  const history: HistoryUser = JSON.parse(localStorage);
  const user = getCookie(ECookies.USER_NAME).cookie || UNKNOWN_USER;
  const historyItem: HistoryItem = getHistoryItem(
    data.method,
    data.baseURL,
    generateURL(data)
  );

  if (history[user]) history[user].push(historyItem);
  else {
    history[user] = [historyItem];
  }
  return JSON.stringify(history);
}

export function getGraphQLForHistory(
  historyItem: HistoryItem,
  localStorage: string
) {
  const history: HistoryUser = JSON.parse(localStorage);
  const user = getCookie(ECookies.USER_NAME).cookie || UNKNOWN_USER;
  const historyList = getHistoryList(history);

  historyList.push(historyItem);
  history[user] = historyList;

  return JSON.stringify(history);
}

export function getHistoryList(history: HistoryUser) {
  const user = getCookie(ECookies.USER_NAME).cookie || UNKNOWN_USER;
  return history[user] ? history[user] : [];
}

export function getHistoryItem(
  method: RESTful_METHODS | 'GRAPHQL',
  baseUrl: string,
  url: string
): HistoryItem {
  return {
    source: method,
    executedAt: new Date().getTime(),
    baseUrl: baseUrl,
    url: url,
  };
}
