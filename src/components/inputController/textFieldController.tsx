import { IControllerProps } from '@components/inputController/types.ts';
import { TextField } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import React from 'react';

export default function TextFieldController<T extends FieldValues>(
  props: IControllerProps<T>
) {
  const { inputName, label, type, control, slotProps } = props;

  return (
    <Controller
      control={control}
      name={inputName}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          type={type}
          name={inputName}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          slotProps={slotProps}
        />
      )}
    />
  );
}
