import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import type { InputProps } from './Input.types';
import styles from './Input.module.css';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      leftIcon,
      rightIcon,
      required,
      fullWidth,
      disabled,
      className,
      id: providedId,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId('input');
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const hasError = Boolean(error);
    const describedBy = [
      helperText && !hasError ? helperId : null,
      hasError ? errorId : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        className={cn(styles.wrapper, className)}
        data-size={size}
        data-error={hasError || undefined}
        data-disabled={disabled || undefined}
        data-full-width={fullWidth || undefined}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {leftIcon && (
            <span className={styles.icon} data-position="left" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy || undefined}
            className={styles.input}
            data-has-left-icon={leftIcon ? true : undefined}
            data-has-right-icon={rightIcon ? true : undefined}
            {...rest}
          />
          {rightIcon && (
            <span className={styles.icon} data-position="right" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
        {helperText && !hasError && (
          <span id={helperId} className={styles.helperText}>
            {helperText}
          </span>
        )}
        {hasError && (
          <span id={errorId} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
