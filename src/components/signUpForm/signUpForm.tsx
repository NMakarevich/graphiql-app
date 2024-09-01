'use client';

import { Button, Link, Paper, TextField, Typography } from '@mui/material';
import styles from './form.module.scss';
import { FormEvent } from 'react';
import { ROUTES } from '@/utils/constants/routes.ts';

export default function SignUpForm(): JSX.Element {
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
      <Typography component="h2">Sign Up</Typography>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <TextField label="Name" type="text" name="name" color="secondary" />
        <TextField label="Email" type="email" name="email" color="secondary" />
        <TextField
          label="Password"
          type="password"
          name="password"
          color="secondary"
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          color="secondary"
        />
        <Button type="submit" variant={'contained'}>
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
