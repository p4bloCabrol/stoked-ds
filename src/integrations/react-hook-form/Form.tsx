import type { FieldValues } from 'react-hook-form';
import type { FormProps } from './Form.types';
import styles from './Form.module.css';
import { cn } from '../../utils/cn';

function Form<TFieldValues extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...rest
}: FormProps<TFieldValues>) {
  return (
    <form
      className={cn(styles.form, className)}
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      {...rest}
    >
      {children}
    </form>
  );
}

Form.displayName = 'Form';
export { Form };
