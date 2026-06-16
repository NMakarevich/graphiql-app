import { describe, it, expect } from 'vitest';
import { deleteCookie } from './deleteCookie';

describe('deleteCookie: ', () => {
  it('- should set cookie with expired date', () => {
    const originalCookie = document.cookie;
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });

    deleteCookie('testCookie');

    expect(document.cookie).toBe(
      'testCookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
    );
    document.cookie = originalCookie;
  });
});
