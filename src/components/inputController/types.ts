import { Control, FieldPath, FieldValues } from 'react-hook-form';

export default interface IControllerProps<T extends FieldValues> {
  inputName: FieldPath<T>;
  type: 'text' | 'email' | 'password';
  label: string;
  control?: Control<T>;
}
