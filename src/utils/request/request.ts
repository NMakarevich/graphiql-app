import RESTful from '@components/restfulLayout/types.ts';
import {
  generateBodyWithVariables,
  generateRequestHeaders,
} from '@/utils/restful/restful.ts';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';

export default async function request(data: RESTful) {
  const { baseURL, method, headers, body, variables } = data;
  const requestBody =
    method !== RESTful_METHODS.GET && body
      ? generateBodyWithVariables(body, variables)
      : null;
  return fetch(baseURL, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...generateRequestHeaders(headers),
    },
    body: requestBody,
  });
}
