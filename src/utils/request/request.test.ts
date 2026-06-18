import { describe, it, expect, vi } from 'vitest';
import request from './request';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';
import RESTful from '@/components/restfulLayout/types';

vi.mock('@/utils/restful/restful.ts', () => ({
  generateBodyWithVariables: vi.fn(),
  generateRequestHeaders: vi.fn(),
}));

describe('request: ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('- should return 500 with error message on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const data = {
      baseURL: 'https://example.com/api',
      method: RESTful_METHODS.POST,
      headers: {},
      body: null,
      variables: {},
    };

    const result = await request(data as unknown as RESTful);

    expect(result).toEqual({
      status: 500,
      data: { error: 'Network error' },
    });
  });

  it('- should return a default error message if error is not an instance of Error', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue('Some error');

    const data = {
      baseURL: 'https://example.com/api',
      method: RESTful_METHODS.POST,
      headers: {},
      body: null,
      variables: {},
    };

    const result = await request(data as unknown as RESTful);

    expect(result).toEqual({
      status: 500,
      data: 'Something went wrong',
    });
  });
});
