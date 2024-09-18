/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Typography } from '@mui/material';
import RestfulLayout from '@components/restfulLayout/restfulLayout.tsx';
import styles from './page.module.scss';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';
import { notFound } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '@/utils/localization/i18n';
import { useEffect } from 'react';

function RESTfullClient({
  params,
}: {
  params: { method: string };
}): JSX.Element {
  const { t, i18n } = useTranslation();
  const methods: string[] = Object.values(RESTful_METHODS);

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);
  }, []);

  if (!methods.includes(params.method)) notFound();

  return (
    <div className={styles.Page}>
      <Typography variant={'h2'}>{t('restfulTitle')}</Typography>
      <RestfulLayout />
    </div>
  );
}

export default RESTfullClient;
