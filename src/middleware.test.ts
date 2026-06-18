import { describe, it, expect, vi } from 'vitest';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { chain } from '@/middlewares/chain/chain';
import middlewareWithAuth from '@/middlewares/middlewareWithAuth/middlewareWithAuth';
import middlewareLocale from '@/middlewares/middlewareLocale/middlewareLocale';
import { config } from './middleware';

vi.mock('@/middlewares/middlewareWithAuth/middlewareWithAuth', () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockImplementation(
      (
        next: (
          req: NextRequest,
          event: NextFetchEvent,
          response: NextResponse
        ) => NextResponse
      ) =>
        (req: NextRequest, event: NextFetchEvent, response: NextResponse) => {
          return next(req, event, response);
        }
    ),
}));

vi.mock('@/middlewares/middlewareLocale/middlewareLocale', () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockImplementation(
      (
        next: (
          req: NextRequest,
          event: NextFetchEvent,
          response: NextResponse
        ) => NextResponse
      ) =>
        (req: NextRequest, event: NextFetchEvent, response: NextResponse) => {
          return next(req, event, response);
        }
    ),
}));

describe('Middleware chain: ', () => {
  it('- should execute middleware in the correct order', async () => {
    const request = new NextRequest('http://example.com/test');
    const event = {} as NextFetchEvent;
    const response = NextResponse.next();

    const middlewareChain = chain([middlewareLocale, middlewareWithAuth]);

    await middlewareChain(request, event, response);

    expect(middlewareLocale).toHaveBeenCalled();
    expect(middlewareWithAuth).toHaveBeenCalled();
  });
});

describe('Matcher Integration Test: ', () => {
  it('- should allow or deny requests based on matcher', async () => {
    const request = new Request('http://example.com/some-path');
    const { matcher } = config;

    const shouldMatch = new RegExp(matcher[0]).test(request.url);
    expect(shouldMatch).toBe(true);
  });
});
