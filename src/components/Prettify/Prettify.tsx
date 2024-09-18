'use client';
import { Button } from '@mui/material';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/utils/localization/i18n';

export const Prettify = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);
  }, [i18n]);

  const formatCodeHandler = () => {
    document.body.dispatchEvent(new CustomEvent('format', { bubbles: true }));
  };

  return (
    <Button onClick={formatCodeHandler} title={t('graphqlFormatButton')}>
      <LightbulbCircleIcon />
    </Button>
  );
};
