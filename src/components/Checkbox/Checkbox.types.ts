import type { ComponentPropsWithoutRef } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Size preset */
  size?: CheckboxSize;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Error state */
  error?: boolean;
}
