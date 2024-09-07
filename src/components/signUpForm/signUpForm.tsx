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
import React from 'react';

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

  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [visibleCPassword, setVisibleCPassword] = React.useState(false);

  function onSubmit(data: ISignUpForm) {
    console.log(data);
  }

  function onSignInWithGoogle() {
    console.log('Sign In with Google');
  }

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
  );
}
