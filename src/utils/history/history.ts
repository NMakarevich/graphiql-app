import { HistoryItem, HistoryUser } from '@components/historyList/types.ts';
import RESTful from '@components/restfulLayout/types.ts';
import { generateURL } from '@/utils/restful/restful.ts';
import { getCookie } from '@/utils/cookies/getCookie.ts';
import { ECookies } from '@/utils/cookies/types.ts';

const UNKNOWN_USER = 'UnknownUser';

export function saveToHistory(data: RESTful, localStorage: string) {
  const history: HistoryUser = JSON.parse(localStorage);
  const user = getCookie(ECookies.USER_NAME).cookie || UNKNOWN_USER;
  const historyItem: HistoryItem = {
    source: data.method,
    executedAt: new Date().getTime(),
    baseUrl: data.baseURL,
    url: generateURL(data),
  };
  if (history[user]) history[user].push(historyItem);
  else {
    history[user] = [historyItem];
  }
  return JSON.stringify(history);
}

export function getHistoryList(history: HistoryUser) {
  const user = getCookie(ECookies.USER_NAME).cookie || UNKNOWN_USER;
  return history[user] ? history[user] : [];
}
