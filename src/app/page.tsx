'use client';

import Loader from '@/components/loader/loader';
import { useEffect, useState } from 'react';
import { Link, Paper, Typography, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { ROUTES } from '@/utils/constants/routes.ts';
import styles from './page.module.scss';
import { contributors } from '@/utils/constants/contributors.ts';
import { getCookie } from '@/utils/cookies/getCookie';
import { localEventBus, EUserEvent } from '@/utils/EventBus';
import { ECookies } from '@/utils/cookies/types';

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');

  useEffect((): (() => void) => {
    const { exists } = getCookie(ECookies.AUTH_TOKEN);
    const cookiesUserName = getCookie(ECookies.USER_NAME);
    setAuthorized(exists);

    const unsubLogin = localEventBus.subscribeToEvent(
      EUserEvent.USER_LOGIN,
      (): void => {
        setAuthorized(true);
        if (cookiesUserName.cookie) {
          setUser(cookiesUserName.cookie!);
        }
      }
    );
    const unsubLogout = localEventBus.subscribeToEvent(
      EUserEvent.USER_LOGOUT,
      (): void => {
        setAuthorized(false);
        setUser('');
      }
    );

    setLoading(false);

    return (): void => {
      unsubLogin();
      unsubLogout();
    };
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
        backgroundColor: 'rgba(12, 0, 29, 0.9)',
      }}
      className={styles.Paper}
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
          </Typography>
          <div className={styles.Nav}>
            <Link href={ROUTES.SIGN_IN_PATH}>Go to Sign In</Link>
            <Link href={ROUTES.SIGN_UP_PATH}>Go to Sign Up</Link>
          </div>
        </>
      )}
    </Paper>
  );
}
