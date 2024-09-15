import RESTful, {
  HeaderItem,
  RESTfulHeaders,
  RESTfulVariables,
} from '@components/restfulLayout/types.ts';
import { decodeBase64, encodeBase64 } from '@/utils/base64/base64.ts';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';

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

export function generateRequestHeaders(headers: RESTfulHeaders) {
  return filterHeaders(reduceHeaders(headers)).reduce(
    (acc: { [key: string]: string }, header) => {
      acc[header.key] = header.value;
      return acc;
    },
    {}
  );
}

export function generateRequestVariables(variables: RESTfulVariables) {
  const keys = Object.values(variables.keys).map(({ key }) => key);
  const values = Object.values(variables.values).map(({ value }) => value);
  const object: { [key: string]: string } = {};
  keys.forEach((key, index) => (object[key] = values[index]));
  return object;
}

export function generateBodyWithVariables(
  body: string,
  variables: RESTfulVariables
) {
  if (!body || !variables || Object.keys(variables).length === 0) return body;
  const reqVariables = generateRequestVariables(variables);
  return /"{{\w+}}"/g.test(body)
    ? body.replace(/"{{(\w+)}}"/g, (_, key) => {
        return isNaN(parseInt(reqVariables[key]))
          ? `"${reqVariables[key]}"`
          : reqVariables[key] || '';
      })
    : body.replace(/{{(\w+)}}/g, (_, key) => {
        return isNaN(parseInt(reqVariables[key]))
          ? `"${reqVariables[key]}"`
          : reqVariables[key] || '';
      });
}

export function addDoubleQuotes(body: string) {
  return body.replace(/{{(\w+)}}/g, (_, key) => `"{{${key}}}"`);
}

export function removeDoubleQuotes(body: string) {
  return body.replace(/"{{(\w+)}}"/g, (_, key) => `{{${key}}}`);
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
  const { method, baseURL, headers, body, variables } = data;
  const baseURL64 = encodeBase64(baseURL);
  const body64 = body
    ? encodeBase64(generateBodyWithVariables(body, variables))
    : '';
  const searchParams = generateSearchParams(headers).toString();
  const path = [method, baseURL64, body64].filter((string) => string).join('/');
  const url = [path, searchParams].filter((string) => string).join('?');
  return `/${url}`;
}

export function parseURL(
  url: string,
  searchParams: ReadonlyURLSearchParams
): RESTful {
  if (!url) {
    return <RESTful>{
      method: RESTful_METHODS.GET,
      baseURL: '',
      body: '',
      headers: {},
    };
  }
  const headers = searchParams
    ? decodeSearchParams(searchParams.toString())
    : {};
  const [, method, baseURL64, body64] = url.slice(1).split('/');
  const baseURL =
    baseURL64 && !/(?=[{}])/.test(decodeBase64(baseURL64))
      ? decodeBase64(baseURL64)
      : '';
  const body =
    baseURL64 && /(?=[{}])/.test(decodeBase64(baseURL64))
      ? decodeBase64(baseURL64)
      : body64
        ? decodeBase64(body64)
        : '';
  return <RESTful>{
    method,
    baseURL,
    body: prettify(body),
    headers,
  };
}

export function prettify(body: string) {
  try {
    if (/"{{\w+}}"/g.test(body)) {
      const json = JSON.parse(body);
      return JSON.stringify(json, null, 2);
    }
    const json = JSON.parse(addDoubleQuotes(body));
    return removeDoubleQuotes(JSON.stringify(json, null, 2));
  } catch {
    return body;
  }
}
