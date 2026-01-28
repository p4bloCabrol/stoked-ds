import type { ComponentPropsWithoutRef } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Size preset */
  size?: SelectSize;
  /** Placeholder text */
  placeholder?: string;
  /** Options array */
  options?: SelectOption[];
  /** Whether the field is required */
  required?: boolean;
  /** Full width mode */
  fullWidth?: boolean;
}
