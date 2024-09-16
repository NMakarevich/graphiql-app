import { object, ObjectSchema, string } from 'yup';
import ISignInForm from '@components/signInForm/types.ts';

const signInSchema: ObjectSchema<ISignInForm> = object({
  email: string()
    .required('Please enter email address')
    .email('Please enter valid email')
    .matches(/^\S+@\S+\.\S{2,}$/i, 'Email should contains domain'),
  password: string().required('Please enter password'),
});

export default signInSchema;
