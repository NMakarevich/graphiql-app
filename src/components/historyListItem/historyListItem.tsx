import { HistoryItem } from '@components/historyList/types.ts';
import { ListItem, ListItemButton, Typography } from '@mui/material';
import styles from './historyListItem.module.scss';
import { usePathname } from 'next/navigation';

function HistoryListItem({ item }: { item: HistoryItem }): JSX.Element {
  const pathname = usePathname();
  const lang = pathname.split('/')[1];

  return (
    <ListItem key={item.executedAt}>
      <ListItemButton component="a" href={`/${lang}${item.url}`}>
        <p className={styles.ListItem}>
          <Typography component="span" className={styles.Source}>
            {item.source}
          </Typography>
          <Typography component="span" className={styles.Date}>
            {new Date(item.executedAt).toLocaleString()}
          </Typography>
          <Typography component="span" className={styles.Url}>
            {item.baseUrl}
          </Typography>
        </p>
      </ListItemButton>
    </ListItem>
  );
}

export default HistoryListItem;
