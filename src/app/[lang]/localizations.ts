import { IMainTranslation } from '@/locales/main/types';
import 'server-only';
interface ILocales {
  en: () => Promise<IMainTranslation>;
  ru: () => Promise<IMainTranslation>;
}

const locales: ILocales = {
  en: () => import('@/locales/main/en.json').then((module) => module.default),
  ru: () => import('@/locales/main/ru.json').then((module) => module.default),
};

export const getLocales = async (locale: keyof ILocales) => locales[locale]();
