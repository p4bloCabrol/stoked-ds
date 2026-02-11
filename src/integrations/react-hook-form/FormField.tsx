import { Controller, type FieldValues, type FieldPath } from 'react-hook-form';
import type { FormFieldProps } from './FormField.types';

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, render }: FormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) =>
        render({ field, error: fieldState.error })
      }
    />
  );
}

FormField.displayName = 'FormField';
export { FormField };
