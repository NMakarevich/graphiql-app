'use client';

import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants/routes.ts';
import { logout } from '@/utils/firebase/firebase';
import { deleteCookie } from '@/utils/cookies/deleteCookie';
import { getCookie } from '@/utils/cookies/getCookie';
import styles from './authControl.module.scss';
import { localEventBus } from '@/utils/eventBus/EventBus';
import { ECookies } from '@/utils/cookies/types';
import { EUserEvent } from '@/utils/eventBus/types';
import { useTranslation } from 'react-i18next';

const AuthControl: FC = (): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { t } = useTranslation();

  useEffect((): (() => void) => {
    const { exists } = getCookie(ECookies.AUTH_TOKEN);
    setIsAuth(exists);

    const unsubLogin = localEventBus.subscribeToEvent(
      EUserEvent.USER_SIGNIN,
      (): void => {
        setIsAuth(true);
      }
    );
    const unsubSignup = localEventBus.subscribeToEvent(
      EUserEvent.USER_SIGNUP,
      () => {
        setIsAuth(true);
      }
    );
    const unsubLogout = localEventBus.subscribeToEvent(
      EUserEvent.USER_SIGNOUT,
      (): void => {
        setIsAuth(false);
      }
    );

    setLoading(false);

    return (): void => {
      unsubLogin();
      unsubSignup();
      unsubLogout();
    };
  }, []);

  const handleSignOut = async (): Promise<void> => {
    try {
      const logoutUserAuth = await logout();
      if (!logoutUserAuth.userAuth) {
        await deleteCookie(ECookies.AUTH_TOKEN);
        localEventBus.emitEvent(EUserEvent.USER_SIGNOUT);
        router.push(ROUTES.HOME_PATH);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = (): void => router.push(ROUTES.SIGN_IN_PATH);
  const handleSignUp = (): void => router.push(ROUTES.SIGN_UP_PATH);

  if (loading) {
    return <></>;
  }

  return isAuth ? (
    <Button variant="outlined" onClick={handleSignOut}>
      {t('headerButtonSignOut')}
    </Button>
  ) : (
    <div className={styles.Auth}>
      <Button variant="contained" onClick={handleSignIn}>
        {t('headerButtonSignIn')}
      </Button>
      <Button variant="contained" onClick={handleSignUp}>
        {t('headerButtonSignUp')}
      </Button>
    </div>
  );
};

export default AuthControl;
