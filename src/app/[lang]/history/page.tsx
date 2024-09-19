/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Typography } from '@mui/material';
import HistoryList from '@components/historyList/historyList.tsx';
import styles from './page.module.scss';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/loader/loader';
import { useEffect, useState } from 'react';
import '@/utils/localization/i18n';

function History(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);

    setLoading(false);
  }, [i18n]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.Page}>
      <Typography variant="h2">{t('requestsHistory')}</Typography>
      <HistoryList />
    </div>
  );
}

export default History;
