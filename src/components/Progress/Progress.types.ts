import type { ComponentPropsWithoutRef } from 'react';

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'danger';

export interface ProgressProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Current progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Size preset */
  size?: ProgressSize;
  /** Color scheme */
  color?: ProgressColor;
  /** Whether to show the value label */
  showValue?: boolean;
  /** Whether the progress is indeterminate */
  indeterminate?: boolean;
  /** Whether to animate the progress bar */
  animated?: boolean;
  /** Accessible label */
  label?: string;
}
