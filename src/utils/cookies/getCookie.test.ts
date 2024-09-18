import { describe, it, expect } from 'vitest';
import { getCookie } from './getCookie';

const mockCookie = (cookie: string) => {
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: cookie,
  });
};

describe('getCookie: ', () => {
  it('- should return null and false if document is undefined', () => {
    const originalDocument = global.document;
    global.document = undefined as any;

    const result = getCookie('testCookie');

    expect(result.cookie).toBe(null);
    expect(result.exists).toBe(false);

    global.document = originalDocument;
  });

  it('- should return the correct cookie value if it exists', () => {
    mockCookie('testCookie=value; anotherCookie=anotherValue');

    const result = getCookie('testCookie');

    expect(result.cookie).toBe('value');
    expect(result.exists).toBe(true);
  });

  it('- should return null and false if the cookie does not exist', () => {
    mockCookie('anotherCookie=anotherValue');

    const result = getCookie('testCookie');

    expect(result.cookie).toBe(null);
    expect(result.exists).toBe(false);
  });
});
