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
import { ROUTES } from '@/utils/constants/routes.ts';
import { useForm } from 'react-hook-form';
import signUpSchema from '@/utils/validations/signUpSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import ISignUpForm from '@components/signUpForm/types.ts';
import TextFieldController from '@components/inputController/textFieldController.tsx';
import { ITextField } from '@components/inputController/types.ts';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from 'react';
import { signUpWithEmailAndPassword } from '@/utils/firebase/firebase';
import { setAuthCookie } from '@/utils/cookies/setAuthCookie';
import { ECookies } from '@/utils/cookies/types';
import { localEventBus } from '@/utils/eventBus/EventBus';
import { useRouter } from 'next/navigation';
import { EUserEvent } from '@/utils/eventBus/types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Modal } from '@/components/Modal/Modal';

export default function SignUpForm(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ISignUpForm>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    resolver: yupResolver(signUpSchema),
    mode: 'all',
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleCPassword, setVisibleCPassword] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: ISignUpForm): Promise<void> => {
    const { name, email, password } = data;
    if (name && email && password) {
      try {
        await signUpWithEmailAndPassword(name, email, password);
        const auth = getAuth();
        onAuthStateChanged(auth, async (user): Promise<void> => {
          if (user) {
            const displayName = user.displayName;
            const token = await user.getIdToken();

            setAuthCookie(ECookies.AUTH_TOKEN, token, 1);
            displayName
              ? setAuthCookie(ECookies.USER_NAME, displayName, 1)
              : null;

            localEventBus.emitEvent(EUserEvent.USER_SIGNUP);
            router.push(ROUTES.HOME_PATH);
          }
        });
      } catch (error) {
        console.error('Error sign up:', error);
        if (error && error instanceof FirebaseError) {
          setErrorSignUp(error.message);
          console.log(error.message, errorSignUp, 1232);
        }
      }
    }
  };

  function onSignInWithGoogle() {
    console.log('Sign In with Google');
  }

  const closeModal = (): void => setErrorSignUp(null);

  const textFields: ITextField<ISignUpForm>[] = [
    {
      inputName: 'name',
      type: 'text',
      label: 'Name',
    },
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
    {
      inputName: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      slotProps: {
        input: {
          type: visibleCPassword ? 'text' : 'password',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => setVisibleCPassword(!visibleCPassword)}
              >
                {visibleCPassword ? <VisibilityOff /> : <Visibility />}
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
        <Typography component="h2" sx={{ fontWeight: 'bold' }}>
          Sign Up
        </Typography>
        <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
          {textFields.map(({ inputName, label, type, slotProps }, index) => (
            <TextFieldController<ISignUpForm>
              key={index}
              inputName={inputName}
              label={label}
              type={type}
              control={control}
              slotProps={slotProps}
            />
          ))}
          <Button type="submit" variant={'contained'} disabled={!isValid}>
            Sign Up
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
          Already registered? <Link href={ROUTES.SIGN_IN_PATH}>Sign In</Link>
        </Typography>
      </Paper>
      {errorSignUp && (
        <Modal isOpenModal onClose={closeModal}>
          {errorSignUp}
        </Modal>
      )}
    </>
  );
}
