import { FC } from 'react';
import Button from '@mui/material/Button';
import { IAuthProps } from './types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants/routes.ts';
import styles from './authControl.module.scss';

const AuthControl: FC<IAuthProps> = (props): JSX.Element => {
  const { isAuth } = props;
  const router = useRouter();

  function signOut() {}

  function signIn() {
    router.push(ROUTES.SIGN_IN_PATH);
  }

  function signUp() {
    router.push(ROUTES.SIGN_UP_PATH);
  }

  return isAuth ? (
    <Button variant="outlined" onClick={signOut}>
      Sign out
    </Button>
  ) : (
    <div className={styles.Auth}>
      <Button variant="contained" onClick={signIn}>
        Sign in
      </Button>
      <Button variant="contained" onClick={signUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default AuthControl;
