import { Box, Button, Container, Typography } from '@mui/material';
import styles from './not-found.module.scss';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants/routes';

function Custom404(): JSX.Element {
  return (
    <Container component="section" maxWidth="sm" className={styles.container}>
      <Typography
        variant="h1"
        component="h1"
        className={styles.container__title}
        gutterBottom
      >
        <span>Error</span>
        <span className={styles.container__title_code}>404</span>
      </Typography>
      <Box mb={4}>
        <Typography
          variant="body1"
          color="textPrimary"
          component="p"
          className={styles.container__description}
        >
          Correct the address and repeat or start from the main one.
        </Typography>
      </Box>
      <Button
        color="primary"
        variant="contained"
        className={styles.container__button}
      >
        <Link href={ROUTES.HOME_PATH}>Go to Home</Link>
      </Button>
    </Container>
  );
}

export default Custom404;
