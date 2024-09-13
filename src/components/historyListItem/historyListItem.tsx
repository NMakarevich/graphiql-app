import { HistoryItem } from '@components/historyList/types.ts';
import { ListItem, ListItemButton, Typography } from '@mui/material';
import styles from './historyListItem.module.scss';

function HistoryListItem({ item }: { item: HistoryItem }): JSX.Element {
  return (
    <ListItem key={item.executedAt}>
      <ListItemButton component="a" href={item.url}>
        <p className={styles.ListItem}>
          <Typography component="span" className={styles.Source}>
            {item.source}
          </Typography>
          <Typography component="span" className={styles.Date}>
            {new Date(item.executedAt).toLocaleString()}
          </Typography>
          <Typography component="span" className={styles.Url}>
            {item.labelUrl}
          </Typography>
        </p>
      </ListItemButton>
    </ListItem>
  );
}

export default HistoryListItem;
