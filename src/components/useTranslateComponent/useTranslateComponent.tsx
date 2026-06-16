'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/utils/localization/i18n';

export default function UseTranslateComponent({
  translation,
}: {
  translation: string;
}) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);
  }, [i18n]);

  return t(translation);
}
