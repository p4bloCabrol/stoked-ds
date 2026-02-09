import type { ComponentPropsWithoutRef } from 'react';

export type ButtonGroupSize = 'sm' | 'md' | 'lg';

export interface ButtonGroupOption {
  label: string;
  value: string;
}

export interface ButtonGroupProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Available options */
  options: ButtonGroupOption[];
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Size preset */
  size?: ButtonGroupSize;
}
