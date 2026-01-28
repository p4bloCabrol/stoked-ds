import type { ComponentPropsWithoutRef } from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps extends ComponentPropsWithoutRef<'span'> {
  /** Size preset */
  size?: SpinnerSize;
  /** Color of the spinner */
  color?: 'primary' | 'white' | 'current';
  /** Accessible label for screen readers */
  label?: string;
}
