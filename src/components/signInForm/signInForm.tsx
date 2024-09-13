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
  loginWithGoogle,
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
import { localEventBus } from '@/utils/eventBus/EventBus';
import { ECookies } from '@/utils/cookies/types';
import { EUserEvent } from '@/utils/eventBus/types';
import { FirebaseError } from 'firebase/app';
import { Modal } from '@/components/Modal/Modal';

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
  const [errorSignIn, setErrorSignIn] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: ISignInForm): Promise<void> => {
    const email = data.email as string;
    const password = data.password as string;
    if (email && password) {
      try {
        const userLogin = await logInWithEmailAndPassword(email, password);

        if (userLogin) {
          const displayName = userLogin.user.displayName;
          const token = await userLogin.user.getIdToken();

          setAuthCookie(ECookies.AUTH_TOKEN, token, 1);
          displayName
            ? setAuthCookie(ECookies.USER_NAME, displayName, 1)
            : null;

          localEventBus.emitEvent(EUserEvent.USER_SIGNIN);
          router.push(ROUTES.HOME_PATH);
        }
      } catch (error) {
        console.error('Error signing in:', error);
        if (error && error instanceof FirebaseError) {
          setErrorSignIn(error.message);
        }
      }
    }
  };

  const onSignInWithGoogle = async (): Promise<void> => {
    try {
      const user = await loginWithGoogle();
      console.log('User authenticated:', user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const closeModal = (): void => setErrorSignIn(null);

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
    <>
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
      {errorSignIn && (
        <Modal isOpenModal onClose={closeModal}>
          {errorSignIn}
        </Modal>
      )}
    </>
  );
}
