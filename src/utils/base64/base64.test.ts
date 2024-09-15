import { decodeBase64, encodeBase64 } from '@/utils/base64/base64.ts';

describe('Base64', () => {
  const encodeValue1 = 'test Encode Value 1';
  const decodeValue1 = 'dGVzdCBFbmNvZGUgVmFsdWUgMQ==';

  it('should encode base64 correctly', () => {
    expect(encodeBase64(encodeValue1)).toBe(decodeValue1);
  });
  it('should decode base64 correctly', () => {
    expect(decodeBase64(decodeValue1)).toBe(encodeValue1);
  });
});
