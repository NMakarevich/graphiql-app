import styles from './responseStatus.module.scss';
import { Typography } from '@mui/material';

function ResponseStatus({ status }: { status: number }) {
  const style = Math.floor(status / 100) === 2 ? 'success' : 'error';

  return (
    !!status && (
      <Typography component={'p'} className={styles.Status}>
        Status:
        <Typography className={styles[style]} component={'span'}>
          {status}
        </Typography>
      </Typography>
    )
  );
}

export default ResponseStatus;
