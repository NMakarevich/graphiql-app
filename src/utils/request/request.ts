import RESTful from '@components/restfulLayout/types.ts';
import { generateRequestHeaders } from '@/utils/restful/restful.ts';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';

export default async function request(data: RESTful) {
  const { baseURL, method, headers, body } = data;
  return fetch(baseURL, {
    method,
    headers: { ...generateRequestHeaders(headers) },
    body: method !== RESTful_METHODS.GET && body ? JSON.parse(body) : null,
  });
}
