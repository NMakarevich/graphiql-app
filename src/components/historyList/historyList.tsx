'use client';

import { Link, List, Paper, Typography } from '@mui/material';
import styles from './historyList.module.scss';
import { useLocalStorage } from '@hooks/useLocalStorage.ts';
import {
  getHistoryList,
  LOCALSTORAGE_HISTORY_KEY,
} from '@/utils/history/history.ts';
import HistoryListItem from '@components/historyListItem/historyListItem.tsx';
import { ROUTES } from '@/utils/constants/routes.ts';
import { useEffect, useState } from 'react';
import { HistoryItem } from '@components/historyList/types.ts';
import Loader from '@components/loader/loader.tsx';
import { useTranslation } from 'react-i18next';
import '@/utils/localization/i18n';

function HistoryList(): JSX.Element {
  const [localStorageHook] = useLocalStorage(LOCALSTORAGE_HISTORY_KEY, '{}');
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);
  }, [i18n]);

  useEffect(() => {
    const historyList = getHistoryList(JSON.parse(localStorageHook));
    setHistoryList(historyList);
    setIsLoaded(true);
  }, [localStorageHook]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      {isLoaded && (
        <Paper className={styles.Paper}>
          {historyList.length > 0 ? (
            <List className={styles.List}>
              {historyList
                .sort((item1, item2) => item1.executedAt - item2.executedAt)
                .map((item) => (
                  <HistoryListItem key={item.executedAt} item={item} />
                ))}
            </List>
          ) : (
            <div>
              <Typography variant={'body1'} className={styles.Paragraph}>
                {t('historyEmptyMessage')}
              </Typography>

              <div className={styles.Nav}>
                <Link href={ROUTES.RESTFUL_CLIENT_PATH}>
                  {t('historyNavigateToRestfulClient')}
                </Link>

                <Link href={ROUTES.GRAPHIQL_PATH}>
                  {t('historyNavigateToGraphQL')}
                </Link>
              </div>
            </div>
          )}
        </Paper>
      )}
    </>
  );
}

export default HistoryList;
