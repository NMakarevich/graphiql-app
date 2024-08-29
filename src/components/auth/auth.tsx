import { FC } from 'react';
import Button from '@mui/material/Button';

interface Props {
  isAuth: boolean;
}

const Auth: FC<Props> = (props) => {
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
