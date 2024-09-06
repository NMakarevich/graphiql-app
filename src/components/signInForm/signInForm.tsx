'use client';

import { Button, Link, Paper, TextField, Typography } from '@mui/material';
import styles from './form.module.scss';
import { FormEvent } from 'react';
import { ROUTES } from '@/utils/constants/routes.ts';

export default function SignInForm(): JSX.Element {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
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
      <Typography component="h2">Sign In</Typography>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <TextField label="Email" type="email" name="email" color="secondary" />
        <TextField
          label="Password"
          type="password"
          name="password"
          color="secondary"
        />
        <Button type="submit" variant={'contained'}>
          Sign In
        </Button>
      </form>
      <Typography component="p">
        Not registered yet?{' '}
        <Link href={ROUTES.SIGN_UP_PATH} color="secondary">
          Sign Up
        </Link>
      </Typography>
    </Paper>
  );
}
