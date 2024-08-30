import { FC } from 'react';
import Button from '@mui/material/Button';
import { IAuthProps } from './types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants/routes.ts';

const AuthControl: FC<IAuthProps> = (props): JSX.Element => {
  const { isAuth } = props;
  const router = useRouter();

  function signOut() {}

  function signIn() {
    router.push(ROUTES.SIGN_IN_PATH);
  }

  return isAuth ? (
    <Button variant="outlined" onClick={signOut}>
      Sign out
    </Button>
  ) : (
    <Button variant="contained" onClick={signIn}>
      Sign in
    </Button>
  );
};

export default AuthControl;
