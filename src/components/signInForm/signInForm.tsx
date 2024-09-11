'use client';

import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import styles from './form.module.scss';
import React, { useState } from 'react';
import { ROUTES } from '@/utils/constants/routes.ts';
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '@/utils/firebase/firebase';
import { setAuthCookie } from '@/utils/cookies/setAuthCookie';
import { ITextField } from '@components/inputController/types.ts';
import ISignInForm from '@components/signInForm/types.ts';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextFieldController from '@components/inputController/textFieldController.tsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signInSchema from '@/utils/validations/signInSchema.ts';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from 'next/navigation';
import { EUserEvent, localEventBus } from '@/utils/EventBus';
import { ECookies } from '@/utils/cookies/types';

export default function SignInForm(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ISignInForm>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema),
    mode: 'all',
  });

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: ISignInForm) => {
    const email = data.email as string;
    const password = data.password as string;
    if (email && password) {
      try {
        const user = await logInWithEmailAndPassword(email, password);
        setAuthCookie(ECookies.AUTH_TOKEN, user.token, 7);
        user.user.displayName
          ? setAuthCookie(ECookies.USER_NAME, user.user.displayName, 7)
          : null;

        localEventBus.emitEvent(EUserEvent.USER_LOGIN);
        router.push(ROUTES.GRAPHIQL_PATH);
      } catch (error) {
        console.error('Error signing in:', error);
      }
    }
  };

  const onSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      setAuthCookie(ECookies.AUTH_TOKEN, user.token, 7);
      user.user.displayName
        ? setAuthCookie(ECookies.USER_NAME, user.user.displayName, 7)
        : null;

      localEventBus.emitEvent(EUserEvent.USER_LOGIN);
      router.push(ROUTES.GRAPHIQL_PATH);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const textFields: ITextField<ISignInForm>[] = [
    {
      inputName: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      inputName: 'password',
      type: 'password',
      label: 'Password',
      slotProps: {
        input: {
          type: visiblePassword ? 'text' : 'password',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                {visiblePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      },
    },
  ];

  return (
    <Paper className={styles.Paper} sx={{ boxShadow: '0 0 3px 1px #D0BCFF' }}>
      <Typography component="h2">Sign In</Typography>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        {textFields.map(({ inputName, label, type, slotProps }, index) => (
          <TextFieldController<ISignInForm>
            key={index}
            inputName={inputName}
            label={label}
            type={type}
            control={control}
            slotProps={slotProps}
          />
        ))}
        <Button type="submit" variant={'contained'} disabled={!isValid}>
          Sign In
        </Button>
        <Button
          type="button"
          variant={'contained'}
          sx={{ gap: '5px' }}
          onClick={onSignInWithGoogle}
        >
          <GoogleIcon fontSize={'small'} />{' '}
          <Typography component={'span'}>Sign In with Google</Typography>
        </Button>
      </form>
      <Typography component="p">
        Not registered yet? <Link href={ROUTES.SIGN_UP_PATH}>Sign Up</Link>
      </Typography>
    </Paper>
  );
}
