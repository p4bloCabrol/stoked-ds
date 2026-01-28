import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type AlertVariant = 'solid' | 'subtle' | 'outline' | 'left-accent';
export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends ComponentPropsWithoutRef<'div'> {
  /** Status/type of the alert */
  status?: AlertStatus;
  /** Visual style variant */
  variant?: AlertVariant;
  /** Title of the alert */
  title?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void;
  /** Custom icon */
  icon?: ReactNode;
  /** Content of the alert */
  children?: ReactNode;
}
