'use client';

import Loader from '@/components/loader/loader';
import { isAuthenticated } from '@/utils/auth/auth';
import { useEffect, useState } from 'react';
import { Link, Paper, Typography, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { ROUTES } from '@/utils/constants/routes.ts';
import styles from './page.module.scss';
import { contributors } from '@/utils/constants/contributors.ts';

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);

  const user = 'User';

  useEffect((): void => {
    const checkAuth = async (): Promise<void> => {
      try {
        const result = await isAuthenticated;
        setAuthorized(result);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Paper
      sx={{
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
      elevation={2}
    >
      <Typography variant={'h2'} sx={{ alignSelf: 'center' }}>
        Welcome to GraphiQL/RESTful app{authorized ? `, ${user}` : ''}!
      </Typography>
      {authorized ? (
        <>
          <Typography
            variant={'body1'}
            component="section"
            className={`${styles.Section} ${styles.About}`}
          >
            <Typography variant={'h4'}>About App</Typography>
            <Typography component={'p'}>
              GraphiQL/RESTful is an application which provides functionality
              both GraphQL and RESTful client.
            </Typography>
          </Typography>
          <Divider />
          <Typography
            variant={'body1'}
            component="section"
            className={`${styles.Section} ${styles.Team}`}
          >
            <Typography variant={'h4'}>About Team</Typography>
            <Typography component={'p'}>Our team:</Typography>
            <ul>
              {contributors.map(({ name, role }) => (
                <li key={name}>
                  <Typography component={'p'} className={styles.ListItem}>
                    <CheckIcon fontSize={'small'} />
                    {name} - {role}
                  </Typography>
                </li>
              ))}
            </ul>
          </Typography>
          <Divider />
          <Typography
            variant={'body1'}
            component="section"
            className={`${styles.Section} ${styles.About}`}
          >
            <Typography variant={'h4'}>About Course</Typography>
            <Typography component={'p'}>
              This course is aimed at the students of the RS School who have
              passed RS School Stage #2 and at the new students who have
              experience with:
            </Typography>
            <ul>
              <li>
                <Typography component={'span'} className={styles.ListItem}>
                  <CheckIcon fontSize={'small'} /> JavaScript
                </Typography>
              </li>
              <li>
                <Typography component={'span'} className={styles.ListItem}>
                  <CheckIcon fontSize={'small'} /> TypeScript
                </Typography>
              </li>
              <li>
                <Typography component={'span'} className={styles.ListItem}>
                  <CheckIcon fontSize={'small'} /> Git, GitHub (clone, add,
                  commit, push, pull, merge, rebase, pull request flow)
                </Typography>
              </li>
              <li>
                <Typography component={'span'} className={styles.ListItem}>
                  <CheckIcon fontSize={'small'} /> NPM
                </Typography>
              </li>
              <li>
                <Typography component={'span'} className={styles.ListItem}>
                  <CheckIcon fontSize={'small'} /> CSS3 / HTML5
                </Typography>
              </li>
              <li>
                <Typography component={'span'} className={styles.ListItem}>
                  <CheckIcon fontSize={'small'} /> Understanding of how to
                  interact with APIs (general understanding of REST and GraphQL)
                </Typography>
              </li>
            </ul>
          </Typography>
          <Divider />
          <div className={styles.Nav}>
            <Link href={ROUTES.RESTFUL_CLIENT_PATH}>RESTful Client</Link>
            <Link href={ROUTES.GRAPHIQL_PATH}>GraphQL</Link>
            <Link href={ROUTES.HISTORY_PATH}>History</Link>
          </div>
        </>
      ) : (
        <>
          <Typography variant={'body1'} className={styles.Paragraph}>
            To use app you need to authorize.{' '}
            <div className={styles.Nav}>
              <Link href={ROUTES.SIGN_IN_PATH}>Go to Sign In</Link>
              <Link href={ROUTES.SIGN_UP_PATH}>Go to Sign Up</Link>
            </div>
          </Typography>
        </>
      )}
    </Paper>
  );
}
