import type { ReactElement } from 'react';
import type {
  Control,
  FieldValues,
  FieldPath,
  ControllerRenderProps,
  FieldError,
} from 'react-hook-form';

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  /** React Hook Form control object from useForm() */
  control: Control<TFieldValues>;
  /** Field name (supports dot-path notation) */
  name: TName;
  /** Render function that receives field props and error */
  render: (props: {
    field: ControllerRenderProps<TFieldValues, TName>;
    error?: FieldError;
  }) => ReactElement;
}
