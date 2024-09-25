'use server';

import RESTful from '@components/restfulLayout/types.ts';
import {
  generateBodyWithVariables,
  generateRequestHeaders,
} from '@/utils/restful/restful.ts';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';

export interface RestfulResponse {
  status: number;
  data: string;
}

export default async function request(data: RESTful) {
  const { baseURL, method, headers, body, variables } = data;
  const requestBody =
    method !== RESTful_METHODS.GET && body
      ? generateBodyWithVariables(body, variables)
      : null;
  try {
    const response = await fetch(baseURL, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...generateRequestHeaders(headers),
      },
      mode: 'cors',
      body: requestBody,
    });
    const data = await response.json();
    return {
      status: response.status,
      data,
    };
  } catch (error) {
    if (error instanceof Error)
      return {
        status: 500,
        data: { error: error.message },
      };
    return {
      status: 500,
      data: 'Something went wrong',
    };
  }
}
