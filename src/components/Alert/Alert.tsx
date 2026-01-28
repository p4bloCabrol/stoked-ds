import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { AlertProps, AlertStatus } from './Alert.types';
import styles from './Alert.module.css';

const statusIcons: Record<AlertStatus, JSX.Element> = {
  info: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      status = 'info',
      variant = 'subtle',
      title,
      dismissible = false,
      onDismiss,
      icon,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(styles.alert, className)}
        data-status={status}
        data-variant={variant}
        {...rest}
      >
        <span className={styles.icon}>{icon || statusIcons[status]}</span>
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          {children && <div className={styles.description}>{children}</div>}
        </div>
        {dismissible && (
          <button
            type="button"
            className={styles.dismiss}
            onClick={onDismiss}
            aria-label="Dismiss alert"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
export { Alert };
