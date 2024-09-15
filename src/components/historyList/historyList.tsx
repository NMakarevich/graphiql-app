'use client';

import { Link, List, Paper, Typography } from '@mui/material';
import styles from './historyList.module.scss';
import { useLocalStorage } from '@hooks/useLocalStorage.ts';
import { getHistoryList } from '@/utils/history/history.ts';
import HistoryListItem from '@components/historyListItem/historyListItem.tsx';
import { ROUTES } from '@/utils/constants/routes.ts';
import { useEffect, useState } from 'react';
import { HistoryItem } from '@components/historyList/types.ts';

function HistoryList(): JSX.Element {
  const [localStorage] = useLocalStorage('history', '{}');
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const historyList = getHistoryList(JSON.parse(localStorage));
    setHistoryList(historyList);
    setIsLoaded(true);
  }, [localStorage]);

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
                History is empty. Make first request:{' '}
              </Typography>
              <div className={styles.Nav}>
                <Link href={ROUTES.RESTFUL_CLIENT_PATH}>RESTful client</Link>
                <Link href={ROUTES.GRAPHIQL_PATH}>GraphQL</Link>
              </div>
            </div>
          )}
        </Paper>
      )}
    </>
  );
}

export default HistoryList;
