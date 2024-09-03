'use client';

import { Button, Link, Paper, TextField, Typography } from '@mui/material';
import styles from './form.module.scss';
import { ROUTES } from '@/utils/constants/routes.ts';
import { Controller, useForm } from 'react-hook-form';
import signUpSchema from '@components/signUpForm/signUpSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import ISignUpForm from '@components/signUpForm/types.ts';

export default function SignUpForm(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    resolver: yupResolver(signUpSchema),
    mode: 'all',
  });

  function onSubmit(data: ISignUpForm) {
    console.log(data);
  }

  return (
    <Paper
      className={styles.Paper}
      sx={{
        '& .MuiFormControl-root': {
          width: '100%',
        },
        '& .MuiFormLabel-root': { color: '#6750A4' },
      }}
    >
      <Typography component="h2">Sign Up</Typography>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Name"
              type="text"
              name="name"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              color="secondary"
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Email"
              type="email"
              name="email"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              color="secondary"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Password"
              type="password"
              name="password"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              color="secondary"
            />
          )}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              color="secondary"
            />
          )}
          name="confirmPassword"
        />
        <Button type="submit" variant={'contained'} disabled={!isValid}>
          Sign Up
        </Button>
      </form>
      <Typography component="p">
        Already registered?{' '}
        <Link href={ROUTES.SIGN_IN_PATH} color="secondary">
          Sign In
        </Link>
      </Typography>
    </Paper>
  );
}
