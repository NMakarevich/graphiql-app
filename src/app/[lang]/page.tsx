'use client';

import Loader from '@/components/loader/loader';
import { useEffect, useState } from 'react';
import { Link, Paper, Typography, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { ROUTES } from '@/utils/constants/routes.ts';
import styles from './page.module.scss';
import { contributors } from '@/utils/constants/contributors.ts';
import { getCookie } from '@/utils/cookies/getCookie';
import { localEventBus } from '@/utils/eventBus/EventBus';
import { ECookies } from '@/utils/cookies/types';
import { EUserEvent } from '@/utils/eventBus/types';
import { useTranslation } from 'react-i18next';
import '@/utils/localization/i18n';

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');

  const { t, i18n } = useTranslation();

  useEffect((): (() => void) => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);

    const { exists } = getCookie(ECookies.AUTH_TOKEN);
    const cookiesUserName = getCookie(ECookies.USER_NAME);
    setAuthorized(exists);
    setUser(cookiesUserName.cookie || '');

    const unsubLogin = localEventBus.subscribeToEvent(
      EUserEvent.USER_SIGNIN,
      (): void => {
        setAuthorized(true);
        if (cookiesUserName.cookie) {
          setUser(cookiesUserName.cookie);
        }
      }
    );
    const unsubLogout = localEventBus.subscribeToEvent(
      EUserEvent.USER_SIGNOUT,
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
  }, [i18n]);

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
        {t('mainTitle')}
        {authorized && user ? `, ${user}` : ''}!
      </Typography>

      <Typography
        variant={'body1'}
        component="section"
        className={`${styles.Section} ${styles.About}`}
      >
        <Typography variant={'h4'}>{t('mainAboutApp')}</Typography>
        <Typography component={'p'}>{t('mainContent')}</Typography>
      </Typography>

      <Divider />

      <Typography
        variant={'body1'}
        component="section"
        className={`${styles.Section} ${styles.Team}`}
      >
        <Typography variant={'h4'}>{t('mainAboutTeam')}</Typography>
        <Typography component={'p'}>{t('mainTeamIntro')}</Typography>
        <ul>
          {contributors.map(({ name, role }) => (
            <li key={name}>
              <Typography component={'p'} className={styles.ListItem}>
                <CheckIcon fontSize={'small'} />
                {t(name)} - {t(role)}
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
        <Typography variant={'h4'}>{t('mainAboutCourse')}</Typography>
        <Typography component={'p'}>{t('mainCourseIntro')}</Typography>

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
              <CheckIcon fontSize={'small'} /> Git, GitHub (clone, add, commit,
              push, pull, merge, rebase, pull request flow)
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
              <CheckIcon fontSize={'small'} />
              {t('mainAPIInteraction')}
            </Typography>
          </li>
        </ul>
      </Typography>

      <Divider />
      {authorized ? (
        <div className={styles.Nav}>
          <Link href={ROUTES.RESTFUL_CLIENT_PATH}>{t('mainRestfulPath')}</Link>
          <Link href={ROUTES.GRAPHIQL_PATH}>{t('mainGraphQLPath')}</Link>
          <Link href={ROUTES.HISTORY_PATH}>{t('mainHistoryPath')}</Link>
        </div>
      ) : (
        <>
          <Typography variant={'body1'} className={styles.Paragraph}>
            {t('mainAuthRequired')}
          </Typography>

          <div className={styles.Nav}>
            <Link href={ROUTES.SIGN_IN_PATH}>{t('mainSignIn')}</Link>
            <Link href={ROUTES.SIGN_UP_PATH}>{t('mainSignUp')}</Link>
          </div>
        </>
      )}
    </Paper>
  );
}
