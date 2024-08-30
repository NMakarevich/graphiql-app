import { FC } from 'react';
import Button from '@mui/material/Button';
import { IAuthProps } from './types';

const Auth: FC<IAuthProps> = (props): JSX.Element => {
  const { isAuth } = props;

  function signOut() {}

  function signIn() {}

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

export default Auth;
