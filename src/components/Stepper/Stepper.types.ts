import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// Data Types
// =============================================================================

export type StepStatus = 'completed' | 'active' | 'pending' | 'error';

export interface StepItem {
  /** Unique identifier */
  id: string;
  /** Step label */
  label: string;
  /** Optional description below label */
  description?: string;
  /** Optional custom icon (overrides default) */
  icon?: ReactNode;
  /** Step status — auto-calculated from activeStep if not provided */
  status?: StepStatus;
}

// =============================================================================
// Component Types
// =============================================================================

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperSize = 'sm' | 'md' | 'lg';

export interface StepperProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Step definitions */
  steps: StepItem[];
  /** Index of the currently active step (0-based) */
  activeStep?: number;
  /** Orientation of the stepper */
  orientation?: StepperOrientation;
  /** Size preset */
  size?: StepperSize;
  /** Callback when a step is clicked */
  onChange?: (stepIndex: number) => void;
  /** Whether steps are clickable for navigation */
  clickable?: boolean;
  /** aria-label for the stepper */
  'aria-label'?: string;
}
