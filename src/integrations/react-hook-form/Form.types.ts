import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { FieldValues, UseFormReturn, SubmitHandler } from 'react-hook-form';

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  /** React Hook Form instance from useForm() */
  form: UseFormReturn<TFieldValues>;
  /** Submit handler that receives validated form data */
  onSubmit: SubmitHandler<TFieldValues>;
  /** Form content */
  children: ReactNode;
}
