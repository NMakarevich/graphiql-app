import {
  RESTfulHeaders,
  RESTfulVariables,
} from '@components/restfulLayout/types.ts';
import {
  decodeSearchParams,
  generateBodyWithVariables,
  generateRequestHeaders,
  parseURL,
} from '@/utils/restful/restful.ts';
import { ReadonlyURLSearchParams } from 'next/navigation';

const formHeadersObject: RESTfulHeaders = {
  selected: [
    {
      isSelected: true,
    },
    {
      isSelected: true,
    },
  ],
  keys: [
    {
      key: 'Content-Type',
    },
    {
      key: 'Test-Key',
    },
  ],
  values: [
    {
      value: 'application/json',
    },
    {
      value: 'Test-Value',
    },
  ],
};

describe('restful', () => {
  it('generateRequestHeaders returns correct headers', () => {
    const requestHeaders = generateRequestHeaders(formHeadersObject);
    const expectedHeaders = {
      'Content-Type': 'application/json',
      'Test-Key': 'Test-Value',
    };
    expect(JSON.stringify(requestHeaders)).toBe(
      JSON.stringify(expectedHeaders)
    );
  });
  it('parseURL returns correct object', () => {
    const url =
      '/POST/aHR0cHM6Ly90YXNrcy5hcHAucnMuc2Nob29sL2FuZ3VsYXIvbG9naW4=/eyJlbWFpbCI6ICJ0ZXN0QHRlc3QxMjMiLCJwYXNzd29yZCI6ICJUZXN0QDEyIn0=';
    const searchParams = new ReadonlyURLSearchParams();
    const resultObject = parseURL(url, searchParams);
    const expectedObject = {
      method: 'POST',
      baseURL: 'https://tasks.app.rs.school/angular/login',
      body: '{\n  "email": "test@test123",\n  "password": "Test@12"\n}',
      headers: { selected: [], keys: [], values: [] },
    };
    const isEqual =
      JSON.stringify(expectedObject) === JSON.stringify(resultObject);
    expect(isEqual).toBeTruthy();
  });
  it('generateBodyWithVariables should return body with inserted variables values', () => {
    const body = '{"test1": {{test1}},"test2": {{test2}}}';
    const variables: RESTfulVariables = {
      keys: [{ key: 'test1' }, { key: 'test2' }],
      values: [{ value: '1' }, { value: '2' }],
    };
    const resultBody = generateBodyWithVariables(body, variables);
    const expectedBody = '{"test1": 1,"test2": 2}';
    expect(resultBody).toBe(expectedBody);
  });
  it('decodeSearchParams should return correct object', () => {
    const searchParams = 'Content-Type=application/json&Test-Key=Test-Value';
    const resultObject = decodeSearchParams(searchParams);
    expect(JSON.stringify(resultObject)).toBe(
      JSON.stringify(formHeadersObject)
    );
  });
});
