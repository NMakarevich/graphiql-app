import { object, ObjectSchema, ref, string } from 'yup';
import ISignUpForm from '@components/signUpForm/types.ts';

const signUpSchema: ObjectSchema<ISignUpForm> = object({
  name: string().required('Please enter your name'),
  email: string()
    .required('Please enter your email')
    .email('Please enter valid email')
    .matches(/^\S+@\S+\.\S{2,}$/i, 'Email should contains domain'),
  password: string()
    .required('Please enter your password')
    .matches(/\p{L}/gu, 'Password must contain at least one letter')
    .matches(/(?=\d)/gu, 'Password must contain at least one digit')
    .matches(
      /(?=[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/gu,
      'Password must contain at least one special character'
    )
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Passwords do not match'),
});

export default signUpSchema;
