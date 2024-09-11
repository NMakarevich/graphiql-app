import RESTful, {
  HeaderItem,
  RESTfulHeaders,
} from '@components/restfulLayout/types.ts';
import { decodeBase64, encodeBase64 } from '@/utils/base64/base64.ts';

export function reduceHeaders(headers: RESTfulHeaders) {
  const headersArray: HeaderItem[] = [];
  headers.selected.forEach(({ isSelected }, index) => {
    headersArray.push({
      isSelected,
      key: headers.keys[index].key,
      value: headers.values[index].value,
    });
  });
  return headersArray;
}

export function filterHeaders(headers: HeaderItem[]) {
  return headers.filter(
    ({ isSelected, key, value }) => isSelected && key && value
  );
}

export function generateRequestHeaders(headers: HeaderItem[]) {
  return headers.reduce((acc: { [key: string]: string }, header) => {
    acc[header.key] = header.value;
    return acc;
  }, {});
}

export function generateSearchParams(headers: RESTfulHeaders) {
  const searchParams = new URLSearchParams();
  filterHeaders(reduceHeaders(headers)).forEach((header) =>
    searchParams.set(encodeURI(header.key), encodeURI(header.value))
  );
  return searchParams;
}

export function decodeSearchParams(searchParams: string) {
  const headers: RESTfulHeaders = { selected: [], keys: [], values: [] };
  if (!searchParams) return headers;
  searchParams
    .split('&')
    .map((pair) => pair.split('='))
    .map(([key, value]) => [decodeURI(key), decodeURI(value)])
    .forEach(([key, value]) => {
      headers.selected.push({ isSelected: true });
      headers.keys.push({ key });
      headers.values.push({ value });
    });
  return headers;
}

export function generateURL(data: RESTful) {
  const { method, baseURL, headers, body } = data;
  const baseURL64 = encodeBase64(baseURL);
  const body64 = body ? encodeBase64(body) : '';
  const searchParams = generateSearchParams(headers).toString();
  const path = [method, baseURL64, body64].filter((string) => string).join('/');
  const url = [path, searchParams].filter((string) => string).join('?');
  return `/${url}`;
}

export function parseURL(url: string, searchParams: string): RESTful {
  const headers = decodeSearchParams(searchParams);
  const [method, baseURL64, body64] = url.slice(1).split('/');
  const baseURL = baseURL64 ? decodeBase64(baseURL64) : '';
  const body = body64 ? decodeBase64(body64) : '';
  return <RESTful>{
    method,
    baseURL,
    body,
    headers,
  };
}
