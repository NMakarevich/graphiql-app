import { Typography } from '@mui/material';
import HistoryList from '@components/historyList/historyList.tsx';
import styles from './page.module.scss';

function History(): JSX.Element {
  return (
    <div className={styles.Page}>
      <Typography variant="h2">Requests history</Typography>
      <HistoryList />
    </div>
  );
}

export default History;
