import { describe, it, expect, vi } from 'vitest';
import { getLocales } from './localizations';

const mockEnTranslation = { hello: 'Hello' };
const mockRuTranslation = { hello: 'Привет' };

vi.mock('@/locales/main/en.json', () => ({
  default: mockEnTranslation,
}));

vi.mock('@/locales/main/ru.json', () => ({
  default: mockRuTranslation,
}));

describe('getLocales: ', () => {
  it('- should return English translations', async () => {
    const result = await getLocales('en');
    expect(result).toEqual(mockEnTranslation);
  });

  it('- should return Russian translations', async () => {
    const result = await getLocales('ru');
    expect(result).toEqual(mockRuTranslation);
  });
});
