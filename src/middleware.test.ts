import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import middleware from '@/middleware';
import { ROUTES } from '@/utils/constants/routes';

describe('middleware: ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('- should redirect to sign-in if not authenticated and route is protected', async () => {
    const request = {
      nextUrl: new URL(ROUTES.RESTFUL_CLIENT_PATH, 'http://test-url.com'),
      headers: {
        get: () => 'someOtherCookie=someValue',
      },
    } as unknown as NextRequest;

    const response = await middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.headers.get('Location')).toBe(
      new URL(ROUTES.SIGN_IN_PATH, 'http://test-url.com').toString()
    );
  });

  it('- should redirect to home if authenticated and route is for authentication', async () => {
    const request = {
      nextUrl: new URL(ROUTES.SIGN_IN_PATH, 'http://test-url.com'),
      headers: {
        get: () => 'authToken=validToken',
      },
    } as unknown as NextRequest;

    const response = await middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.headers.get('Location')).toBe(
      new URL(ROUTES.HOME_PATH, 'http://test-url.com').toString()
    );
  });

  it('- should allow access if route is not protected and user is not authenticated', async () => {
    const request = {
      nextUrl: new URL('/some-other-path', 'http://test-url.com'),
      headers: {
        get: () => '',
      },
    } as unknown as NextRequest;

    const response = await middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
  });

  it('- should handle errors gracefully', async () => {
    const request = {
      nextUrl: new URL(ROUTES.RESTFUL_CLIENT_PATH, 'http://test-url.com'),
      headers: {
        get: () => {
          throw new Error('Test error');
        },
      },
    } as unknown as NextRequest;

    const response = await middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(500);
  });
});
