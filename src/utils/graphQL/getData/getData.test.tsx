import { beforeEach, describe, expect, it, vi } from 'vitest';
import getData from './getData';
import getSchema from '../getSchema/getSchema';

beforeEach((): void => {
  vi.restoreAllMocks();
});

describe('getData: ', (): void => {
  it('- should fetch schema and return data, statusCode, and statusText.', async (): Promise<void> => {
    const mockSuccessResponse = {
      data: {
        __schema: {
          types: [],
        },
      },
      statusCode: 200,
      statusText: 'OK',
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () =>
        Promise.resolve({
          data: {
            __schema: {
              types: [],
            },
          },
        }),
    } as unknown as Response);

    const schema = await getSchema('http://correct-endpoint.com');

    expect(schema).toEqual({
      data: mockSuccessResponse.data,
      statusCode: mockSuccessResponse.statusCode,
      statusText: mockSuccessResponse.statusText,
    });
  });

  it('- should throw an error when the response is not ok.', async (): Promise<void> => {
    const endpoint = 'https://example.com/graphql';
    const headers = { Authorization: '' };
    const query = '{ users { id name } }';

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    } as unknown as Response);

    const fetchPromise = getData(endpoint, headers, query);

    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ query }),
    });
    await expect(fetchPromise).rejects.toThrow('401 - Unauthorized');
  });
});
