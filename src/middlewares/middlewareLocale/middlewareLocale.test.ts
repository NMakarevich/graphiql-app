import { NextRequest, NextResponse } from 'next/server';
import { describe, it, expect, vi } from 'vitest';
import middlewareLocale from '@/middlewares/middlewareLocale/middlewareLocale';
import { CustomMiddleware } from '@/middlewares/chain/types';

describe('middlewareLocale: ', () => {
  it('- should call the next middleware if locale is present', async () => {
    const mockMiddleware: CustomMiddleware = vi.fn(
      async (_req, _event, res) => res
    );

    const request = {
      nextUrl: {
        pathname: '/en/some-path',
      },
      headers: new Headers({
        'accept-language': 'en',
      }),
    } as unknown as NextRequest;

    const response = NextResponse.next();

    const localeMiddleware = middlewareLocale(mockMiddleware);
    const result = await localeMiddleware(request, {} as any, response);

    expect(result).toBeInstanceOf(NextResponse);
    expect(mockMiddleware).toHaveBeenCalledWith(request, {}, response);
  });
});
