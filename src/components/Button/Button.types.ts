import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'danger' | 'success' | 'neutral';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Color scheme */
  color?: ButtonColor;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Whether the button fills its container width */
  fullWidth?: boolean;
  /** Icon element to render before children */
  leftIcon?: ReactNode;
  /** Icon element to render after children */
  rightIcon?: ReactNode;
}
