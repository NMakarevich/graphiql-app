import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { describe, it, expect, vi } from 'vitest';
import middlewareWithAuth from '@/middlewares/middlewareWithAuth/middlewareWithAuth';
import { CustomMiddleware } from '@/middlewares/chain/types';

describe('middlewareWithAuth: ', () => {
  it('- should redirect to home if no auth token and path is protected', async () => {
    const mockMiddleware: CustomMiddleware = vi.fn(
      async (_req, _event, res) => res
    );

    const request = {
      headers: new Headers({
        cookie: '',
      }),
      nextUrl: {
        pathname: '/protected-path',
        origin: 'https://example.com',
      },
    } as unknown as NextRequest;

    const response = NextResponse.next();

    const authMiddleware = middlewareWithAuth(mockMiddleware);
    const result = await authMiddleware(
      request,
      {} as NextFetchEvent,
      response
    );

    expect(result).toBeInstanceOf(NextResponse);
  });

  it('- should redirect to home if auth token is present and path is for sign-in or sign-up', async () => {
    const mockMiddleware: CustomMiddleware = vi.fn(
      async (_req, _event, res) => res
    );

    const request = {
      headers: new Headers({
        cookie: 'auth-token=valid-token',
      }),
      nextUrl: {
        pathname: '/sign-in',
        origin: 'https://example.com',
      },
    } as unknown as NextRequest;

    const response = NextResponse.next();

    const authMiddleware = middlewareWithAuth(mockMiddleware);
    const result = await authMiddleware(
      request,
      {} as NextFetchEvent,
      response
    );

    expect(result).toBeInstanceOf(NextResponse);
  });

  it('- should call the next middleware if auth token is present and path is not for sign-in or sign-up', async () => {
    const mockMiddleware: CustomMiddleware = vi.fn(
      async (_req, _event, res) => res
    );

    const request = {
      headers: new Headers({
        cookie: 'auth-token=valid-token',
      }),
      nextUrl: {
        pathname: '/some-path',
      },
    } as unknown as NextRequest;

    const response = NextResponse.next();

    const authMiddleware = middlewareWithAuth(mockMiddleware);
    const result = await authMiddleware(
      request,
      {} as NextFetchEvent,
      response
    );

    expect(result).toBeInstanceOf(NextResponse);
    expect(mockMiddleware).toHaveBeenCalledWith(request, {}, response);
  });
});
