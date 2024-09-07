import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { BaseTextFieldProps, SlotProps } from '@mui/material';
import { ElementType } from 'react';

export interface ITextField<T extends FieldValues> {
  inputName: FieldPath<T>;
  type: 'text' | 'email' | 'password';
  label: string;
  slotProps?: {
    input: SlotProps<ElementType, {}, BaseTextFieldProps>;
  };
}

export interface IControllerProps<T extends FieldValues> extends ITextField<T> {
  control: Control<T>;
}
