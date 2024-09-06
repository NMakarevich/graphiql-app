'use client';

import { Button, Link, Paper, Typography } from '@mui/material';
import styles from './form.module.scss';
import { ROUTES } from '@/utils/constants/routes.ts';
import { useForm } from 'react-hook-form';
import signUpSchema from '@components/signUpForm/signUpSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import ISignUpForm from '@components/signUpForm/types.ts';
import TextFieldController from '@components/inputController/textFieldController.tsx';
import { ITextField } from '@components/inputController/types.ts';

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
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ISignUpForm>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    resolver: yupResolver(signUpSchema),
    mode: 'all',
  });

  function onSubmit(data: ISignUpForm) {
    console.log(data);
  }

  return (
    <Paper className={styles.Paper}>
      <Typography component="h2">Sign Up</Typography>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        {textFields.map(({ inputName, label, type }, index) => (
          <TextFieldController<ISignUpForm>
            key={index}
            inputName={inputName}
            label={label}
            type={type}
            control={control}
          />
        ))}
        <Button type="submit" variant={'contained'} disabled={!isValid}>
          Sign Up
        </Button>
      </form>
      <Typography component="p">
        Already registered? <Link href={ROUTES.SIGN_IN_PATH}>Sign In</Link>
      </Typography>
    </Paper>
  );
}
