import { describe, it, expect } from 'vitest';
import { LOCALE } from './locale';

describe('LOCALE Configuration', () => {
  it('should have RU locale path set to "/ru"', () => {
    expect(LOCALE.RU).toBe('/ru');
  });

  it('should have EN locale path set to "/en"', () => {
    expect(LOCALE.EN).toBe('/en');
  });

  it('should not have unexpected locale paths', () => {
    expect(Object.values(LOCALE)).not.toContain('/fr');
    expect(Object.values(LOCALE)).not.toContain('/es');
  });

  it('should have correct type for LOCALE values', () => {
    const ruPath: '/ru' = LOCALE.RU;
    const enPath: '/en' = LOCALE.EN;

    expect(ruPath).toBe('/ru');
    expect(enPath).toBe('/en');
  });
});
