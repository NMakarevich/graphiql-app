import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants/routes.ts';
import { logout } from '@/utils/firebase/firebase';
import { deleteCookie } from '@/utils/cookies/deleteCookie';
import { getCookie } from '@/utils/cookies/getCookie';

import styles from './authControl.module.scss';

const AuthControl: FC = (): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authToken = getCookie('authToken');
      setIsAuth(!!authToken);
    };

    checkAuth();
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
