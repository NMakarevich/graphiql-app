'use client ';

import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants/routes.ts';
import { logout } from '@/utils/firebase/firebase';
import { deleteCookie } from '@/utils/cookies/deleteCookie';
import { getCookie } from '@/utils/cookies/getCookie';
import styles from './authControl.module.scss';
import { EUserEvent, localEventBus } from '@/utils/EventBus';

const AuthControl: FC = (): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect((): (() => void) => {
    const { exists } = getCookie('authToken');
    setIsAuth(exists);

    const unsubLogin = localEventBus.subscribeToEvent(
      EUserEvent.USER_LOGIN,
      (): void => {
        setIsAuth(true);
      }
    );
    const unsubLogout = localEventBus.subscribeToEvent(
      EUserEvent.USER_LOGOUT,
      (): void => {
        setIsAuth(false);
      }
    );

    setLoading(false);

    return (): void => {
      unsubLogin();
      unsubLogout();
    };
  }, []);

  const handleSignOut = async (): Promise<void> => {
    try {
      const logoutUserAuth = await logout();
      if (!logoutUserAuth.userAuth) {
        await deleteCookie('authToken');
        localEventBus.emitEvent(EUserEvent.USER_LOGOUT);
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
      Sign out
    </Button>
  ) : (
    <div className={styles.Auth}>
      <Button variant="contained" onClick={handleSignIn}>
        Sign in
      </Button>
      <Button variant="contained" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default AuthControl;
