import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants/routes.ts';
import { logout } from '@/utils/firebase/firebase';
import { deleteCookie } from '@/utils/cookies/deleteCookie';
import { getCookie } from '@/utils/cookies/getCookie';

import styles from './authControl.module.scss';

const AuthControl: FC = (): JSX.Element => {
  // const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(!!getCookie('authToken'));
  const router = useRouter();

  // useEffect((): void => {
  // const authToken = getCookie('authToken');
  //   // setIsAuth(!!authToken);
  // }, [isAuth]);
  useEffect((): void => {
    const authToken = getCookie('authToken');
    setIsAuth(!!authToken);
  }, []);

  const handleSignOut = async () => {
    try {
      logout();
      deleteCookie('authToken');
      setIsAuth(false);
      router.push(ROUTES.HOME_PATH);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = () => {
    router.push(ROUTES.SIGN_IN_PATH);
  };

  function signUp() {
    router.push(ROUTES.SIGN_UP_PATH);
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
      <Button variant="contained" onClick={signUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default AuthControl;
