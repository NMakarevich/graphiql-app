import { describe, it, expect } from 'vitest';
import { setAuthCookie } from './setAuthCookie';

describe('setAuthCookie:', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('- should set a cookie with the correct name, value, and expiration', () => {
    const name = 'authToken';
    const value = '12345';
    const hours = 2;

    setAuthCookie(name, value, hours);

    const cookies = document.cookie.split('; ').reduce(
      (acc, cookie) => {
        const [key, val] = cookie.split('=');
        acc[key] = val;
        return acc;
      },
      {} as Record<string, string>
    );

    expect(cookies[name]).toBe(value);
  });

  it('- should not overwrite other cookies', () => {
    document.cookie = 'existingCookie=oldValue; path=/;';

    const name = 'authToken';
    const value = '12345';
    const hours = 2;

    setAuthCookie(name, value, hours);

    const cookies = document.cookie.split('; ').reduce(
      (acc, cookie) => {
        const [key, val] = cookie.split('=');
        acc[key] = val;
        return acc;
      },
      {} as Record<string, string>
    );

    expect(cookies[name]).toBe(value);
    expect(cookies['existingCookie']).toBe('oldValue');
  });
});
