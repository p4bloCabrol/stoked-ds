import type { ReactNode } from 'react';

export type ToastPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right';

export type ToastStatus = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  status?: ToastStatus;
  duration?: number;
  isClosable?: boolean;
  icon?: ReactNode;
}

export interface ToastOptions extends Omit<Toast, 'id'> {}

export interface ToastProviderProps {
  children: ReactNode;
  /** Position of toasts */
  position?: ToastPosition;
  /** Maximum number of toasts to show at once */
  maxToasts?: number;
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}
