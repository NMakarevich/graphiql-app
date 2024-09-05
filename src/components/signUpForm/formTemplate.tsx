import { DefaultValues, FieldValues, Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ITextField } from '@components/inputController/types.ts';
import { ObjectSchema } from 'yup';
import styles from '@components/signUpForm/form.module.scss';
import TextFieldController from '@components/inputController/textFieldController.tsx';
import { Button } from '@mui/material';

interface FormProps<T extends FieldValues> {
  textFields: ITextField<T>[];
  schema: ObjectSchema<T>;
  defaultValues: DefaultValues<T>;
  submitText: string;
}

export default function FormTemplate<T extends FieldValues>(
  props: FormProps<T>
) {
  const { textFields, schema, submitText, defaultValues } = props;
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<T>({
    resolver: yupResolver<T>(schema) as unknown as Resolver<T>,
    defaultValues: defaultValues,
    mode: 'all',
  });

  function onSubmit(data: T) {
    console.log(data);
  }

  return (
    <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
      {textFields.map(({ inputName, label, type }, index) => (
        <TextFieldController<T>
          key={index}
          inputName={inputName}
          label={label}
          type={type}
          control={control}
        />
      ))}
      <Button type="submit" variant={'contained'} disabled={!isValid}>
        {submitText}
      </Button>
    </form>
  );
}
