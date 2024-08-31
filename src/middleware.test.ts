import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import middleware from '@/middleware';
import { ROUTES } from '@/utils/constants/routes';
import { isAuthenticated } from '@/utils/auth/auth';

vi.mock('@/utils/auth/auth', () => ({
  isAuthenticated: vi.fn(),
}));

describe('middleware: ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('- should allow access if authenticated and route is protected', async () => {
    (isAuthenticated as unknown as Mock).mockResolvedValue(true);

    const request = {
      nextUrl: new URL(ROUTES.RESTFUL_CLIENT_PATH, 'http://test-url.com'),
    } as NextRequest;
    const response = await middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
  });

  it('- should allow access if route is not protected', async () => {
    (isAuthenticated as unknown as Mock).mockResolvedValue(false);

    const request = {
      nextUrl: new URL('/some-other-path', 'http://test-url.com'),
    } as NextRequest;
    const response = await middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
  });

  it('- should handle errors gracefully', async () => {
    (isAuthenticated as unknown as Mock).mockRejectedValue(
      new Error('Test error')
    );

    const request = {
      nextUrl: new URL(ROUTES.RESTFUL_CLIENT_PATH, 'http://test-url.com'),
    } as NextRequest;
    const response = await middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
  });
});
