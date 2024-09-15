'use client';

import { FC, useEffect, useState } from 'react';
import styles from './language-toggle.module.scss';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { ILanguageToggleProps } from './types';
import { useRouter } from 'next/navigation';

const LanguageToggle: FC<ILanguageToggleProps> = ({
  languages,
}): JSX.Element => {
  const { firstLanguage, secondLanguage } = languages;
  const en = 'en';
  const ru = 'ru';
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || en;
    const currentLocale = window.location.pathname.split('/')[1] || en;

    setChecked(savedLocale === ru);

    if (currentLocale !== savedLocale) {
      const currentPath = window.location.pathname;
      const pathSegments = currentPath
        .split('/')
        .filter((segment: string): string => segment);

      const newPath = `/${savedLocale}${pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : ''}`;

      router.push(newPath);
    }
  }, [router]);

  const toggleLanguage = (locale: string): void => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath
      .split('/')
      .filter((segment: string): string => segment);

    const newPath = `/${locale}${pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : ''}`;

    router.push(newPath);

    localStorage.setItem('LOCALE', locale);
    setChecked(locale === ru);
  };

  return (
    <div className={styles.Toggle}>
      <Typography
        className={styles.Language}
        onClick={(): void => toggleLanguage(en)}
      >
        {firstLanguage}
      </Typography>
      <Switch
        onChange={(): void => toggleLanguage(checked ? en : ru)}
        checked={checked}
      />
      <Typography
        className={styles.Language}
        onClick={(): void => toggleLanguage(ru)}
      >
        {secondLanguage}
      </Typography>
    </div>
  );
};

export default LanguageToggle;
