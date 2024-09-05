'use client';

import { Link, Paper, Typography } from '@mui/material';
import styles from './form.module.scss';
import { ROUTES } from '@/utils/constants/routes.ts';
import signUpSchema from '@components/signUpForm/signUpSchema.ts';
import ISignUpForm from '@components/signUpForm/types.ts';
import { ITextField } from '@components/inputController/types.ts';
import FormTemplate from '@components/signUpForm/formTemplate.tsx';

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
  },
  {
    inputName: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
  },
];

export default function SignUpForm(): JSX.Element {
  return (
    <Paper
      className={styles.Paper}
      sx={{
        '& .MuiFormLabel-root': { color: '#6750A4' },
      }}
    >
      <Typography component="h2">Sign Up</Typography>
      <FormTemplate<ISignUpForm>
        submitText={'Sign Up'}
        textFields={textFields}
        schema={signUpSchema}
        defaultValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
      />
      <Typography component="p">
        Already registered?{' '}
        <Link href={ROUTES.SIGN_IN_PATH} color="secondary">
          Sign In
        </Link>
      </Typography>
    </Paper>
  );
}
