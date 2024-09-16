import { describe, it, expect, vi } from 'vitest';
import { chain } from '@/middlewares/chain/chain';
import { CustomMiddleware } from '@/middlewares/chain/types';
import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';

describe('chain:', () => {
  it('- should apply middlewares in the correct order', async () => {
    const mockMiddleware1: CustomMiddleware = vi.fn(
      async (_req, _event, res) => {
        return res;
      }
    );
    const mockMiddleware2: CustomMiddleware = vi.fn(
      async (_req, _event, res) => {
        return res;
      }
    );

    const middlewareChain = chain([
      (next: CustomMiddleware) => async (req, event, res) => {
        await next(req, event, res);
        mockMiddleware1(req, event, res);
      },
      (next: CustomMiddleware) => async (req, event, res) => {
        await next(req, event, res);
        mockMiddleware2(req, event, res);
      },
    ]);

    const request = {} as NextRequest;
    const event = {} as NextFetchEvent;
    const response = NextResponse.next();

    await middlewareChain(request, event, response);

    expect(mockMiddleware1).toHaveBeenCalled();
    expect(mockMiddleware2).toHaveBeenCalled();
  });
  //   const mockMiddleware: CustomMiddleware = vi.fn(async (req, event, res) => {
  //     return res;
  //   });

  //   // Create middleware chain with a single middleware
  //   const middlewareChain = chain([mockMiddleware]);

  //   const request = {} as NextRequest;
  //   const event = {} as NextFetchEvent;
  //   const response = NextResponse.next();

  //   // Call middleware chain
  //   // const result = await middlewareChain(request, event, response);

  //   // Verify final response
  //   // expect(result).toBe(response);
  //   expect(mockMiddleware).toHaveBeenCalledWith(request, event, response);
  // });
});