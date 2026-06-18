'use client';

import { Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/utils/localization/i18n';

export const Submit = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);
  }, [i18n]);

  return (
    <Button type="submit" form="graphql" title={t('graphqlRequestButton')}>
      <PlayCircleIcon />
    </Button>
  );
};
