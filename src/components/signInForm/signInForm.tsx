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
import { ITextField } from '@components/inputController/types.ts';
import ISignInForm from '@components/signInForm/types.ts';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextFieldController from '@components/inputController/textFieldController.tsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signInSchema from '@/utils/validations/signInSchema.ts';
import GoogleIcon from '@mui/icons-material/Google';

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

  function onSubmit(data: ISignInForm) {
    console.log(data);
  }

  function onSignInWithGoogle() {
    console.log('Sign In with Google');
  }

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
