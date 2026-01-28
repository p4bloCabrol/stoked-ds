import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      color = 'primary',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(styles.button, className)}
        data-variant={variant}
        data-size={size}
        data-color={color}
        data-loading={loading || undefined}
        data-full-width={fullWidth || undefined}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className={styles.spinnerIcon}>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
              />
            </svg>
          </span>
        )}
        {!loading && leftIcon && (
          <span className={styles.icon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={styles.label}>{children}</span>
        {!loading && rightIcon && (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
