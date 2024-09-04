import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface ITextField<T extends FieldValues> {
  inputName: FieldPath<T>;
  type: 'text' | 'email' | 'password';
  label: string;
}

export interface IControllerProps<T extends FieldValues> extends ITextField<T> {
  control: Control<T>;
}
