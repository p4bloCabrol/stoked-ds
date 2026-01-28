import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type BadgeVariant = 'solid' | 'subtle' | 'outline';
export type BadgeColor = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Color scheme */
  color?: BadgeColor;
  /** Size preset */
  size?: BadgeSize;
  /** Content to display */
  children: ReactNode;
}
