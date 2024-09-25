import { describe, it, expect } from 'vitest';
import { i18n, Locale } from './i18n-config';

describe('i18n Configuration: ', () => {
  it('- should have default locale set to "en"', () => {
    expect(i18n.defaultLocale).toBe('en');
  });

  it('- should include "en" in the locales array', () => {
    expect(i18n.locales).toContain('en');
  });

  it('- should include "ru" in the locales array', () => {
    expect(i18n.locales).toContain('ru');
  });

  it('- should not include "fr" in the locales array', () => {
    expect(i18n.locales).not.toContain('fr');
  });

  it('- should have correct type for Locale', () => {
    const validLocale: Locale = 'en';
    expect(['en', 'ru']).toContain(validLocale);
  });
});
