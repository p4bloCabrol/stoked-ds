import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  /** Label text */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Size preset */
  size?: InputSize;
  /** Icon element to render at the start of the input */
  leftIcon?: ReactNode;
  /** Icon element to render at the end of the input */
  rightIcon?: ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Full width mode */
  fullWidth?: boolean;
}
