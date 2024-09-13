import { Typography } from '@mui/material';
import RestfulLayout from '@components/restfulLayout/restfulLayout.tsx';
import styles from './page.module.scss';

function RESTfullClient(): JSX.Element {
  return (
    <div className={styles.Page}>
      <Typography variant={'h2'}>RESTful Client</Typography>
      <RestfulLayout />
    </div>
  );
}

export default RESTfullClient;
